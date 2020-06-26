$(document).ready(function() {

    // post heart
    let $bPostHeart = $('.post-heart');
    $bPostHeart.click(function(e) {
        let $heart = $(this);
        $.ajax({
            url: '/post/'  + $heart.attr('id') + '/heart',
            method: 'post',
            success: function(response) {
                let number = parseInt($heart.find('small').text());
                $heart.find('i').toggleClass('fas text-primary');
                $heart.find('small').text(
                   (response.data) ? number+1: number-1
                );
            },
            error: function(error) {},
            complete: function(e) {
                $('.loading-img').css('display', 'none')
            },
            timeout: 2000
        });
    });

    // comment heart
    let $bCommentHeart = $('.comment-heart');
    $bCommentHeart.click(function(e) {
        let $heart = $(this);
        let post_id = $heart.attr('id').split('-')[0];
        let comment_id = $heart.attr('id').split('-')[1];

        $.ajax({
            url: '/post/'  + post_id + '/comment/'+ comment_id +'/heart',
            method: 'post',
            success: function(response) {
                let number = parseInt($heart.find('small').text());
                $heart.find('i').toggleClass('fas text-primary');
                $heart.find('small').text(
                   (response.data) ? number+1: number-1
                );
            },
            error: function(error) {},
            complete: function(e) {
                $('.loading-img').css('display', 'none')
            },
            timeout: 2000
        });
    });


});