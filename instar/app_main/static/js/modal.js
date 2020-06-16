$(document).ready(function() {
    $('.post-modal').click(function() {
        let $modal = $('#m-post .modal')
        $modal.css('display', 'block');
        $modal.find('.show').val($(this).val())
    });
    $('.upload-modal').click(function() {
        $('#m-upload .modal').css('display', 'block')
    });
    $('.profile-modal').click(function() {
        $('#m-profile .modal').css('display', 'block')
    })
    $('.detail-modal').click(function() {
        let $modal = $('#m-detail .modal')
        $modal.css('display', 'block');
        $modal.find('.delete').val($(this).val())
    })

    $('#m-detail #delete').click( function() {
        if(!confirm("취소할 수 없습니다. 삭제하시겠습니까?")) {
            $('.modal-content .cancel').click();
            return false;
        }
        let pk = this.value;
        $.ajax({
            url:'/post/' + pk + '/delete',
            method: 'post',
            success: function(data) {
                history.go(-1);
            }
        })
    })


    $('.modal-content .cancel').click(function() {
        $('.modal').css('display', 'none');
    });

    $('.modal-content .show').click( function(e) {
        location.href = '/post/' + $(this).val() + '/'
    });

    $('#m-upload input[name="images"]').change((e) => {
        if (e.currentTarget.files.length <= 0) return false;
        let reader = new FileReader();

        reader.readAsDataURL(e.currentTarget.files[0]);
        reader.onload = (e) => {
            let $img = $('<img />')
            $img.attr('src', e.target.result)
            $img.css('width', '100%')

            $('.prev-image ').prepend($img)
        }
    });
})