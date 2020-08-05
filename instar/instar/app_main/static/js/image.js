$(document).ready(function() {
    let $images = $('.image-set');

    for ( let i = 0; i < $images.children().length; i++) {
        let $image = $images.children().eq(i);
        if ($image.width() > $image.height()) {
            $image.addClass('w-100 mx-auto')
        } else {
            $image.addClass('h-100 mx-auto')
        }
    }

    let $prev_image = $('.prev-profile-image');

});