<template>
  <div class="bg-wrap">
    <div class="wrap-1200">
      <div class="selected_area" >
        <div class="books-info" v-for="item in items">
          <div>
            <img :src="item.book.cover_thumbnail" :alt="item.book.title">
          </div>
          <div class="info-text">
          <h3>{{item.book.title}}</h3>
          <p>저자 : {{item.book.author}}</p>

          <!-- star-rating start-->
          <div class="star-rating">
            <label
              class="star-rating__star"
              v-for="rating in ratings"
              :class="{ 'is-selected': displayRank(item, rating), 'is-disabled': disabled }"
              @mouseover="star_over(rating)"
              @mouseout="star_out"
              @click="set(rating)">
            <input
              class="star-rating star-rating__checkbox"
              type="radio"
              :name="name"
              :value="rating"
              :required="required"
              :id="id"
              :disabled="disabled"
              v-model="value">
              ★
            </label>
          </div>
          <!-- star-rating end -->
        </div>
    </div>
      </div>
      <!-- 리뷰부분 -->
      <div class="review" v-for="item in items">
        <form action="#">
        <template v-if="show">
        <textarea
        name="name"
        rows="10"
        cols="65"
        class="review-textarea"
        placeholder="책을 읽고 느낀 리뷰를 자유롭게 써주세요"
        v-model="item.comment.content"


        ></textarea>
        </template>

        <!-- 책리뷰 텍스트 공간 -->
        <div class="review-text" v-if="!show" >
          <p
          v-for = "comment in item.comment"
          class="review-content"
         :key= "item.comment.content"
          >{{item.comment.content}}</p>
        </div>

        <!--버튼  -->

        <button type="button" v-on:click="addnewReview" v-if="show" >저장하기</button>
        <div class="edit-set">
          <button v-if="!show" class="edit-btn" type="button" @click="show=true">수정</button>
          <button v-if="!show" class="delete-btn" type="button" @click="deleteReview">삭제</button>
        </div>

        </form>
    </div>
    <!-- 책속글귀 부분 -->
      <div class="book-phrase">
        <input
              v-model="items[0].mark.content"
              @keyup.enter = "addBookMark"
              type="text"
              class="bookmark"
              placeholder="기억에 남는 책속 글귀를 입력해주세요.">
        <button type="button" @click="addBookMark">입력</button>
        </div>
        <ul class="phrase-area" >
          <li
          v-for=" mark in items[0].mark"
          :key= "mark.content"
          >{{mark.content}}
          <button
          type="button"
          @click="deleteBookMark">x</button>
          <span>{{mark.update_date}}</span>
        </li>
        </ul>
    </div>
  </div>
</div>

</template>
<script>
export default {
  name: "",
  data: function data() {
    return {
      items: [ ],
      bookid:'',
      show : !true,
      value: null,
      temp_value: null,
      ratings: [1, 2, 3, 4, 5],
    }
  },
  mounted(){
    var _this = this;
    var items = this.items;
    var bookid = this.bookid;
    var token = 'Token ' + getCookie('SoobookToken');
    // console.log('book_id:',this.book_id);
    $.ajax({
      url: "https://soobook.devlim.net/api/book/mybook/detail/?bookid=" + bookid ,
      dataType: "	json",
      type: "GET",
      data:{
        bookid: this.$route.params.id
      },
      headers: {
        Authorization: token,
      },
      success: function(data) {
        // var mybooks = data.results.book;
        console.log('성공 :', data);
        for(var i = 0; i< data.length; i++){
        console.log("mark",data[i].mark);
        var bookmark = data[i].mark;
        for(var m = 0; m< bookmark.length; m++){
          var bookmark_time = bookmark[m].update_date;
          var utcLocaltime = moment.utc(bookmark_time).toDate();
          var localTime = moment(utcLocaltime).local().format('YYYY-MM-DD HH:mm');
          console.log('bookmark[m]',bookmark[m]);
          console.log('bookmark[m].update_date',bookmark[m].update_date);
          console.log('localTime',localTime);
          bookmark[m].update_date = localTime;
        }
        data[i].mark.reverse();
        items.push(data[i]);
        console.log('items',items);
      }
    },
      error: function(error){
        console.error('실패..:', error);
        console.log('data:',data);
      }
    })
  },
  props: {
        'name': String,
        'id': String,
        'disabled': Boolean,
        'required': Boolean
    },
  methods: {
    displayRank(item, rating) {
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
    var token = 'Token ' + getCookie('SoobookToken');
    // console.log(token)
    var items = this.items
    $.ajax({
        url: "https://soobook.devlim.net/api/book/star/",
        dataType: "	json",
        type: "POST",
        data: {
            mybook_id: items[0].mybook_id,
            content: this.value
        },
        headers: {
            Authorization: token,
        },
    })
    .done(function(response) {
        console.log('done', response);
        alert('별점이 저장되었습니다. :)')
    })
    .fail(function(error) {
        console.log('fail', error);
    });
  },
  addBookMark : function(){
    var mark_input = document.querySelector('.bookmark');
    var mark = document.querySelector('.bookmark').value;
    var token = 'Token ' + getCookie('SoobookToken');
    var items = this.items;
    $.ajax({
        url: "https://soobook.devlim.net/api/book/mark/",
        type: 'POST',
        headers: {
          Authorization: token,
        },
        dataType: "json",
        data: {
          mybook_id: items[0].mybook_id,
          content: mark
        }
    })
    .done(function(response) {
        console.log('mark add 성공', response);
        // var bookmark = data[i].mark;
        // for(var i = 0; i < mark.length;i++){
        //시간형식 설정
        var utctime = mark.update_date;
        var utcLocaltime = moment.utc(utctime).toDate();
        var localTime = moment(utcLocaltime).local().format('YYYY-MM-DD HH:mm');
        console.log('localtime',localTime);
        console.log('글귀추가시간',mark.update_date);
        // console.log('mark.id',items.mark.id);
        utctime = localTime;
        // items[0].mark[0].content = mark;
        items[0].mark.unshift({update_date:localTime,content:mark});
        // mark_input='';
      })
    .fail(function(response) {
        console.log('fail', response);
        console.log('items', items);
    });
      // this.selected_book.bookTexts='';
  },
  deleteBookMark(){
    var items = this.items;
    var token = 'Token ' + getCookie('SoobookToken');
    $.ajax({
        url: "https://soobook.devlim.net/api/book/mark/",
        type: 'DELETE',
        headers: {
          Authorization: token,
        },
        dataType: "json",
        data: {
          //내가 선택한 삭제버튼 찾는법 물어보기
          mark_id: items[0].mark[0].id
        }
    })
    .done(function(response) {
        console.log('done', response);
        items[0].mark.splice(0,1);
      })
    .fail(function(response) {
        console.log('fail', response);
        console.log('deleteMark', items[0].mark[0].id);
    });
  },
  addnewReview(mybook_id,content){
    var review = document.querySelector('.review-textarea').value;
    var token = 'Token ' + getCookie('SoobookToken');
    var items = this.items;
    $.ajax({
        url: "https://soobook.devlim.net/api/book/comment/",
        type: 'POST',
        headers: {
          Authorization: token,
        },
        dataType: "json",
        data: {
          mybook_id: items[0].mybook_id,
          content: review
        }
    })
    .done(function(response) {
        console.log('done', response);
      })
    .fail(function(response) {
        console.log('fail', response);
        console.log('items', items);
    });
    this.show = !true;
  },
  deleteReview:function(){
    var items = this.items;
    var token = 'Token ' + getCookie('SoobookToken');
    $.ajax({
        url: "https://soobook.devlim.net/api/book/comment/",
        type: 'DELETE',
        headers: {
          Authorization: token,
        },
        dataType: "json",
        data: {
          comment_id: items[0].comment[0].id
        }
    })
    .done(function(response) {
        console.log('done', response);
        items[0].comment[0].content='';
      })
    .fail(function(response) {
        console.log('fail', response);
        // console.log('items', comment);
    });
    // items.comment[0].content = '';
  },
}
}
</script>
<style>
.star-rating{

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
  color: #ABABAB;
  transition: color .2s ease-out;
}
.star-rating__star:hover {
  cursor: pointer;
}
.star-rating__star.is-selected {
  color: #FFD700;
}
.star-rating__star.is-disabled:hover {
  cursor: default;
}
</style>
