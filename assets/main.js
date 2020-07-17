$('#scrollDown').click(() => {
    $(`html, body`).animate({
        scrollTop: $('#welcomeDiv').offset().top
    }, 2000);
});