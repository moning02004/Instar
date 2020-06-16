$(document).ready(function() {
    let $prev = $('.prev');
    let $next = $('.next');
    let $images = $('.image-set');

    if ($images.children().length <= 1) {
        $next.addClass('none');
    }
    for ( let i = 0; i < $images.children().length; i++) {
        let $image = $images.children().eq(i);
        if ($image.width() > $image.height()) {
            $image.addClass('w-100 mx-auto')
        } else {
            $image.addClass('h-100 mx-auto')
        }
    }
    $prev.click(function() {
        let index = $images.children('.active').index();
        $next.removeClass('none');
        if (index-1 == 0) {
            $prev.toggleClass('none');
        }

        $images.children().eq(index).toggleClass('active')
        $images.children().eq(index).toggleClass('none')
        $images.children().eq(index-1).toggleClass('active')
        $images.children().eq(index-1).toggleClass('none')
    });

    $next.click(function() {
        let index = $images.children('.active').index();
        $prev.removeClass('none');
        if (index+1 == $images.children().length-1) {
            $next.toggleClass('none');
        }

        $images.children().eq(index).toggleClass('active')
        $images.children().eq(index).toggleClass('none')
        $images.children().eq(index+1).toggleClass('active')
        $images.children().eq(index+1).toggleClass('none')
    });

});