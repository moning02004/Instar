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

    let $postSubmit = $('#post-form .btn-submit');
    $postSubmit.click(function(e) {
        let formData = new FormData();
        let fileList = $('input[type="file"]')[0].files;
        for ( let x of fileList) {
            formData.append('images', x);
        }
        formData.append('content', $('textarea[name="content"]').val())
        if (formData.get('content') === '') {
            formData.delete('content');
        }
        if (!(formData.has('images') && formData.has('content'))) {
            alert('입력 정보를 확인해주세요')
            return false;
        }
        $.post({
            url: '/post/create',
            data: formData,
            enctype: 'multipart/form-data',
            success: function(response) {
                if (response.data) {
                    location.reload();
                } else {

                }
            },
            error: function(error) {
                console.log(error);
            },
            processData: false,
            contentType: false,
            complete: function(e) {
                $('.loading-img').css('display', 'none')
            },
        })

        return false;
    })

});