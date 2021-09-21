$(function () {
    $(".reset").click(function () {
        reset()
    })
    $("#user").blur(function () {
        if($(this).val() != '') {
            $.ajax({
            url:'/testUser',
            type:'POST',
            dataType:"json",
            data:{'user': $("#user").val()},
            'success': function (data) {
                if(data['msg'] == 'false') $('.span_user').text("用户已存在");
            }
            })
        }
    })
    $(".determine").click(function () {
        if(judgeInput()) {
            if($('#password').val() != $("#sure_password").val()) {
            alert("两次密码不一致");
            reset();
            return;
        }else {
                $.ajax({
                url:'/managerRegister',
                type:'POST',
                dataType:"json",
                data:{'imgCode': $("#code").val(), "user": $("#user").val(), "password": $("#password").val()},
                'success': function (data) {
                    if(data['imgCode'] == 'false') {
                        alert("验证码错误")
                        reset()
                        return ;
                    }else if(data['user'] == 'false') {
                        alert("用户已存在")
                        reset()
                        return ;
                    }else {
                        alert("注册成功");
                        window.location.replace('/login');
                    }
                }
            })
        }
        }

    })
})

