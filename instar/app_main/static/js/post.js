$(document).ready(function() {
    let $bReply = $('button.reply')
    let $answer = $('.answer')

    $bReply.click(function() {
        let comment_id = $(this).attr('id').split('-')[0]
        let origin_id =  $(this).attr('id').split('-')[1] || null

        $answer.text($(this).val())
        $('input[name="comment_id"]').val(comment_id);
        $('input[name="origin_id"]').val(origin_id);
    });

    $answer.click(function() {
        $answer.text(null)
        $('input[name="comment_id"]').val(null);
        $('input[name="origin_id"]').val(null);
    })

    $('.content').click(function() {
        $('.comment').removeClass('height-80vh')
        $(this).removeClass('height-30vh');
        $(this).addClass('height-80vh');
    })
    $('.comment').click(function() {
        $('.content').removeClass('height-80vh')
        $(this).removeClass('height-30vh');
        $(this).addClass('height-80vh');
    })
    $('.show-sub-comment').click(function() {
        let $sub = $(this).parent().find('.sub-comment')
        $sub.css('display', ($sub.is(':visible'))? 'none' : 'block')
    });
});