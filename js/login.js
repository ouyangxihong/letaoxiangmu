$(function() {
    //用户点击登录页面;
    $("#login-btn").on("tap", function() {
        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();
        if (!/^[a-zA-Z][a-zA-Z0-9_]{4,19}$/.test(username)) {
            mui.toast('您输入的用户名不合法');
            return;
        }
        if (!/^[a-zA-Z0-9]{4,10}$/.test(password)) {
            mui.toast('密码不能含有非法字符，长度在4-10之间');
            return;
        }
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: username,
                password: password
            },
            beforeSend: function() {
                $("#login-btn").html("正在登录...");
            },
            success: function(response) {
                if (response.success) {

                    $("#login-btn").html("登陆成功");
                    setTimeout(function() {
                        location.href = "user.html";
                    }, 1000);
                } else {
                    $("#login-btn").html("登录");
                    mui.toast(response.message);
                }
            },
            error: function(error) {
                console.log(error);

            }
        })
    })
})