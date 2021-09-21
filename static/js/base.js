function judgeInput() {
        if($("#user").val() == '') {
            alert("用户名不能为空");
            reset();
            return false;
        }else if($("#sure_password").val() == '') {
            alert("密码不能为空");
            reset();
            return ;
        }else if($("#password").val() == '') {
            alert("密码不能为空");
            reset();
            return false;
        }else if($("#code").val() == '') {
            alert("验证码不能为空");
            reset();
            return false;
        }
        return true;
}
function reset() {
    $('#user').val("");
    $('#password').val("");
    $('#sure_password').val("");
    $('#code').val("");
    $('#imgcode').attr("src","/imgCode?" + Math.random());
    $('.span_user').text('')
    $('.span_password').text('')
    $('.span_surepassword').text('')
    $('.span_imgcode').text('')
}
$(function () {
    $("#imgcode").click(function () {
        $(this).attr("src", "/imgCode?" + Math.random());
    })
    $("#password").blur(function () {
        let ele = $(".span_password");
        if($(this).val() == "") ele.text("密码不能为空");
        else ele.text("")
    })
    $('#sure_password').blur(function () {
        let ele = $(".span_surepassword");
        if($(this).val() == "") ele.text("密码不能为空");
        else if($(this).val() != $('#password').val()) ele.text('两次密码输入不一致');
        else ele.text("")
    })
    $('#user').blur(function () {
        let ele = $(".span_user");
        if($(this).val() == "") ele.text("用户名不能为空");
        else ele.text("")
    })
    $("#code").blur(function () {
        let ele = $(".span_imgcode");
        if($(this).val() == '') ele.text("验证码不能为空")
        else {
               $.ajax({
                url:'/testCode',
                type:'POST',
                dataType:"json",
                data:{'imgCode': $("#code").val()},
                'success': function (data) {
                    if(data['msg'] == 'false')
                        ele.text("验证码错误");
                    else ele.text("");
                }
            })
        }
    })
    $('#sure_password').focus(function () {
        $(".span_surepassword").text("")
    })
    $('#password').focus(function () {
        $(".span_password").text("")
    })
    $('#code').focus(function () {
        $(".span_imgcode").text("")
    })
    $('#user').focus(function () {
        $(".span_user").text("")
    })
})