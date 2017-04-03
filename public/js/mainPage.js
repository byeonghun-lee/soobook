(calNick = function(global){
  var userId = document.querySelector('.insertNickname');
  var userNick = global.sessionStorage.getItem('user_id');
  console.log("user_id:", userNick);
  userId.insertAdjacentHTML('afterbegin', userNick);
})(window);


function logOut() {
  var userNick = sessionStorage.removeItem('user_id');
  location.href="index.html";
}
