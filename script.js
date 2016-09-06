var userId;
var watchlistId;
var watchlistRegex = /pageId.*content='(.*)'/;
var userRegex = /\/user\/(.*)\//;

$(document).ready(function() {
  userId = $('#navUserMenu > p > a').attr('href').match(userRegex)[1];
  $.ajax({
    url: 'http://www.imdb.com/user/' + userId + '/watchlist'
  }).done(function (data) {
    watchlistId = data.match(watchlistRegex)[1];
    //watchlistId = $('meta[property="pageId"]', data).attr('content');    
    $.ajax({
      url: 'http://www.imdb.com/list/export?list_id=' + watchlistId + '&author_id=' + userId + '&ref_=wl_exp'
    }).done(function(data) {
      var rows = CSV.parse(data);
      rows.shift(); //first row are row headers
      var filmIds = rows.map(function(obj) {
        return obj[1];
      });
      $('.filmo-category-section > div').each(function() {
        var filmId = $(this).attr('id').match(/.*-(.*)/)[1];
        if(filmIds.indexOf(filmId) >= 0) {
          $(this).css("background-color", "rgba(20,255,20,0.5)");
        }
      });
    }).fail(function(error) {
      console.log(error);
    });
  });
});

