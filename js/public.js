$(function() {
    $('body').on('tap', 'a', function() {
            mui.openWindow({
                url: $(this).attr('href')
            })

        })
        // mui('body').on('tap', 'a', function() {
        //     document.location.href = this.href;
        // });
})