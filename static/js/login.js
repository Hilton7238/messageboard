$(function () {
        $("#user").blur(function () {
                let ele = $(".span_user");
                if($(this).val() == "") ele.text("用户名不能为空");
        })
        $('.submit').click(function () {
            $.ajax({
                url:"/managerLogin",
                type:'POST',
                dataType:'json',
                data:{'user':$('#user').val(), 'password':$('#password').val(), 'imgCode': $('#code').val()},
                success:function (data) {
                    if(data['msg'] == 'codeError') {
                        alert('验证码错误');
                        $(this).attr("src", "/imgCode?" + Math.random());
                    }
                    else if(data['msg'] == 'userError') {
                        alert('用户名或密码错误');
                        $(this).attr("src", "/imgCode?" + Math.random());
                    }
                    else {
                        window.location.replace('/board');
                        return ;
                    }
                    reset();
                }
            })
        })
        $('#user').keyup(function (e) {
            if(e.keyCode == 13) {
                if(judgeInput()) {
                    $.ajax({
                        url:"/managerLogin",
                        type:'POST',
                        dataType:'json',
                        data:{'user':$('#user').val(), 'password':$('#password').val(), 'imgCode': $('#code').val()},
                        success:function (data) {
                            if(data['msg'] == 'codeError') {
                                alert("验证码错误");
                                $(this).attr("src", "/imgCode?" + Math.random());
                            }
                            else if(data['msg'] == 'userError') {
                                alert('用户名或密码错误');
                                $(this).attr("src", "/imgCode?" + Math.random());
                            }
                            else {
                               window.location.replace('/board');
                               return ;
                            }
                            reset();
                        }
                    })
                }
            }
        })
        $('#password').keyup(function (e) {
                if(e.keyCode == 13) {
                if(judgeInput()) {
                    $.ajax({
                        url:"/managerLogin",
                        type:'POST',
                        dataType:'json',
                        data:{'user':$('#user').val(), 'password':$('#password').val(), 'imgCode': $('#code').val()},
                        success:function (data) {
                            if(data['msg'] == 'codeError') {
                                alert("验证码错误");

                            }
                            else if(data['msg'] == 'userError') {
                                alert('用户名或密码错误');

                            }
                            else {
                               window.location.replace('/board');
                               return ;
                            }
                            reset();
                        }
                    })
                }
            }
            })
        $('#code').keyup(function (e) {
                if(e.keyCode == 13) {
                if(judgeInput()) {
                    $.ajax({
                        url:"/managerLogin",
                        type:'POST',
                        dataType:'json',
                        data:{'user':$('#user').val(), 'password':$('#password').val(), 'imgCode': $('#code').val()},
                        success:function (data) {
                            if(data['msg'] == 'codeError') {
                                alert("验证码错误");

                            }
                            else if(data['msg'] == 'userError') {
                                alert('用户名或密码错误');

                            }
                            else {
                               window.location.replace('/board');
                               return ;
                            }
                            reset();
                        }
                    })
                }
            }
        })
})