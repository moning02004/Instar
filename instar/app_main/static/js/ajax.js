$(document).ready(function() {

    // post heart
    let $heartBtn = $('.post-heart');
    $heartBtn.click(function(e) {
        let $heart = $(e.currentTarget);
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
            error: function(error) {

            }
        });
    })
});