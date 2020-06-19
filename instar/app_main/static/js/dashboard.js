$(document).ready( function() {
    $('.content .more').click( function() {
        let $content = $(this).parent().find('div:first')
        $content.toggleClass('post-content');
        $content.toggleClass('pre-box');
        if ($content.hasClass('post-content')) {
            $(this).text('더보기')
        } else {
            $(this).text('숨기기')
        }
    });
})