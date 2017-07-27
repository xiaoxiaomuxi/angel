function movie(element, URL) {
	console.log(2);
    var page = element;
    var htmlobj = $.ajax({
        type: "GET",
        data: {
            count: 10

        },
        dataType: 'JSONP',
        url: "https://api.douban.com" + URL,
        success: function(data) {
            var movies = data.subjects;
            console.log(movies);
            $("body").css("background","none");
            page.innerHTML="";
            renderDOM(page, movies);

        }
    });
}

function renderDOM(page,movies) {
    for (var i = 0; i < 10; i++) {
        page.innerHTML += "<a id='" + movies[i].id + "' href='#' onclick='show(this)'>" +
            "<img class='poster' src='" + movies[i].images.small + "'>" +
            "<p class='rating'>" + movies[i].rating.average + "</p>" +
            "<div class='meta'>" +
            "<p class='title'>" + movies[i].title + "</p>" +
            "<p class='sub-title'>" + movies[i].original_title + movies[i].year + "</p>" +
            "<p class='artists'>" + movies[i].directors[0].name + "</p>" +
            "</div>" +
            "</a>";


    }
}
