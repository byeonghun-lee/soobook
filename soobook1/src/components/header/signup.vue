<template>
  <div class="bg-wrap">
    <div class="wrap-1200">
  <div class="signup-box">
    <form id="join" method="post">

       <h2 class="signup-header">회원가입</h2>
     <label for="sb-email">이메일</label>
      <input type="email" id="sb-email" placeholder="이메일 아이디" required>
     <label for="sb-nickname">닉네임</label>
      <input type="text" id="sb-nickname" placeholder="닉네임" required>
      <label for="sb-password">비밀번호</label>
        <input type="password" id="sb-password" placeholder="비밀번호 6자리 이상" required>
         <label for="sb-Password-conf">비밀번호 확인</label>
           <input type="password" id="sb-password-conf" placeholder="비밀번호 확인" @keyup.enter="clickedSignUpButton" required>
      <button type="button" class="signup_submit_btn" @click="clickedSignUpButton">완료</button>
      </form>
  </div>
    </div>
      </div>


</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        // input value값을 user_data 객체로 저장
        clickedSignUpButton(){
            var joinForm = document.forms.join;
            var new_id = document.querySelector('#sb-email').value;
            var new_pw = document.querySelector('#sb-password').value;
            var new_pw_re = document.querySelector('#sb-password-conf').value;
            var new_nickname = document.querySelector('#sb-nickname').value;
            var user_data = {
                username: new_id,
                password: new_pw,
                nickname: new_nickname,
            };
            if (new_pw != new_pw_re) {
				alert("암호가 일치하지 않습니다");
				// joinForm.passWord.select();
				// return;
			       }
            if (new_pw.length < 6 || new_pw_re.length < 6) {
 				alert("암호는 6자리 이상 입력해주세요");
 			// 	joinForm.passWord.select();
 				// return;
 			       }

            // console.log(user_input);
            this.SignUp(user_data);
          },
        // 저장된 객체값 받아오기
        SignUp(user_data){
        	// jQuery ajax를 이용하여 SOOBOOK API 가져오기
        	$.ajax({
        	  url: 'https://soobook.devlim.net/api/user/signup/',
        	  type: 'POST',
        	  dataType: 'json',
        	  data: user_data
        	})
        	.done(function(response) {
        	  console.log(response);
              alert('가입이 완료되었습니다.')
              location.href= "/signin"
        	})
        	.fail(function(response) {
        	  console.log(response);
        	});
        },
    }
}
</script>
<style>
</style>
