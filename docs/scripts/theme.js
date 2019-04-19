$(() => {
    const $body = $(document.body);
    const themeKey = "WSA_theme";

    if (!sessionStorage.getItem(themeKey)) {
        sessionStorage.setItem(themeKey, "light");
    }

    if (sessionStorage.getItem(themeKey) === "dark") {
        $body.addClass("dark");
    }

    $(".theme").click((e) => {
        const themeValue = sessionStorage.getItem(themeKey);

        if (themeValue === "dark") {
            sessionStorage.setItem(themeKey, "light");
            $body.removeClass("dark");
        } else {
            sessionStorage.setItem(themeKey, "dark");
            $body.addClass("dark");
        }
    });
});