$(document).ready(function() {
    let $bOption = $('.btn-option');
    let $currentModal = null;

    $bOption.click(function() {
        let id = $(this).val();
        console.log(id);
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
        } else if ($(this).val() == 'delete') {
            if (!confirm('정말 삭제하시겠습니까? 되돌릴 수 없습니다.')) return false;
            $.ajax({
                url: '/post/' + post + '/delete',
                method: 'post',
                success: function(response) {
                    location.replace('/')
                },
                error: function(error) {
                    alert('에러 발생')
                },
                timeout: 2000
            })
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