$(() => {
    const body = document.body;
    const footer = document.getElementsByClassName("site-footer")[0];
    const layoutWhitespace = "3rem";
    const $footerBg = $(".footer-bg");

    let prevHeight = footer.getBoundingClientRect().height;

    const setHeight = (newHeight) => {
        $footerBg.css("margin-bottom", `calc(${newHeight}px + ${layoutWhitespace})`);
        prevHeight = newHeight;
    };

    setHeight(prevHeight);

    body.onresize = (e) => {
        const currentHeight = footer.getBoundingClientRect().height;
        
        if (prevHeight === currentHeight) {
            return
        }

        setHeight(currentHeight);
    };
});