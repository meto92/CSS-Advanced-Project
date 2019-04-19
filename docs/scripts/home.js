$(() => {
    const slideshowInterval = 4000;
    const fadeDuration = 333;
    const $slideshowCircles = $(".slideshow-circles ul");
    const $animals = $(".animal-info");
    const $animalImages = $animals.find("img");
    const animalsCount = $animals.length;
    
    $animals[0].classList.add("visible");

    let slideshowIndex = 0;

    const changeSlideshowCircleColors = (newIndex) => {
        $slideshowCircles.find(`.circle:eq(${slideshowIndex})`)
            .removeClass("active");

        $slideshowCircles.find(`.circle:eq(${newIndex})`)
            .addClass("active");
    };

    const changeContent = (index) => {
        if (slideshowIndex === index) {
            return;
        }
        
        const $visibleAnimalInfo = $(".animal-info.visible");
        const $nextAnimalInfo = $(`.animal-info:nth-of-type(${index + 1})`);

        $visibleAnimalInfo.find("img").fadeOut(fadeDuration, () => {
            $visibleAnimalInfo.removeClass("visible")
                .find("img")
                .attr("style", "");
            $nextAnimalInfo.addClass("visible")
                .css("display", "none")
                .fadeIn(fadeDuration);
        });
    };

    const changeContentAndCircleColors = (newIndex) => {
        changeSlideshowCircleColors(newIndex);
        changeContent(newIndex);
        slideshowIndex = newIndex;
    };

    // best variable name
    const x = window.matchMedia("(max-width: 700px)");

    const intervalFunc = () => {
        if (x.matches) {
            return;
        }

        let newIndex = (slideshowIndex + 1) % animalsCount;
        
        changeContentAndCircleColors(newIndex);
    };

    let intervalId = setInterval(intervalFunc, slideshowInterval);

    $animalImages.each((index, img) => {
        $slideshowCircles.append($("<li>")
            .addClass("circle")
            .click((e) => {
                e.preventDefault();
                e.stopPropagation();

                clearInterval(intervalId);
                
                intervalId = setInterval(intervalFunc, slideshowInterval);
                
                changeContentAndCircleColors(index);
            })
            .append($("<img>")
                .attr("src", img.getAttribute("src"))
                .attr("alt", "Animal picture")));
    });

    changeSlideshowCircleColors(0);
});