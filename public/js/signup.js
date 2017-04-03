// function registerUser(){
//   var xhr = new XMLHttpRequest();
//   xhr.open("POST", "./DB/person.json", true);
//   var user_signup_id = document.getElementById("user-signup-id").value;
//   var user_signup_pw = document.getElementById("user-signup-pw").value;
//   var user_signup_nickname = document.getElementById("user-signup-nickname").value;
//
//   console.log('zz',user_signup_pw);
//
//     xhr.send(JSON.stringify({
//         'user-id' : user_signup_id,
//         'user-pw' : user_signup_pw,
//         'nickname' : user_signup_nickname
//   }));
// }



// var data = JSON.stringify({
//   "user-id": "test2@hanmail.net",
//   "user-pw": "12345",
//   "nickname": "ggg"
// });
//
// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;
//
// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === 4) {
//     console.log(this.responseText);
//   }
// });

// xhr.open("POST", "http://localhost:3000/userList");
// xhr.setRequestHeader("content-type", "application/json");
// xhr.setRequestHeader("cache-control", "no-cache");
// xhr.setRequestHeader("postman-token", "c9be1509-4ada-26b7-e655-71344827a92f");
//
// xhr.send(data);

function registerUser(){
  var user_signup_id = document.getElementById("user-signup-id").value;
  var user_signup_pw = document.getElementById("user-signup-pw").value;
  var user_signup_nickname = document.getElementById("user-signup-nickname").value;
  var data = JSON.stringify({
    "user-id": user_signup_id,
    "user-pw": user_signup_pw,
    "nickname": user_signup_nickname
  });

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  xhr.open("POST", "http://localhost:3000/userList");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("postman-token", "c9be1509-4ada-26b7-e655-71344827a92f");

  xhr.send(data);
  location.href="index.html";
}
