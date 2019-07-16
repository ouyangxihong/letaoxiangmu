//给确认修改密码按钮添加点击事件;
//点击之后获取输入框里面的值;
//获取验证码
//发送ajax请求;
//修改成功之后跳转登录页面;
$(function() {
    $("#modify-btn").on("click", function() {
        var This = $(this);
        var oldPassword = $('[name="oldPassword"]').val();
        var newPassword = $('[name="newPassword"]').val();
        var confirmNewPassword = $('[name="confirmNewPassword"]').val();
        var vCode = $('[name="vCode"]').val();
        if (!oldPassword) {
            mui.toast("请输入原密码");
        }
        if (oldPassword == newPassword) {
            mui.toast("新密码与原密码一样");
            return;
        }
        if (newPassword != confirmNewPassword) {
            mui.toast("两次输入的密码不一致");
            return;
        }
        $.ajax({
            type: "post",
            url: "/api/user/updatePassword",
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword,
                vCode: vCode
            },
            success: function(res) {
                This.html("密码修改成功");
                setTimeout(function() {
                    location.href = "login.html";
                }, 1000);

            },
            error: function(error) {
                mui.toast("修改密码失败");
            }
        })
    });
    $('#getCode').on('click', function() {
        $.ajax({
            url: '/api/user/vCodeForUpdatePassword',
            type: 'get',
            success: function(res) {
                console.log(res.vCode);
            }
        })
    })
})