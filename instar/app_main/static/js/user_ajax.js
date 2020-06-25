$(document).ready(function() {

    let $bFollow = $('.btn-follow');
    $bFollow.click(function(e) {
        let user = $(this).attr('id');
        let target = $(this).val();
        $.ajax({
            url: '/user/' +user+ '/follow/'+ target,
            method: 'post',
            complete: function(e) {
                $('.loading-img').css('display', 'none')
            },
            success: (response) => {
                $(this).text((response.data) ? '팔로우' : '팔로우 취소')
                $.ajax({
                    url: '/user/' + target + '/follow',
                    method: 'get',
                    success: function(response) {
                        $('#follower').text(response.data);
                    },
                    error: function(error) {
                        console.log(error);
                    }
                })
            },
            error: function(error) {
                alert('에러가 발생했습니다.')
            }
        })
    })

    let $bLeaveBtn = $('#btn-leave');
    $bLeaveBtn.click(function() {
        let alphabet = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let correct = [];
        for (let i = 0; i<5; i++) correct.push(alphabet[Math.floor(Math.random()*alphabet.length)]);

        answer = prompt("다음 문자를 입력하시오\n >> "+ correct.join(""));
        if (answer == correct.join("")) {
            $.ajax({
                url: '/user/leave',
                method: 'post',
                success: function(response) {
                    alert('탈퇴되셨습니다.');
                    location.replace('/user/login');
                },
                error: function(error) {
                    alert('에러가 발생했습니다.')
                }
            })
        }
        return false;
    });
})