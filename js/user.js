   //保存用户信息;
   var userInfor = null;

   // 获取用户信息, 并且处理用户未登录的情况;
   $.ajax({
       type: 'get',
       url: '/api/user/queryUserMessage',
       async: false,
       success: function(res) {
           if (res.error && res.error == 400) {
               location.href = "login.html";
           }
           userInfor = res;
           //    console.log(userInfor);

       }
   })


   $(function() {
       $("#logout").on("tap", function() {
           $.ajax({
               type: 'get',
               url: '/api/user/logout',
               success: function(res) {
                   if (res.success) {
                       mui.toast("退出登录成功");
                       setTimeout(function() {
                           location.href = "index.html";
                       }, 1000);
                   }
               }
           })
       });
       var html = template("userTpl", userInfor);
       //    console.log(html);
       $("#userBox").html(html);

   })