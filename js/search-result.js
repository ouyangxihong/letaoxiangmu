//获取地址栏中的请求地址;
var keyword = getParamsUrl(location.href, 'keyword');
//当前页;
var page = 1;
var html = "";
var priceSort = 1;
var numSort = 1;
var This = null;
$(function() {
    // $.ajax({
    //     type: 'get',
    //     url: '/api/product/queryProduct',
    //     data: {
    //         page: page,
    //         pageSize: 3,
    //         proName: keyword
    //     },
    //     success: function(response) {
    //         html = template('listTpl', response);
    //         $('#listBox').html(html);
    //     }
    // })
    mui.init({
        pullRefresh: {
            container: refreshContainer, //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                auto: true, //可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
    $('#priceSort').on('tap', function() {
        priceSort = priceSort == 1 ? 2 : 1; //利用三元表达式更改排序的规则;
        //对之前的页面配置初始化;
        html = "";
        page = 1;
        //pullup-container为在mui.init方法中配置的pullRefresh节点中的container参数；
        //注意：refresh()中需传入true
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    })
    $('#numSort').on('tap', function() {
        numSort = numSort == 1 ? 2 : 1;
        html = "";
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    })
})


//获取地址栏中的请求参数;
function getParamsUrl(url, name) {
    var params = url.substr(url.indexOf('?') + 1);
    var param = params.split('&');
    for (var i = 0; i < param.length; i++) {
        var current = param[i].split('=');
        if (current[0] == name) {
            return current[1];
        }
    }
    return null;
}


function getData() {
    if (!This) {
        This = this;
    }
    $.ajax({
        type: 'get',
        url: '/api/product/queryProduct',
        data: {
            page: page++,
            pageSize: 3,
            proName: keyword,
            price: priceSort,
            num: numSort

        },
        success: function(response) {
            if (response.data.length > 0) {
                html += template('listTpl', response)
                $('#listBox').html(html);
                //告诉上拉加载组件当前数据加载完毕;
                This.endPullupToRefresh(false);
            } else {
                This.endPullupToRefresh(true);
            }
        }
    });
}