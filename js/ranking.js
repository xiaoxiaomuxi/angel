
(function() {
	var page=document.getElementById('page1');
    movie(page,"/v2/movie/top250");

    
})()
function show(data){
	var ID=data.id;
	url="move.html?"+ID;
	location.href=url;
}
function search(){
	var text=document.getElementById("search_text").value;
	url="search.html?"+text;
	location.href=url;
}
