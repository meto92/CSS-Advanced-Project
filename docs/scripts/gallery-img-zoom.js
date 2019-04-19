$(() => {
    const $images = $("ul.gallery img");
    const imagesCount = $images.length;
    const indexAttr = "data_index";
    const imgFadeOnChangeDuration = 400;
    const zoomOverlayFadeOutDuration = 1111;
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

    const changeImg = (index) => {
        $(".zoom-overlay img")
            .attr("src", $images[index].getAttribute("src"))
            .attr(indexAttr, index);
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

    const showPrevImg = () => {
        const index = getIndex();

        if (index === 0) {
            return;
        }

        animateImgChange(index - 1);
        fixButtons(index - 1);
    };

    const showNextImg = () => {
        const index = getIndex();

        if (index === imagesCount - 1) {
            return;
        }
        
        animateImgChange(index + 1);
        fixButtons(index + 1);
    };

    $("ul.gallery .img-container").click((e) => {
        if ($(".zoom-overlay").length) {
            return;
        }

        const img = e.target.children[0];
        const $img = $(img);
        const src = $img.attr("src");
        const index = +img.getAttribute(indexAttr);

        $("body").append($("<div>")
            .addClass("zoom-overlay")
            .append($("<button>")
                .addClass("prev")
                .append('<i class="fas fa-chevron-left"></i>')
                .click((e) => showPrevImg()))
            .append($("<img>")
                .attr("src", src)
                .attr(indexAttr, index))
            .append($("<button>")
                .addClass("next")
                .append('<i class="fas fa-chevron-right"></i>')
                .click((e) => showNextImg()))
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
        
        setTimeout(() => $(".zoom-overlay > span").fadeIn(pressEscSpanFadeInAnimationDuration), zoomOverlayAnimationDuration);
        setTimeout(() => $(".zoom-overlay > span").fadeOut(pressEscSpanFadeOutAnimationDuration), pressEscSpanFadeOutDelay);
    });

    $("body").on("keydown", (e) => {
        if (!$(".zoom-overlay").length) {
            return;
        }

        const keyCode = e.keyCode
        
        // 27 - Esc code
        // 37 - Left arrow ←
        // 39 - Right arrow →
        if (keyCode === 27) {
            removeZoomOverlay();
        } else if (keyCode === 37) {
            showPrevImg();
        } else if (keyCode === 39) {
            showNextImg();
        }
    });
});