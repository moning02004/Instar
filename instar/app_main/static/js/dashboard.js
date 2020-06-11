$(document).ready( function() {

    $('.post').click( function() {
        let $content = $(this).find('.content');
        if ($content.text().length > 30){
            $(this).find('.content')
            $content.removeClass('post-content');
        }
    });
})