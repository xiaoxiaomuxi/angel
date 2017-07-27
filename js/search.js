
$(function() {

    // dropload
    var index = 0;
    if (location.search) {
        var url = location.search;
        var str = url.substr(1);
    }
    var dropload = $('.scroll-wrap').dropload({
        domUp: {
            domClass: 'dropload-up',
            domRefresh: '<div class="dropload-refresh">↓下拉刷新</div>',
            domUpdate: '<div class="dropload-update">↑释放更新</div>',
            domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
        domDown: {
            domClass: 'dropload-down',
            domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
            domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData: '<div class="dropload-noData">暂无数据</div>'
        },
        loadUpFn: function(me) {
            $.ajax({
                type: 'GET',
                dataType: 'JSONP',
                url: "https://api.douban.com/v2/movie/search?q="+str,
                success: function(data) {
                    console.log(data);
                    var result = '';
                    var movies = data.subjects;
                    for (var i = 0; i < data.subjects.length; i++) {
                        result += "<a id='" + movies[i].id + "' href='#' onclick='show(this)'>" +
                            "<img class='poster' src='" + movies[i].images.small + "'>" +
                            "<p class='rating'>" + movies[i].rating.average + "</p>" +
                            "<div class='meta'>" +
                            "<p class='title'>" + movies[i].title + "</p>" +
                            "<p class='sub-title'>" + movies[i].original_title + movies[i].year + "</p>" +
                            "<p class='artists'>" + movies[i].genres[0] + "</p>" +
                            "</div>" +
                            "</a>";
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function() {
                        $('.page').html(result);
                        // 每次数据加载完，必须重置
                        dropload.resetload();
                    }, 1000);
                },
                error: function(xhr, type) {
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    dropload.resetload();
                }
            });
        },
        loadDownFn: function(me) {
            $.ajax({
                type: 'GET',
                dataType: 'JSONP',
                data: {
                    count: 20 + 20 * index,
                    start: 0 + 20 * index
                },
                url: "https://api.douban.com/v2/movie/search?q="+str,
                success: function(data) {
                    var result = '';
                    index++;
                    console.log(index);
                    var movies = data.subjects;
                    for (var i = 0; i < data.subjects.length; i++) {
                        result += "<a id='" + movies[i].id + "' href='#' onclick='show(this)'>" +
                            "<img class='poster' src='" + movies[i].images.small + "'>" +
                            "<p class='rating'>" + movies[i].rating.average + "</p>" +
                            "<div class='meta'>" +
                            "<p class='title'>" + movies[i].title + "</p>" +
                            "<p class='sub-title'>" + movies[i].original_title + movies[i].year + "</p>" +
                            "<p class='artists'>" + movies[i].genres[0] + "</p>" +
                            "</div>" +
                            "</a>";
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function() {
                        $('.page').append(result);
                        // 每次数据加载完，必须重置
                        dropload.resetload();
                    }, 1000);
                },
                error: function(xhr, type) {
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    dropload.resetload();
                }
            });
        }
    });
});
function show(data){
    var ID=data.id;
    url="move.html?"+ID;
    location.href=url;
}
function search() {
    var text = document.getElementById("search_text").value;
    var page = document.getElementById('page1');
    movie(page, "/v2/movie/search?q=" + text);
}
