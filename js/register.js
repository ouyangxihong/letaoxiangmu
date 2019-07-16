	/**
	 * 注册
	 * 1.给注册按钮添加点击事件
	 * 2.获取到用户注册的信息
	 * 3.对用户输入的信息做验证
	 * 4.调用注册接口 实现注册功能
	 * 5.给出提示 告诉用户是否注册成功
	 * 6.跳转到登录页面
	 */
	$(function() {
	    $('#register-btn').on('click', function() {
	        var This = $(this);
	        var username = $('[name="username"]').val();
	        var mobile = $('[name="mobile"]').val();
	        var password = $('[name="password"]').val();
	        var againPass = $('[name="againPass"]').val();
	        var vCode = $('[name="vCode"]').val();
	        if (!/^[a-zA-Z][a-zA-Z0-9_]{4,19}$/.test(username)) {
	            mui.toast('您输入的用户名不合法');
	            return false;
	        }
	        if (!(/^1[3456789]\d{9}$/.test(mobile))) {
	            mui.toast("手机号码有误，请重填");
	            return false;
	        }
	        if (!/^[a-zA-Z0-9]{4,10}$/.test(password)) {
	            mui.toast('密码不能含有非法字符，长度在4-10之间');
	        }
	        if (againPass != password) {
	            mui.toast('两次密码不一样');
	        };
	        if (!/^[0-9]{6}$/.test(vCode)) {
	            mui.toast("验证码错误");
	        }

	        $.ajax({
	            type: 'post',
	            url: '/api/user/register',
	            data: {
	                username: username,
	                password: password,
	                mobile: mobile,
	                vCode: vCode
	            },
	            beforeSend: function() {
	                This.html = "正在提交数据";
	            },
	            success: function(res) {
	                if (res.success) {
	                    mui.toast("注册成功");
	                    setTimeout(function() {
	                        location.href = "login.html";
	                    }, 2000);
	                }
	            },
	            error: function(response) {
	                console.log(response);

	                mui.toast("注册失败");
	                This.html = "注册";
	            }
	        })
	    });
	    //获取验证码;
	    $('#getCode').on('click', function() {
	        $.ajax({
	            url: '/api/user/vCode',
	            type: 'get',
	            success: function(res) {
	                console.log(res.vCode);
	            }
	        })
	    })
	})