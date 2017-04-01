function bookSearch(){
  var search, results;
  search = document.querySelector('.bookSearch').value;
  results = document.querySelector('.search-results');
  // 책 검색후 다시 검색했을 때 초기화.
  document.querySelector('.search-results').innerHTML = "";

  $.ajax({
    url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
    dataType: "json",

    success: function(data){
      for(i=0; i<data.items.length; i++){
        var bookInfo = [
          '<div class="resultsBookList">',
            '<img src="' + data.items[i].volumeInfo.imageLinks.thumbnail + '">',
            '<div>',
              '<h3>' + data.items[i].volumeInfo.title + '</h3>',
              '<p>' + data.items[i].volumeInfo.authors + '</p>',
            '</div>',
          '</div>'
        ].join('');
        // results.innerHTML += "<div><img src=\"" + data.items[i].volumeInfo.imageLinks.thumbnail + "\"></div>"
        results.innerHTML += bookInfo;
      }
    },
    type: 'GET'
  });
}
var searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', bookSearch, false);

// 엔터키 활성화
var enterKey = 13;
document.addEventListener('keyup', function(e) {
  if ( e.keyCode === enterKey) {
    bookSearch();
  }
});
// 닉네임 들어가는 코드
(function(global){
  var userId = document.querySelector('.insertNickname');
  var userNick = global.sessionStorage.getItem('user_id');
  console.log("user_id:", userNick);
  userId.insertAdjacentHTML('afterbegin', userNick);
})(window);
