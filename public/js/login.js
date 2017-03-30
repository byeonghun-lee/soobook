var req = new XMLHttpRequest();
req.onreadystatechange = function a() {
  console.log(this.readyState, this.status);
  if(this.readyState == 4){
    var data = JSON.parse(this.response);
    console.log(this.response);
    console.log(this);
    for(var i in data){
    console.log(data[i]);
    window.data = data;
    }
  }
}
req.open("GET", "../DB/person.json")
req.send();

function getInfo() {
  var user_id = document.getElementById("user-id").value;
  var user_pw = document.getElementById("user-pw").value;

  for(i = 0; i < data.userList.length; i++){
    // 입력한 값과 리스트에서 값을 비교하는데 잘 찾아오나 확인
    // console.log('userList:',data.userList[i]);
    // console.log('input id:',user_id);
    // console.log('list id:',data.userList[i]["user-id"]);
    var user_id_list = data.userList[i]["user-id"];
    var user_pw_list = data.userList[i]["user-pw"];

    if( user_id === user_id_list && user_pw === user_pw_list){
      console.log("로그인 성공");
      return;
    } else {
      console.log('실패!!!');
    }
  };
};
