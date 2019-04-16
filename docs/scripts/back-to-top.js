$(() => {
    const $btn = $(".back-to-top");
    const body = document.body;
    const scrollTime = 1000;
    const scrollPercentToShowButton = 25;

    $btn.click(() => {
        $('html, body').animate({
            scrollTop: 0
        }, scrollTime);
    });

    body.onscroll = (e) => {
        const scrollPercent = window.scrollY / body.clientHeight * 100;

        if (scrollPercent < scrollPercentToShowButton) {
            $btn.fadeOut();
        } else {
            $btn.fadeIn();
        }
    };
});