$(function() {
    $('#searchbtn').on('click', function() {
        //获取用户输入的关键字;
        //声明一个空数组，用来存储用户输入的搜索关键字;

        var keyword = $(this).siblings('input').val();
        if (!keyword) {
            alert('请输入搜索关键字');
            return;
        }
        if (localStorage.getItem('keywords')) {
            var keywords = JSON.parse(localStorage.getItem('keywords'));
            keywords.push(keyword);
            localStorage.setItem('keywords', JSON.stringify(keywords));

        } else {
            localStorage.setItem('keywords', JSON.stringify([keyword]));
        }
        location.href = 'search-result.html?keyword=' + keyword;
    })
    if (localStorage.getItem('keywords')) {
        var keywords = JSON.parse(localStorage.getItem('keywords'))
        var html = template('historyTpl', { data: keywords })
        $('#historyBox').html(html);
    }
    $('#clearBox').on('tap', function() {
        localStorage.removeItem('keywords');
        $('#historyBox').html('');
    })

})