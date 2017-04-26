<template>
  <div class="login-headerwrap">
  <header>
<h1 class="logo">
  <router-link to="/" exact>
  <img
  src="../../assets/logo2.png" alt="soobook logo">
  </router-link>
</h1>
<div class="log-in">
<h2 class="hidden">로그인</h2>

<ul >
<li class="nickname">  {{nickname}} 님</li>
<li>
  <!-- <router-link to="/"><a href>로그아웃</a></router-link> -->
  <button type="button" class="log-out" @click="LogOut">로그아웃</button>
</li>
<!-- <li>
  <router-link to="/mybook"><a href>마이 북리스트</a></router-link>
</li> -->
</ul>
</div>
</header>
</div>
</template>
<script>
export default {
    data() {
        return {
            nickname: localStorage.getItem("user")
        }
    },
    methods: {
        LogOut(){
            var token = 'Token ' + getCookie('SoobookToken');

            $.ajax({
              url: 'https://soobook.devlim.net/api/user/logout/',
              type: 'POST',
              headers: {
                Authorization: token,
              }
            })
            .done(function(response) {
              localStorage.removeItem('key');
              localStorage.removeItem('user');
              alert('로그아웃 되었습니다.');
              console.log(response);

              location.href= "/";

            })
            .fail(function(response) {
              console.log(response);
            });

        //     function getCookie(c_name) {
        //       var i,x,y,ARRcookies=document.cookie.split(";");
        //       for (i=0;i<ARRcookies.length;i++) {
        //         x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        //         y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        //         x=x.replace(/^\s+|\s+$/g,"");
        //
        //         if (x==c_name) {
        //           return unescape(y);
        //         }
        //       }
        // }
    }
}
}
</script>
<style>
</style>
