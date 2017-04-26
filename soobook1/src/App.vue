<template>
  <div id="app" class="main-bg">
    <!-- <video src="assets/book.mp4" loop autoplay></video> -->
    <!-- <h1><abbr title="Single Page Application">SPA</abbr></h1> -->
    <router-view name="header"></router-view>
    <!-- <router-view name="home"></router-view> -->



    <transition name = "slide" mode="out-in">
      <!-- <router-view name="searchBar"></router-view>
      <router-view name="utility"></router-view> -->
      <router-view></router-view>
    </transition>


    <router-view name="footer"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',

  // components:{
  //   appNav : Navigation
  // },
  data () {
    return {

    }
  }
}
</script>

<style >

@import url( "http://fonts.googleapis.com/earlyaccess/notosanskr.css" );
[v-cloak] {
display: none;
}
*{
box-sizing: border-box;
}
html{
font-size: 14px;

}
body{
/*font-family: 'Spoqa Han Sans';*/
font-family: "Noto Sans KR", sans-serif;
margin: 0;
padding: 0;

}
.hidden{
position:absolute;
left:-9999em;
}
a{
text-decoration: none;
color: #fff;
}
ul,ol,li{
list-style: none;

}
ul,ol,li,figure{
margin:0;
padding: 0;
}
button,textarea{
font-family: inherit;
}
textarea{
padding:5px;
}


.logout:hover{
border-bottom: 2px dotted #e6ac17;
}
button{
border-style: none;
border-radius: 2px;
cursor: pointer;
}
/*video {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  transform: translateX(-50%) translateY(-50%);

}*/

.bg-wrap {
width: 100%;
min-height: 100vh;
/*background: #fbf6ec;*/
background: url('assets/pattern.jpg')
}
.main-bg{
width: 100%;
min-height: 100vh;
background-image: url('assets/main1.jpg');
background-position: center;
background-size: cover;
}
/*@keyframes background-scroll {
from{
  transform : translateY(0px);
}
to{
  transform : translateY(-200px);
}
}*/
.wrap-1200{
width: 1150px;
margin: 0 auto;
position: relative;
/*background: #fbf6ec;*/
}
header{
width: 1150px;
margin: 0 auto;
/*padding-bottom: 15px;*/
}

.header-wrap,.login-headerwrap{
/*backdrop-filter:blur(10px);*/
background: hsla(200, 2%, 20%, 0.1);
border-bottom: 1px solid hsla(0, 0%, 100%, 0.5);
/*box-shadow: 5px 5px 5px #fff;*/
display: flex;
flex-direction: row;
margin: 0 auto;
padding:0.8rem 0;
justify-content: space-between;
}
.login-headerwrap{
background: hsla(0, 0%, 5%, 0.9);
color: #fff;
border-bottom: 1px solid hsla(0, 3%, 83%, 0.16);
}
.logo{
  display: inline;
}
.logo img{
width:200px;
margin-top: 12px;
margin-left: 20px
}
.log-in{
display: flex;
float: right;
margin-right: 7px;
/*margin: 2rem;*/
}

.log-in a{
color:#fff;
}
.log-out{
  background: none;
  color:#fff;
  font-size: 1.2rem;
}
input{
width: 14rem;
height: 2.6rem;
border-radius: 3px;
border-style: none;
border: 1px solid #c1d0d1;
padding-left: 1rem;
position: relative;
margin-right: 0.5rem;
top:2px;
}


/*회원가입 폼 모달*/

.signup-box{
color:#504d4f;
padding: 150px 30px;
text-align: center;
width: 600px;
margin: auto;
}
.signin-box{
  width: 600px;
  margin: auto;
  padding: 200px 30px;
}
.signin-box input {
  margin: 9px;
}
.signin-info p{
  text-align: center;
  color:#a5a7a6;
}
.signin-info span{
  font-weight: bold;
  text-decoration: underline;
  color:#a5a7a6;
}
.signup-header{
font-size: 2.5rem;
padding-bottom: 20px;
margin-top:0;
text-align: center;
border-bottom: 1px solid #64b9c8;
}

.signup-box label{
display: inline-block;
font-size: 1.5rem;
width: 150px;
line-height: 1.6;
margin: 10px;
text-align: left;
position: relative;
top:8px;
}
.signup-box input , .signin-box input {
text-align: left;
width: 250px;
}

.signin-btn,.signup-btn,.search-btn,.signup_submit_btn{
width:8rem;
height: 2.7rem;
border-radius: 3px;
background: #64b9c8;
color: #fff;
border-style: none;
vertical-align:middle;
margin-right: 0.3rem;
cursor: pointer;
}
.signin-btn{
  margin-top: 20px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.signup_submit_btn{
margin-top: 30px;
margin-left:auto;
margin-right: auto;
}
.login_info{
font-size: 1.7rem;
color: #fff;
font-weight: 400;
position: relative;
top:-0.7rem;
/*float: right;*/
}
.slogan{
font-family: 'Iropke Batang', serif;
/*text-shadow: 1px 1px 3px #bdc2bf;*/
text-align: center;
font-size: 2rem;
line-height: 1.5;
/*font-weight: bold;*/
color: #fff;
position: absolute;
top:40%;
left: 50%;
transform: translateX(-50%) translateY(-50%);
/*font-family: 'Nanum Pen Script';*/
}
.slogan span{
  background: hsla(200, 20%, 10%, 0.2);
}
.quote{
  font-size: 1.2rem;
}

/*책장 첫화면*/
/*개인책장 초기 pape*/

.bookadd-box{
  position: relative;
  top:300px;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-flow:column;

}
.add-msg{
  font-size: 1.3rem;
  text-align: center;

}
.bookadd-btn{
  width: 300px;
  height: 50px;
  border-radius: 10px;
  background: #64b9c8;
  color:#fff;
  font-size: 1.8rem;
  border-style: none;
  margin-left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}

/*구글 책검색 page*/
.booksearch-box{
  background-image: url(assets/cta-header.jpg);
  color:#fff;
}
.booksearch-inner{
  padding: 20px;
  width: 500px;
  margin:0 auto;
}
.booksearch-inner button{
  margin-left:50%;
  transform: translateX(-50%);
}
.booksearch-title{
  font-size: 1.5rem;
  text-align: center;
  margin-top: 0;
}

.book-search{
  width: 1000px;
  margin: 0 auto;
  padding-top: 70px;
  text-align: center;
}
.search-input{
  width: 500px;
  height: 30px;
}
.search-btn{
  height: 31px;
}
.results{
  /*min-height: 340px;*/
  min-height: 80vh;
  y-overflow: scroll;
  /*padding:30px;*/
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
/*.results figcaption{
text-align: center;
font-size: 1.5rem;
color:#8a8488;
}*/
.results img{
  margin: 10px;
  width:100px;
  height: 123.4px;
}

.picked-result img {
  width: 100px;
  height: auto;
  margin: 8px;
}
.booksave-btn{
  width: 200px;
  height: 50px;
  border-radius: 5px;
  background: #64b9c8;
  color:#fff;
  border-style: none;
  position: relative;
  /*bottom:30px;*/
  margin-top: 10px;
  /*left:70%;*/
  /*transform: translateX(-70%);*/
  cursor: pointer;
}



.fade-enter-active{
  animation: fade-in 0.3s;
}

.fade-leave-active{
  animation: fade-out 0.3s;
}


.slide-enter-active{
  animation: slide-in 0.4s
}

.slide-leave{
  opacity: 1
}

.slide-leave-active{
    animation: slide-out 0.4s
}


@keyframes fade-in{
  from{opacity:0;}
  to{
    opacity: 1;
  }
  }
@keyframes fade-out{
  from{opacity: 1;}
  to{
    opacity: 0;
  }
}
@keyframes slide-in{
  from{
    transform: translateY(500px);
  }

  to{
    transform: translateY(-21px);
    opacity: 1;
  }
}
/*@keyframes slide-out{
  from{
    transform: translateY(0);
  }

  to{
    transform: translateY(-1040px);
    opacity: 0;
  }
  }*/

  @keyframes toggle-in{
     0%{
       transform: translateX(100%);
     }
     100%{
       transform: translateX(0%);
     }
   }
   @keyframes toggle-out{
     0%{
       transform: translateX(-70%);
     }
     100%{
       transform: translateX(0);
     }
   }
   @keyframes bookclick {
     0%{
       transform: scale(1);
     }
     50%{
       transform: scale(1.1);
     }
     100%{
       transform: scale(1);
     }
   }


/*유틸리티바*/
.utility{
  background: #fff;
  /*border-bottom: 1px dotted #676b6b;*/
  box-shadow: 1px 1px 5px #a2a4a4;
  padding: 20px;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index:100;
}


.utility-inner{
  width:1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  position:relative;
  padding: 0 20px;
}
.total-msg{
  font-size: 1.5rem;
  margin: 0;
}
.total-msg span{
  color: #f5225b;
  font-weight: 600;
}
.view-btn{
    background: transparent;
    border: none;
    margin: 5px;
    cursor: pointer;
}

.listbook-search{
  margin-right: 7px;
}
.listbook-search button{
  width: 36px;
  height: 36.38px;
  position: relative;
  top:3px;
  margin: -9px;
  background: #64b9c8;
  color: #fff;
  border-style: none;
  border-radius: 2px;
}
.booklist-edit{
  position: absolute;
  top:110px;
  right:85px;
}
.booklist-edit button{
  width:100px;
  height: 30px;
  background: #f41046;
  color:#fff;
  border-radius: 3px;
  border-style: none;
  font-size: 1.4rem;
  cursor: pointer;
}
.booklist-edit .plus-btn{
  background: #64b9c8;
}

/*책정보 디테일 모달*/

.selected_area{
  padding:50px 100px 0;
  position: relative;
}
.books-info{
  display: flex;
  justify-content: flex-start;
  text-align: left;
  color:#555355;
  font-size: 1.5rem;
  margin-bottom: 20px;
  margin-left: 40px;
}

.book-info .rating{
  text-align: left;
}

.info-text{
  margin-left: 30px;
}
.review{
  margin: 0 auto;
  margin-bottom: 10px;
  border-bottom: 1px dashed #eee;
}

.review input{
  margin-bottom: 10px;
  width:100%;
  }
.review-title{
  font-size: 1.8rem;
  border-bottom: 1px solid #eee;
  color:#0d2a4d;
  padding-bottom:10px;
}
.review-content{
  font-size: 1rem;
  color:#686a67;
}
.review-text{
  height:265px;
  overflow: auto;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px;
  margin-bottom:10px;
  background: #f4efe6;
}
.review textarea{
  width:100%;
  border-radius: 5px;
  padding:20px;
  box-sizing: border-box;
}
.review button{
  background: #64b9c8;
  color: #fff;
  width:100%;
  height: 40px;
  margin-bottom: 20px;
}
.edit-set{
 margin-left: 90%;
 display: flex;

}
.review .edit-btn,.review .delete-btn{
  width:40px;
  border-radius: 40px;
  margin-right: 5px;
}
.review .delete-btn{
  background: #f61e45;
}

.book-phrase input{
  margin-bottom: 10px;
  width:92%;
}
.book-phrase button{
  background: #64b9c8;
  color: #fff;
  height:38px;
  width:60px;
  position: relative;
  top:3px;
}
.phrase-area{
  padding:10px;
  width:100%;
  height: 150px;
  overflow:auto;
  margin: 0 auto;
  background: #f4efe6;
  border-radius: 3px;
}
.phrase-area li{
  border-bottom: 1px dotted #686a67;
  display: block;
  font-size: 1.3rem;
  padding: 5px 10px;
  color: #535455;
  font-weight: 400;
  margin: 0;
  font-size: 1rem;
}
.phrase-area li span{
  color:#959595;
  font-size: 1rem;
  float:right;
}
  footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #0c0001;
  }
  footer p{
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    color:#eee;
    margin: 0 auto;
  }
@media screen and (max-width: 500px){
  .wrap-1200{
    max-width:100%;
    /*min-width:300px;*/
  }
  .slogan{
    margin:0;
    font-size: 1rem;
  }
  .slogan span{
    font-size: 0.8rem;
  }
  .logo img{
  width:100px;
  margin-top: 12px;
  margin-left: 10px;
  }
  .log-in li{
    font-size: 1rem;
    /*margin-right: 0;*/
  }
  .log-in .nickname{
    display: none;
  }
  input{
    padding-left: 0.4rem;
  }
  .utility{
    height:60px;
    padding:8px;
  }
  .utility-inner{
    width:100%;
    display:flex;
    justify-content: space-between;
    padding:3px 25px;
    /*float:left;*/
  }
  .utility-inner:after{
    content: '';
    display: block;
    clear:both;
  }
  .listbook-search input{
    width:70%;
  }
  .total-msg{
    font-size: 1rem;
    display: none;
  }
  .view-btn{
    margin:8px 2px;
  }
  .btn-wrap{
    margin-right: 20px;
    display: flex;
    flex-flow:row nowrap;
  }
  .signin-box,.signup-box{
    padding: 3px 10px;
    width:100%;
  }
  .signup-header{
    padding-bottom: 10px;
    font-size: 1.8rem;
  }
  .signin-box input{
    width:100%;
    margin-left:0;
  }
  .signup-box input{
    width:100%;
    margin-bottom: 10px;
  }
  .signup-box label{
    margin-left: 0;
    font-size: 1rem;
    text-align: center;
    width: 100%;
    margin-top: 0;
    display: none;
  }
  .booksearch-inner{
    width:100%;
  }
  .booksearch-title{
    font-size: 1.1rem;
  }
  /*책검색 뷰*/
  .book-search{
    width:100%;
    padding:30px 10px;
  }
  .search-input{
    width:100%;
    margin-bottom: 10px;
  }
  .resultsBookList{
    display: block;
    flex-basis: 50%;
    /*margin-bottom: -80px;*/
    padding:0;
    height: 180px;

  }
  .results{
    padding:0;
  }

  .results img{
    width:100%;
    height:auto;
    width:82px;
    height:120px;
  }
  .resultsBookListP{
    padding:0;
    margin:0;
    display: none;
  }
  .resultsBookList h3{
    margin:0;
    font-size: 0.8rem;
    /*display: none;*/
  }
  .resultsBookList p{
    margin:0;
    font-size: 0.6rem
    /*display: none;*/
  }


  /*갤러리뷰*/
  .my-bookshelf{
    /*float:left;*/
    width:100%;
    margin-top: 10px;
  }
  .booklist1 {
    margin:20px 3px;
    width: 145px;
    height:296px;
  }
  .img-box{
    padding:5px 20px 0;
  }
  .booklist-img{
    /*width:100%;*/
  }
  .book-coverlist{
    /*width:50%;*/
  }
  .title{
    margin:0;
  }
  .author{
    margin:0;
  }
  /*.book-wrap{
    width:100%;
  }*/
  /*리스트뷰*/
  .book-list{
    margin:0;
  }
  .bookList{
    display: block;
    width:100%;
    font-size: 1rem;
    line-height: 1.5;
    border-left:none;
    margin: 10px 0 ;
  }
  .bookListR{
    width:100%;
    text-align: center;
    padding: 5px;
  }
  .bookListL{
    width:100%;
    padding:0;
  }
  .bookTitle{
    margin:0;
  }
  .bookAuthors{
    margin:0;
  }
  .bookReview{
    margin: 5px 0;
  }
  /*북디테일뷰*/
  .selected_area{
    padding:10px 5px;
  }
  .books-info{
    margin-left: 20px;
    margin-bottom: 5px;
  }
  .info-text{
    margin-left: 5px;
    font-size: 1.2rem;
  }
  .rating span{
    font-size: 1.5rem;
  }
  .edit-set{
    margin-left: 70%;
  }
  .book-phrase input{
    margin-bottom: 10px;
    width:85%;
  }
  .book-phrase button{
    width:12%;
    /*heigth:38px;*/
    font-size: 0.8rem;
    margin-left: -8px;
  }


  /*추가 css*/
  .hiddenMenuButton{
    display: block;
    /*position: fixed;
    right:0;*/
    height: 30px;
  }
  .booksave-btn{
    width: 8rem;
    height: 2.4rem;
  }
  .picked-result{
    margin-top: 0;
    border: 0;
    /*padding:60px 0px;*/
    /*margin-right: 0;*/
  }
  .results{
    width: 100%;
  }
  .resultsRight{
    width: 100%;
    background: white;
    min-height: 100vh;
  }
  .hiddenArea{
    width: 90%;
    right: -84%;
  }
  .fa-angle-double-left, .fa-angle-double-right{
    color: white;
  }
  .hiddenMenuBar{
    display: none;
  }
  .hiddenMenuButton{
    border-radius: 30% 0 0 30%;
    margin-top: 70px;
    background: #64b9c8;
  }
  .picked-result > div{
    width: 40%;
    height: 150px;
    margin: 5px 10px;
  }



}



</style>
