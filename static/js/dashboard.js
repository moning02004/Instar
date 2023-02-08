$(document).ready( function() {
    $('.content .more').click( function() {
        let $content = $(this).parent().find('div:first')
        $content.toggleClass('text-overflow-ellipsis');
        $content.toggleClass('pre-box');
        if ($content.hasClass('text-overflow-ellipsis')) {
            $(this).text('더보기')
        } else {
            $(this).text('숨기기')
        }
    });
})