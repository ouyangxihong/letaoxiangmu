$(function() {
    var isEdit = Number(getParamsUrl(location.href, 'isEdit'));
    if (isEdit) {
        //编辑操作;
        if (localStorage.getItem("editAddress")) {

            var address = JSON.parse(localStorage.getItem("editAddress"));

            var html = template("editTpl", address);

            $('#editBox').html(html);

        }
    } else {
        var html = template("editTpl", {});
        $("#editBox").html(html);
    }



    var picker = new mui.PopPicker({ layer: 3 });
    picker.setData(cityData);
    $("#selectCity").on("tap", function() {
        picker.show(function(selectItems) {
            $("#selectCity").val(selectItems[0].text + selectItems[1].text + selectItems[2].text)
        })
    })


    //点击确认按钮之后,发送请求，将数据添加到收货地址管理列表页面;
    /**
     * 添加收货地址
     * 1.获取收货地址管理按钮并且添加点击事件
     * 2.获取用户输入的表单信息
     * 3.对用户输入的表单信息进行校验
     * 4.调用添加收货地址接口 实现功能
     * 5.跳转回收货地址列表页面
     */
    $("#addAddress").on("tap", function() {
        var username = $.trim($("[name='username']").val());
        var postCode = $.trim($("[name='postCode']").val());
        var city = $.trim($("[name='city']").val());
        var detail = $.trim($("[name='detail']").val());
        if (!username) {
            mui.toast("请输入收货人姓名");
            return;
        }

        if (!postCode) {
            mui.toast("请输入邮政编码");
            return;
        }
        if (!city) {
            mui.toast("请选择省市区");
            return;
        }
        if (!detail) {
            mui.toast("请输入详细的收货地址");
            return;
        }
        var data = {
            address: city,
            addressDetail: detail,
            recipients: username,
            postcode: postCode
        };
        if (isEdit) {

            // 编辑操作
            var url = "/api/address/updateAddress";

            data.id = address.id;

        } else {

            // 添加操作
            var url = "/api/address/addAddress";
        }


        $.ajax({
            type: "post",
            url: url,
            data: data,
            success: function(res) {
                if (res.success) {

                    if (isEdit) {
                        mui.toast("地址修改成功");
                    } else {
                        mui.toast("地址添加成功");
                    }

                    setTimeout(function() {
                        location.href = "address.html";
                    }, 2000)
                }
            }
        })
    })

})