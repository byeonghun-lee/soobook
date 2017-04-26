<template>

    <div class="header-wrap">
    <header>
  <h1 class="logo">
    <router-link to="/" exact>
    <img src="../../assets/logo2.png" alt="soobook logo" width="200px">
    </router-link>
  </h1>
  <div class="log-in">
  <h2 class="hidden">로그인</h2>

<ul >
  <li>
    <router-link to="/signin"><a href>로그인</a></router-link>
  </li>
  <li>
    <router-link to="/signup"><a href>회원가입</a></router-link>
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
  name: "",
  data: function data() {
    return {

    }
  }
}
</script>
<style scope>
a:hover{
  font-weight: 600;
  /*border-bottom: 1px dotted #fff;*/
}
.router-link-active{
  margin:0;
}
ul li{
  display: inline-block;
  font-size: 1.2rem;
  margin: 1rem;
}
ul{
  padding:0
}


</style>
