<template>
  <div>
    <div class="bg-wrap">
      <div class="wrap-1200">
        <div class="book-search">
          <input v-model="search" type="text" @keyup.enter="searchTerm" class="search-input" placeholder="책이름, 저자, 출판사 를 입력해주세요">
          <button type="button" @click="searchTerm" class="search-btn">책 검색</button>
        </div>
        <div class="searchResults">
          <div class="results">
            <!--App.vue 모바일에서 overflow 추가 -->
              <div class="resultsBookList" v-for="post in posts" :id="post.id" @click="movingBook">
                <!--App.vue results img, picked-result img지움, 모바일 resultsBookList flex-basis추가 -->
                <img :src="post.cover_thumbnail" :alt="post.title">
                  <h3 class="resultsTitle">{{post.title | cropTitle}}</h3>
                  <p class="resultsAuthor">{{post.author}}</p>
              </div>
            <!--App.vue에 있는  results에서 padding, height 값 지움. -->
            <!--App.vue 442번째 줄 부터 애니메이션 toogle-in, toggle-out, bookclick 추가  -->
          </div>
          <div id="hiddenMenu" class="hiddenArea">
            <button type="button" class="hiddenMenuBar" @click="toggleMenu">선택된 책 목록</button>
            <button type="button" class="hiddenMenuButton" @click="lookMenu"><i class="fa fa-angle-double-left fa-2x" aria-hidden="true"></i></button>
            <div class="resultsRight">
              <div class="picked-result">
                <!--App.vue에 있는  picked-result값 다 지움(이 파일 밑에서  설정) -->

                <router-link to="/mybook">
                  <button type="button" class="booksave-btn" @click="addBooks">저장</button>
                  <!--App.vue에 있는  booksave-btn에서 가운데 정렬하는 값, position 지움. -->
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="searchPageButton">
          <button @click="searchPagePrevious">previous</button>
          <button @click="searchPageNext">next</button>
        </div>

  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      search: '',
      posts: [],
      post:[],
      next: null,
      previous: null
    }
  },
  filters: {
    cropTitle(value) {
      if (value.length < 7) {
        return value;
      } else {
        return value.substr(0, 7) + '...';
      }
    }
  },
  methods: {
    searchTerm(){
      var _this = this;
      var search = this.search;
      var next = _this.next;
      // axios.get("https://soobook.devlim.net/api/book/search/?keyword=" + search)
      //      .then(function(response) {
      //          return response.json();
      //      })
      //      .then(function(data) {
      //
      //      })

      $.ajax({
        url: "https://soobook.devlim.net/api/book/search/?keyword=" + search,
        dataType: "json",

        success: function(data){
          // _this.search = '';
          _this.posts = data.results;
          console.log("data:", data);
          _this.next = data.next
        },
        type: 'GET'
      });
    },
    addBooks(){
      var PickedBook = document.querySelector('.picked-result');
      var resultsBook = PickedBook.querySelectorAll('.resultsBookList');
      var id = this.id;
      // var book_id = this.book_id
      console.log('resultsBook:', resultsBook);
      for (var i = 0; i < resultsBook.length; i++) {
        console.log('resultsBook[i].id:', resultsBook[i].id);
        var book_id = resultsBook[i].id;
        // console.log('book_id:',book_id);
        console.log('this:',this);
        this.book_id = book_id;
      };

      var token = 'Token ' + getCookie('SoobookToken');

      console.log('book_id:',this.book_id);
      $.ajax({
        url: "https://soobook.devlim.net/api/book/mybook/",
        dataType: "	json",
        type: "POST",
        data: {
          book_id: this.book_id
        },
        headers: {
          Authorization: token,
        },
        success: function(data) {
          console.log('성공 :', data);
        },
        error: function(error){
          console.error('실패..:', error);
          console.log('data:',data);
        }
      })
      // function getCookie(c_name) {
      //   var i,x,y,ARRcookies=document.cookie.split(";");
      //   for (i=0;i<ARRcookies.length;i++) {
      //     x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      //     y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      //     x=x.replace(/^\s+|\s+$/g,"");
      //
      //     if (x==c_name) {
      //       return unescape(y);
      //     }
      //   }
      // }
    },
    movingBook(e){
      console.log(e.target.parentNode);
      var targetbook, pickArea, clonebook;
      targetbook = e.target.parentNode;
      targetbook.setAttribute('style', 'animation: bookclick 0.5s ease-in-out;');
      // console.log(targetbook.parentNode.getAttribute('class'));
      pickArea = document.querySelector('.picked-result');
      clonebook = targetbook.cloneNode(true);
      // clonebook.setAttribute('onclick','removeBook');
      clonebook.addEventListener('click', this.removeBook);
      console.log('clonebook' ,clonebook);
      pickArea.appendChild(clonebook);
    },
    searchPagePrevious(){
      var _this = this;
      var search = this.search;
      var previous = _this.previous;
      var token = 'Token ' + getCookie('SoobookToken');
      $.ajax({
        url: previous,
        dataType: "json",
        headers: {
          Authorization: token,
        },
        success: function(data){
          _this.posts = data.results;
          _this.previous = data.previous;
        },
        error: function(error){
          console.error("실패!!!", error);
        },
        type: 'GET'
      });
    },
    searchPageNext(){
      var _this = this;
      var search = this.search;
      var next = _this.next;
      var token = 'Token ' + getCookie('SoobookToken');
      $.ajax({
        url: next,
        dataType: "json",
        headers: {
          Authorization: token,
        },
        success: function(data){
          // _this.search = '';
          _this.posts = data.results;
          _this.next = data.next;
        console.log('성공 :', data);
        },
        error: function(error){
          console.error("실패!!!", error);
        },
        type: 'GET'
      });
    },
    removeBook(e){
      var selectParent, selectRemoveBook;
      selectParent = e.target.parentNode.parentNode;
      selectRemoveBook = e.target.parentNode;
      selectParent.removeChild(selectRemoveBook);
    },
    lookMenu(){
      var toggleMenu, togglebtn;
      toggleMenu = document.querySelector('#hiddenMenu');
      if(toggleMenu.className === "hiddenArea"){
        toggleMenu.setAttribute('class', 'hiddenAreaMb-active');
        togglebtn = document.querySelector('.fa-angle-double-left');
        togglebtn.outerHTML = '<i class="fa fa-angle-double-right fa-2x" aria-hidden="true"></i>';
      }else{
        toggleMenu.setAttribute('class', 'hiddenArea');
        togglebtn = document.querySelector('.fa-angle-double-right');
        togglebtn.outerHTML = '<i class="fa fa-angle-double-left fa-2x" aria-hidden="true"></i>';
      }
    },
    toggleMenu(){
      var toggleMenu, toggleMenu_active;
      toggleMenu = document.querySelector('#hiddenMenu');
      if(toggleMenu.className === "hiddenArea"){
        toggleMenu.setAttribute('class', 'hiddenArea-active');
        // toggleMenu.style.animation = "toggle-up 2s ease-in-out"
      }else{
        toggleMenu.setAttribute('class', 'hiddenArea');
      }
    }
  }
}
</script>
<style>
.bg-wrap{
  position: relative;
  overflow-x: hidden;
}
.wrap-1200{
  min-height: 100vh;
}
.results{
  /*width: 70%;*/
  /*max-height: 500px;*/
  margin-top: 40px;
}
.searchResults{
  min-height: 80vh;
}
.resultsBookList img{
  width: 124px;
  height: 186px;
}
.resultsTitle{
  margin: 2px 0;
}
.resultsAuthor{
  margin: 0;
}
.resultsRight{
  width: 100%;
  min-height: 100vh;
  background: white;
  box-shadow: -0.5px 0 0.5px 0.5px lightgray;
}
.booksave-btn{
  display: block;
  margin: 0 auto;
}
/*.clickBookEvent{
  animation: bookclick 1s ease-in-out;
}*/
.resultsBookList{
  display: flex;
  flex-direction: column;
  flex-basis: 20%;
  align-items: center;
  width: 165px;
  height: 275px;
  /*border:1px solid #ccc;*/
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  padding: 15px 0;
}
.picked-result{
  min-height: 105vh;
  width: 90%;
  padding-left: 10px;
}
.hiddenMenuButton{
  display: none;
}
.hiddenMenuBar{
  margin-top: 105px;
  width: 35px;
  height: 220px;
  border-radius: 7px 0 0 7px;
  color: white;
  background: #64b9c8;
  text-align: center;
}
#hiddenMenu{
  display: flex;
  position: absolute;
  top:0;
  overflow-y: scroll;
}
.hiddenArea{
  width: 40%;
  right: -40vw;
  animation: toggle-out 0.7s ease-in-out;
}
.hiddenArea-active{
  width: 40%;
  right: -20vw;
  animation: toggle-in 0.7s ease-in-out;
}
.hiddenAreaMb-active{
  width: 80%;
  right: 0%;
  animation: toggle-in 0.7s ease-in-out;
}
.searchPageButton{
  margin-top: 10px;
  margin-bottom: 30px;
  text-align: center;
}
.searchPageButton button{
  width: 100px;
  line-height: 2rem;
  border: 1px solid #64b9c8;
  background-color: inherit;
  color: #64b9c8;
}
.searchPageButton button:hover{
  background-color: #64b9c8;
  color: white;
}
.picked-result > div{
  width: 30%;
  height: 170px;
  margin: 10px auto;
  background: #b3d2eb;
  display: inline-block;
  margin: 10px 35px;;
}
.picked-result > div img{
  width: 60px;
  height: 90px;
}
.picked-result > div h3{
  font-size: 0.7rem;
}
.picked-result > div p{
  font-size: 0.7rem;
}
</style>
