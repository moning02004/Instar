$(document).ready(function() {
    $('.post-modal').click(function() {
        $('.modal').css('display', 'block');
    });
    $('.modal-content .cancel').click(function() {
        $('.modal').css('display', 'none');
    });
})