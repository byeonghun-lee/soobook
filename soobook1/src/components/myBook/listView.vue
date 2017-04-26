<template>
  <div>
    <ul class="book-list" v-if="flag">
      <li
      class="bookList"
      v-for="item in items"
      :id="item.book.id">

      <div class="delete-Area">
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
      <router-link :to="{name:'detail', params:{id: item.book.id}}" tag="a" >
        <div class="bookListL">
          <img :src="item.book.cover_thumbnail" class="bookCover">
        </div>
      </router-link>
      <div class="bookListR">
        <h5 class="bookTitle">{{item.book.title | cropTitle}}</h5>
        <p class="bookAuthors">{{ item.book.author }}</p>
        <div class="star-rating">
          <label
          class="star-rating__star"
          v-for="rating in ratings"
          :class="{ 'is-selected': displayRank(item, rating) }">
          <input class="star-rating star-rating__checkbox" type="radio">
          ★
        </label>
      </div>
      <p class="bookReview" >{{item.comment[0]| is_comment }}</p>
      <p class="bookSaveDate">{{ item.updated_date }}</p>
    </div>

    </li>
  </ul>

<!-- 갤러리 뷰 -->
  <div class="my-bookshelf" v-else>
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

  </div>
</template>
<script>
export default {
  name: "listView",
  data: function() {
    return {
      items: [] ,
      item: [],
      value: null,
      temp_value: null,
      ratings: [1, 2, 3, 4, 5],
      book_id: ''
    }
  },
  filters: {
          cropTitle(value) {
              if (value.length < 10) {
                  return value;
              } else {
                  return value.substr(0, 10) + '...';
              }
          },
          cropDesc(value) {
              if (value.length < 40) {
                  return value;
              } else {
                  return value.substr(0, 40) + '...';
              }
          },
          is_comment(data){
            if(!data){
              return "리뷰를 작성 해주세요 ";
            }else{
              return data.content;
            }
          },
      },
  props: {
    'flag': Boolean,
    'name': String,
    'id': String,
    'disabled': Boolean,
    'required': Boolean
  },
  methods: {
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
      textCut(txt ,len) {
      if (len == "" || len == null) {
             len = 8;
         }
        if (txt.length > len) {
            txt = txt.substr(0, len) + '...';
        }
        return txt;
      },
      bookUnlock(e){
        var lockBtn, editBtn;
        lockBtn = e.target.parentNode.querySelector('.booklockbtn');
        editBtn = e.target.parentNode.querySelector('.editBtnArea');
        lockBtn.setAttribute('style', 'display: none');
        editBtn.setAttribute('style', 'display: inline-block; animation:fade-in 0.5s ease-in-out;');
      },
      bookLock(e){
        var lockBtn, editBtn;
        lockBtn = e.target.parentNode.parentNode.querySelector('.booklockbtn');
        editBtn = e.target.parentNode.parentNode.querySelector('.editBtnArea');
        editBtn.setAttribute('style', 'display: none');
        lockBtn.setAttribute('style', 'display: inline-block; animation:fade-in 0.4s ease-in-out;');
      },
      deleteBook(e){
        var token = 'Token ' + getCookie('SoobookToken');
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

   mounted() {
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
         for(var i = 0; i< data.results.length; i++){
         console.log('mybook',data.results[i]);
         console.log('comment',data.results[i].comment)
         console.log('updated_date:',data.results[i].updated_date)
         var utctime = data.results[i].updated_date;
         var utcLocaltime = moment.utc(utctime).toDate();
         var localTime = moment(utcLocaltime).local().format('YYYY-MM-DD HH:mm');
         console.log('localtime',localTime);
         data.results[i].updated_date = localTime;
         items.push(data.results[i]);
        //  var copyItems = items;
        //  console.log('copyItems',copyItems);
        //  copyItems.map(function(comment){
        //   var obj = {};
        //   if(!comment[0].content){
        //     return comment[0].content='';
        //   }else{
        //     return comment[0].content;
        //   }
        // });
        //  items.push(copyItems);
        //  console.log('items',items);


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
     var bookReviews = document.querySelectorAll('.bookReview');
     var bookTitles = document.querySelectorAll('.bookTitle');
     // console.log(bookReviews);
     for (var i = 0; i < bookReviews.length; i++) {
       // console.log(bookReviews[i].textContent);
       var bookReviewCut = this.textCut(bookReviews[i].textContent, 50);
       // console.log(bookReviewCut);
       bookReviews[i].textContent = bookReviewCut;
     }

     for (var i = 0; i < bookTitles.length; i++) {
       var bookTitleCut = this.textCut(bookTitles[i].textContent);
       bookTitles[i].textContent = bookTitleCut;
     }
    }
}
</script>

<style>
/*메인페이지2*/
.mainTop{
  margin: 30px 0;
}
.bookViewTop, .mainTop{
  display: flex;
  justify-content: space-between;
}
.book-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 40px 20px;

}
.bookList:hover{
  transform: translateY(-5px);
  transition: 0.5s ease-in;
}
.bookList{
  width: 45%;
  display: flex;
  margin: 30px 0px;
  padding: 10px;
  background: white;
  border-radius: 1px;
  box-shadow: 2px 1px 1px 0px lightgray;
  position: relative;
  /*border-left: 10px solid #ececec;*/
  border-left: 7px solid #ececec;
  /*border-left: 30px solid red;*/
}
.delete-Area{
  position: absolute;
  right: 10px;
}
.bookListL{
  /*position: relative;*/
  padding-top: 30px;
  text-align: center;
}
.bookCover{
  box-shadow: 2px 2px 2px 0px gray;
  width: 142px;
  height: 213px;
}
.bookTitle{
  /*padding-top: 170px;*/
  font-size: 1.4rem;
  color: #181818;
  margin: 10px 0;
}
.bookAuthors{
  color: #888;
  font-family: 'Iropke Batang', serif;
  margin: 15px 0;
}
.bookReview{
  color: #999;
  font-family: 'Iropke Batang', serif;
  line-height: 2rem;
  margin: 20px 0;
}
.bookSaveDate{
  color: #888;
  font-family: 'Iropke Batang', serif;
  margin: 2px 0;
  padding-top: 5px;
  border-top: 1px solid #ccc;
}
.fa-star{
  color: rgb(249, 207, 57);
}
.bookListL{
  width: 30%;
}
.bookListR{
  width: 70%;
  padding: 15px;
}
.viewWay{
  border: 0;
  background: #f9f9f9;
  cursor: pointer;
}
.bookViewBottom{
  margin: 30px 0;
}
.listViewBook{
  width: 30%;
  text-align: center;
}
.bookStorage{
  margin-top: 20px;
}
.pager{
  height: 150px;
  padding-top: 10px;
}
.pageNumber{
  display: inline-block;
  border: 1px solid #ccc;
  line-height: 2.2rem;
  padding: 0 10px;
  border-radius: 3px;
}
.delete-Area{
  height: 23px;
  text-align: center;
  position: absolute;
  top:0;
  right: 10px;
}

.delete-Area button{
  border-radius: 5px;
  background: #e4e4e4;
  padding: 0 30px;
}

/* -----   star rating   ----- */
.star-rating{
  display: flex;
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

/*갤러리뷰 CSS*/
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
