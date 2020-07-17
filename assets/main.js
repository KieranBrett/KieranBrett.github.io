$('#welcomeThing').click(() => {
    $(`html, body`).animate({
        scrollTop: $('#another').offset().top
    }, 2000);
});