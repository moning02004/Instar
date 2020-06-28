$(document).ready(function() {
    let $bOption = $('.btn-option');
    let $currentModal = null;

    $bOption.click(function(e) {
        let id = $(this).val();
        e.stopPropagation();
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
    $bUpload.click(function(e) {
        e.stopPropagation();
        $currentModal = $('.modal-upload');
        $currentModal.css('display', 'block');
    });

    let $keyword = $('input[name="keyword"]');
    let $layout = $('.search-layout');
    $keyword.keyup(function(e) {
        e.stopPropagation();
        $currentModal = $('.modal-search');
        if ($(this).val() === '') {
            $currentModal.css('display', 'none');
            return false;
        } else {
            $currentModal.css('display', 'block');
        }

        let keyword = $(this).val();
        $.ajax({
            url: '/search',
            method: 'get',
            data: {'keyword': keyword},
            success: function(response) {
                let data = JSON.parse(response.data)['data'];

                let result = []
                data['tags'].forEach(x => {
                    let $factor = $layout;
                    $factor.find('button').text(x);
                    $factor.find('button').val('tag ' + x);
                    result.push($factor.html());
                })
                data['users'].forEach(x => {
                    let $factor = $layout;
                    $factor.find('button').text(x[1]);
                    $factor.find('button').val('user ' + x[0]);
                    result.push($factor.html());
                })
                $currentModal.find('.modal-content').html(result);
                console.log($('.modal-search').html());
            },
            error: function(error) {
                console.log(error);
            },
            complete: function(e) {
                $('.loading-img').css('display', 'none')
            },
            timeout: 2000
        })
    });

    $('body').on('click', '.result', function(e) {
        let url = '';
        if ($(this).val().split(' ')[0] == 'user') {
            url = '/user/' + $(this).val().split(' ')[1];
        } else {
            url = '/post?search=' + $(this).val().split(' ')[1];
        }
    });
})