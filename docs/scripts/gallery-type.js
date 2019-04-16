$(() => {
    const $types = $(".gallery-types ul li");
    const $gallery = $("ul.gallery");
    
    $types.click((e) => {
        const $li = $(e.target);
        const newClass = $li.attr("class");

        $types.filter((index, li) => $(li).hasClass("active"))
            .removeClass("active");

        $gallery.attr("class", `gallery ${newClass}`);
        $li.addClass("active");
    });
});