$(document).ready(function() {
    let $bOption = $('.btn-option');
    let $currentModal = null;
    $bOption.click(function() {
        id = $(this).val();
        $currentModal = $('#'+id+'.modal-option')
        $currentModal.css('display', 'block');
    });

    $('.modal-content button').click(function() {
        let $parent = $(this).parent()
        let post = $parent.find('input[name="post_id"]').val()
        let author = $parent.find('input[name="author_id"]').val()

        if ($(this).val() == 'profile') {
            location.href = '/user/' + author
        } else if ($(this).val() == 'detail') {
            location.href = '/post/' + post
        } else if ($(this).val() == 'update') {
            location.href = '/post/' + post + '/update'
        } else if ($(this).val() == 'report') {

        } else if ($(this).val() == 'delete') {

        } else if ($(this).val() == 'cancel') {
            $currentModal.css('display', 'none');
        }
    });

    let $bUpload = $('.btn-upload');
    $bUpload.click(function() {
        $currentModal = $('.modal-upload');
        $currentModal.css('display', 'block');
    });

})