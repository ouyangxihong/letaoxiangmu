$(function() {
    //获取用户存储的收货地址;
    $.ajax({
        type: "get",
        url: "/api/address/queryAddress",
        success: function(response) {
            console.log(response);

        }
    })
})