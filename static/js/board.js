$(function () {
    let address;
    $.ajax({
        url: 'http://api.map.baidu.com/location/ip?ak=ia6HfFL660Bvh43exmH9LrI6',
        type: 'POST',
        dataType: 'jsonp',
        'success':function (data) {
            address = data.content.address_detail.province + "·" + data.content.address_detail.city;
        }
    })
    function submit() {
    if($('.input-box input').val() == '') alert('不能提交空信息');
        else {
            if(confirm("是否确定提交")) {
               $('.input-box img').css('visibility', 'hidden');
               $.ajax({
                   url:'/manageData',
                   type:'POST',
                   dataType:'json',
                   data:{'msg':$('.input-box input').val(),'address':address},
                   'success':function (data) {
                        alert('提交成功');
                        $(".main-box").prepend("<div class=\"text-box\">\n" +
                            "        <span class=\"text\">" + data['msg'] +"</span>\n" +
                            "        <div class=\"top-box\">\n" +
                            "            <span class=\"user\">" + data['user'] + "</span>\n" +
                            "            <span class=\"address\">" + data['address'] + "</span>\n" +
                            "        </div>\n" +
                            "    </div>")
                       $('.input-box input').val('');
                        $('#cloudImg').attr('src', '/cloudImg?' + Math.random())
                   }
               })
            }
        }
    }
    $('#logout').click(function () {
            if(confirm("是否确定要登出")) {
                alert("登出成功");
                window.location.replace('/managerLogout');
            }
    })
    //页面窗口监听函数
    $('.input-box input').width($(window).width() - 70)
    $(window).resize(function () {
        $('.input-box input').width($(window).width() - 70)
    })
    $('.button-submit').click(function () {
       submit()
    })
    //限制输入100个字符
    $(".input-box input").keyup(function (e) {
        if(e.keyCode == 13) submit();
        else if($(this).val() != '') $('.input-box img').css('visibility', 'visible');
        else $('.input-box img').css('visibility', 'hidden');
        if($(this).val().length >= 100) {
            $(this).val($(this).val().substring(0,100));
        }
    })
    $('.input-box img').click(function () {
        $('.input-box input').val('');
        $('.input-box img').css('visibility', 'hidden');
    })
})