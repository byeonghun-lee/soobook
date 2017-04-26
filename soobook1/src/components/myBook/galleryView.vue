<template>
<div>

<!-- <button type="button" @click="showMyBooks">내 책 보여줘</button> -->
    <div class="my-bookshelf">
      <!-- <div class="wrap-1200" > -->

      <ul class="booklist1" v-for="item in items">
          <li class ="book-coverlist" :id="item.book.id">
            <div class="book-wrap">
            <router-link :to="{name:'detail', params:{id: item.book.id}}" tag="a" >
              <div class="img-box">
                  <!-- <img :src="item.book.cover_thumbnail" alt="" width="152px" height="190px" class="booklist-img"> -->
                  <img :src="item.book.cover_thumbnail" alt="" class="booklist-img">
              </div>
              </router-link>
              <div class="book-info">
                  <h3 class="title">{{item.book.title | cropTitle}}</h3>
                  <p class="author">{{item.book.author | cropTitle}}</p>
                  <div class="line"></div>
              </div>
              <div class="star-rating gallery-rating">
                  <label
                  class="star-rating__star"
                  v-for="rating in ratings"
                  :class="{ 'is-selected': displayRank(item, rating) }">
                  <input class="star-rating star-rating__checkbox" type="radio">
                  ★
                  </label>
              </div>
              <div class="delete-field">
                <button type="button" class="booklockbtn" @click="bookUnlock" >
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </button>
                <div class="editBtnArea">
                  <button type="button" class="bookUnlockbtn" @click="bookLock">
                    <i class="fa fa-unlock" aria-hidden="true"></i>
                  </button>
                  <button type="button" class="deleteBookBtn" @click="deleteBook">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </li>

              </ul>
          </div>
          <div class="paginationArea">
            <!-- <a v-for="n in total_page" @click="movePagination">{{ n }}</a> -->
          </div>
          </div>

</template>
<script>
export default {
  name: "bookDetail",
  data: function data() {
    return {
        items:[],
        item: [],
        value: null,
        temp_value: null,
        ratings: [1, 2, 3, 4, 5],
        // total_page:'',
        book_id: ''
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
    props: {
      'name': String,
      'id': String,
      'disabled': Boolean,
      'required': Boolean
    },
methods:{
  // selectedBook: function(book) {
  //     this.selected_book = book;
  //   }
  displayRank(item, rating) {
    console.log('rating:', rating);
    console.log('item.star.content:', item.star.content);
    // rating <= item.star.content
    var star_rating = item.star[0].content;
      return star_rating >= rating;
  },
  star_over: function(index) {
    if (this.disabled) {
    return;
    }
    this.temp_value = this.value;
    this.value = index;
  },
  star_out: function() {
    if (this.disabled) {
    return;
    }
    this.value = this.temp_value;
  },
  set: function(value) {
    if (this.disabled) {
    return;
    }
    this.temp_value = value;
    this.value = value;
    console.log(value)
  },

  bookUnlock(e){
    var lockBtn, editBtn;
    lockBtn = e.target.parentNode.querySelector('.booklockbtn');
    editBtn = e.target.parentNode.querySelector('.editBtnArea');
    lockBtn.setAttribute('style', 'display: none');
    editBtn.setAttribute('style', 'display: inline-block; animation:fade-in 0.5s ease-in-out;');
  },
  bookLock(e){
    console.log("잠그기 버튼!!!");
    var lockBtn, editBtn;
    lockBtn = e.target.parentNode.parentNode.querySelector('.booklockbtn');
    editBtn = e.target.parentNode.parentNode.querySelector('.editBtnArea');
    editBtn.setAttribute('style', 'display: none;');
    lockBtn.setAttribute('style', 'display: inline-block; animation:fade-in 0.4s ease-in-out;');
  },
  deleteBook(e){
    var token = 'Token ' + getCookie('SoobookToken');
    console.log("책 삭제 버튼!!!!");
    var _this = this;
    var selectBook = e.target.parentNode.parentNode.parentNode.parentNode;
    console.log(selectBook);
    var book_id = selectBook.getAttribute("id");
    console.log("book_id: ", book_id);

    // var _this = this;
    $.ajax({
      url: "https://soobook.devlim.net/api/book/mybook/",
      dataType: "json",
      data: {
        book_id: book_id
      },
      headers: {
        Authorization: token,
      },
      success: function(data){
        // _this.search = '';
        // _this.posts = data.results;
        console.log("data:", data);
      },
      error: function(error){
        console.error("에러!!!!:", error);
      },
      type: 'DELETE'
    });

  }

},

mounted(){
      var _this = this;
      var items = this.items;
      var token = 'Token ' + getCookie('SoobookToken');
      // console.log('book_id:',this.book_id);
      $.ajax({
        url: "https://soobook.devlim.net/api/book/mybook/",
        dataType: "	json",
        type: "GET",
        headers: {
          Authorization: token,
        },
        success: function(data) {
          // var mybooks = data.results.book;
          console.log('성공 :', data);
          console.log('책리스트 :', data.results);
          _this.items = data.results
          for(var i = 0; i< data.results.length; i++){
            console.log(data.results[i]);
            _this.book_id = data.results[i].book.id
            _this.value = data.results[i].star[0].content
          }
      },
        error: function(error){
          console.error('실패..:', error);
          console.log('data:',data);
        }
      })
      $.ajax({
    url: "https://soobook.devlim.net/api/book/star/",
    dataType: "	json",
    type: "GET",
    headers: {
        Authorization: token,
    },
    success: function(data) {
        console.log('성공 :', data);
        for(var i = 0; i< data[0]; i++){
            console.log('별점 :', data[0].content);
            _this.value = data[0].content
        }
    },
    error: function(error){
        console.error(error.responseText);
    }
  })

}
// updated() {
//   var _this = this;
//   var items = this.items;
//   var token = 'Token ' + getCookie('SoobookToken');
//   // console.log('book_id:',this.book_id);
//   $.ajax({
//     url: "https://soobook.devlim.net/api/book/mybook/",
//     dataType: "	json",
//     type: "GET",
//     headers: {
//       Authorization: token,
//     },
//     success: function(data) {
//       console.log('성공 :', data);
//       console.log('책리스트 :', data.results);
//       _this.items = data.results
//       console.log('_this.items:',_this.items);
//       console.log(item.book);
//   },
//     error: function(error){
//       console.error('실패..:', error);
//       console.log('data:',data);
//     }
//   })
//
// }
}
</script>
<style>
.my-bookshelf {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 0 auto;
  margin-top: 50px;
  width: 100%;
}

.booklist1 {
  /*display: flex;
  flex-flow: column wrap;*/
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  margin: 50px 80px 50px 0;
  /*position: relative;*/
  width: 202px;
  height:345px;
}
.book-coverlist{
  margin:0;
  padding:0;
  width:100%;
}
.booklist1:hover {
  transform: translateY(-5px);
  transition: 0.5s ease-in;
}

.img-box {
  width:100%;
  padding:20px 20px 0;
  display: flex;
  justify-content: center;
  background: #ececec
}
.booklist-img {
  align-items: center;
  width:152px;
  height:190px;
}

.book-info {
  margin: 0 25px;
  color: #131418;
}


.title {
  margin-top: 10px;
  height: 23px;
  display: block;
  font-size: 13px;
  text-align: center;
  padding-bottom: 2px;
}
.author {
  margin-bottom: 11px;
  font-size: 13px;
  text-align: center;
  color:#686a68;

}
.line {
  border-top: 1px solid #e2e2e2;
  margin-bottom: 10px;
}
.delete-field {
  height: 25px;
  background: #ececec;
}

/* -----   star rating   ----- */

.gallery-rating{
  display: flex;
  justify-content: center;
}

.star-rating__checkbox {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}
.star-rating__star {
  display: inline-block;
  padding: 3px;
  vertical-align: middle;
  line-height: 1;
  font-size: 1.5em;
}


/* 추가 CSS*/
.delete-field{
  text-align: center;
}
.delete-field button{
  border-radius: 5px;
  background: white;
  padding: 0 40px;
}
.editBtnArea{
  display: none;
}

</style>
