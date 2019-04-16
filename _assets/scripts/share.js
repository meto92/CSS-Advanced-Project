$(() => {
    const $body = $("body");
    const $shareLinks = $("aside.share");
    const slideUpDuration = 500;

    $shareLinks.find(".title").click(() => {
        $body.append($("<div>")
            .addClass("share-center")
            .append($shareLinks));

        $shareLinks.find("button")
            .click((e) => {
                $(".share-center").slideUp(slideUpDuration, () => {
                    $(".share-center").remove();
                });

                $body.append($shareLinks);
            });
    });
});