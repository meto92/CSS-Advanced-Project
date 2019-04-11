$(() => {
    const $images = $("ul img");
    const imagesCount = $images.length;
    const indexAttr = "data_index";
    const imgFadeOnChangeDuration = 400;
    const zoomOverlayFadeOutDuration = 1111;
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const zoomOverlayAnimationDuration = 1000;
    const pressEscSpanFadeInAnimationDuration = 555;
    const pressEscSpanFadeOutAnimationDuration = 1000;
    const pressEscSpanFadeOutDelay = zoomOverlayAnimationDuration + 2000;    

    const getIndex = () => +document.querySelector(".zoom-overlay img")
        .getAttribute(indexAttr);

    const fixButtons = (index) => {
        const hide = ($elem) => {
            $elem.css("opacity", "0")
                .css("pointer-events", "none");
        };

        const show = ($elem) => {
            $elem.css("opacity", "1")
                .css("pointer-events", "inherit");
        };

        if (index === 0) {
            hide($(".zoom-overlay .prev"));
        } else {
            show($(".zoom-overlay .prev"));
        }

        if (index === imagesCount - 1) {
            hide($(".zoom-overlay .next"));
        } else {
            show($(".zoom-overlay .next"));
        }
    };
    
    const fixOverlayImgWidthAndHeight = (index) => {
        const imgWidth = $($images[index]).css("width").slice(0, -2);
        const imgHeight = $($images[index]).css("height").slice(0, -2);
        
        if (imgWidth > imgHeight) {
            const width = Math.min(screenWidth, imgWidth) + "px";

            $(".zoom-overlay img")
                .css("width", width)
                .css("height", "auto");
        } else {
            const height = Math.min(screenHeight, imgHeight) + "px";

            $(".zoom-overlay img")
                .css("width", "auto")
                .css("height", height);
        }
    };

    const changeImg = (index) => {
        $(".zoom-overlay img")
            .attr("src", $images[index].getAttribute("src"))
            .attr(indexAttr, index);

        fixOverlayImgWidthAndHeight(index);
    };

    const animateImgChange = (newImgIndex) => {
        $(".zoom-overlay img").fadeOut(imgFadeOnChangeDuration, () => {
            changeImg(newImgIndex);
            $(".zoom-overlay img").fadeIn(imgFadeOnChangeDuration);
        });
    };

    const removeZoomOverlay = () => {
        $(".zoom-overlay").fadeOut(zoomOverlayFadeOutDuration, () => $(".zoom-overlay").remove());
    };

    $images.each((index, img) => {
        $(img).attr(indexAttr, index);
    });

    $images.click((e) => {
        if ($(".zoom-overlay").length) {
            return;
        }

        const img = e.target;
        const $img = $(img);
        const src = $img.attr("src");
        const index = +img.getAttribute(indexAttr);

        $("body").append($("<div>")
            .addClass("zoom-overlay")
            .append($("<button>")
                .addClass("prev")
                .append('<i class="fas fa-chevron-left"></i>')
                .click((e) => {
                    const index = getIndex();

                    animateImgChange(index - 1);
                    fixButtons(index - 1);
                }))
            .append($("<img>")
                .attr("src", src)
                .attr(indexAttr, index))
            .append($("<button>")
                .addClass("next")
                .append('<i class="fas fa-chevron-right"></i>')
                .click((e) => {
                    const index = getIndex();

                    animateImgChange(index + 1);
                    fixButtons(index + 1);
                }))
            .append($("<button>")
                .addClass("close")
                .append('<i class="fas fa-times-circle"></i>')
                .click((e) => {
                    removeZoomOverlay();
                }))
            .append($("<span>")
                .html("Press <span class='esc'>Esc</span> to exit preview mode."))
            );

        fixButtons(index);
        fixOverlayImgWidthAndHeight(index);
        
        setTimeout(() => $(".zoom-overlay > span").fadeIn(pressEscSpanFadeInAnimationDuration), zoomOverlayAnimationDuration);
        setTimeout(() => $(".zoom-overlay > span").fadeOut(pressEscSpanFadeOutAnimationDuration), pressEscSpanFadeOutDelay);
    });

    $("body").on("keydown", (e) => {
        // 27 - Esc code
        if (e.keyCode === 27) {
            removeZoomOverlay();
        }
    });
});