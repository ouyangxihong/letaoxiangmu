$(function() {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    $.ajax({
            type: 'get',
            url: '/api/category/queryTopCategory',
            success: function(response) {
                var html = template('linksTpl', { data: response })
                $('#linksBox').html(html);
                if (response.rows.length) {
                    var id = response.rows[0].id;
                    getCategory(id);
                }
            }

        })
        //点击一级分类获取二级分类数据列表;
    $('#linksBox').on('click', 'a', function() {

        var id = $(this).attr('data-id');
        $(this).addClass('active').siblings().removeClass('active');
        getCategory(id);
    })
})

function getCategory(id) {
    $.ajax({
        type: 'get',
        url: '/api/category/querySecondCategory',
        data: {
            id: id
        },
        success: function(response) {
            console.log(response);
            var html = template('brandTpl', { data: response })
            $('#brandBox').html(html);
        }
    })
}