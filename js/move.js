(function() {
    if (location.search) {
        var url = location.search;
        var str = url.substr(1);
        var page = document.getElementById('page1');
        movie(page, "/v2/movie/subject/" + str);
    } else {
        $("body").css("background", "none");
    }

})()

function search() {
    var text = document.getElementById("search_text").value;
    url = "search.html?" + text;
    location.href = url;
}

function movie(element, URL) {
    console.log(2);
    var page = element;
    var htmlobj = $.ajax({
        type: "GET",
        data: {
            count: 100

        },
        dataType: 'JSONP',
        url: "https://api.douban.com" + URL,
        success: function(data) {
            var movies = data;
            console.log(data);
            $("body").css("background", "none");
            page.innerHTML = "";
            renderDOM(page, movies);

        }
    });
}

function renderDOM(page, movies) {
    page.innerHTML +=
        "<img class='poster' src='" + movies.images.large + "'>" +
        "<p class='title'>" + movies.title + movies.year + "</p>" +
        "<p class='info'>评分：" + movies.rating.average + "</p>" +
        "<div class='info' ><p>导演：</p><div id='director'></div></div>" +
        "<div class='info' ><p>主演:</p><div id='cast'></div></div>" +
        "<div class='summary'>" +
        "<p class='label'>摘要：</p>" +
        "<p class='content'>" + movies.summary + "</p>";
    var director = $("#director");
    for (var i = 0; i < movies.directors.length; i++) {
        var p = "<p>" + movies.directors[i].name + "</p>"
        director.append(p);
    }
    var cast = $("#cast");
    for (var i = 0; i < movies.casts.length; i++) {
        var p = "<p>" + movies.casts[i].name + "</p>"
        cast.append(p);
    }

}
