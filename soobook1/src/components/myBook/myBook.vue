<template>
  <div class="bg-wrap">
    <div class="booksearch-box">

      <div class="booksearch-inner">
        <p class="booksearch-title">책장에 등록하고 싶은 책을 검색해보세요</p>
        <router-link to="/booksearch" tag="button" type="button" class="search-btn">검색</button></router-link>
        </div>

    </div>
    <div class="utility">
    <div class="utility-inner">
      <p class="total-msg">Total 등록 책 : <span> {{count}} 권</span></p>
        <div class="btn-wrap">
          <router-link to="/mybook">
            <button @click="isList=false" type="button" class="view-btn"><i class="fa fa-th fa-2x" aria-hidden="true" ></i>
            </button>
          </router-link>
          <router-link to="/mybook">
            <button @click="isList=true" type="button" class="view-btn"><i class="fa fa-th-list fa-2x" aria-hidden="true"></i>
            </button>
          </router-link>
        </div>
        <div class="listbook-search">
         <label>
           <input v-model="search" type="text" placeholder="책장 내 검색"><button type="button" @click="mybookSearch"><i class="fa fa-search" aria-hidden="true"></i></button>
         </label>
       </div>
    </div>


    </div>
    <div class="wrap-1200">
      <transition name = "slide" mode="out-in">
      <router-view :flag="isList"></router-view>
      <!-- <list-view :flag="isList"></list-view> -->
    </transition>
    <div class="pagination">
    <!-- <router-link :to="{name:'mybook',query:{page:total_page}}" tag="a"> -->
      <span v-for="n in total_page" @click="movePagination(n)">{{ n }}</span>
    <!-- </router-link> -->
   </div>
    </div>

  </div>
</template>
<script>
import listView from './listView.vue';

export default {
  name: "myBook",
  components: {
    listView
  },
  data: function data() {
    return {
      count : '',
      total_page:'',
      search: '',
      page_link:'',
      isList: false
    }
  },
  methods:{
    mybookSearch(){
      var _this = this;
      var search = this.search;
      var token = 'Token ' + getCookie('SoobookToken');
      $.ajax({
        url: "https://soobook.devlim.net/api/book/mybook/search/?keyword=" + search,
        dataType: "	json",
        type: "GET",
        headers: {
          Authorization: token,
        },
        success: function(data) {
          // var mybooks = data.results.book;
          console.log('성공 :', data);
      },
        error: function(error){
          console.error('실패..:', error);

        }
      })
    },
    movePagination(n){
      console.log("n페이지!!");

    }
  },
  mounted () {
    var _this = this;
    var count = this.count;
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
        console.log('total :', data.count);
        console.log('page:',data.next);
        _this.count = data.count;
        _this.total_page = Math.ceil(data.count / 12);
        // _this.page_link = data.next;
    },

      error: function(error){
        console.error('실패..:', error);
        console.log('data:',data);
      }
    })

    //-------------

    var util = jQuery('.utility');
    var utilOffsetTop = Math.ceil(util.offset().top);
    jQuery(window).scroll(function() {
      var position = jQuery(this).scrollTop();
      var hasFixed = util.hasClass('fixed');
      if(position >= utilOffsetTop && !hasFixed) {
      // if(position >= 200) {
        util.addClass('fixed');
      }
      if (position < utilOffsetTop && hasFixed) {
      // if(position < 200) {
        util.removeClass('fixed');
      }
    });
  }
}
</script>
<style>

.pagination{
  font-size: 1.3rem;
  text-align: center;
  padding: 0 0 40px 0;
}
.pagination span{
  margin: 5px;
}
.pagination a{
  color:#464345;
}
.pagination span:hover{
  color:#64b9c8;
  cursor: pointer;
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
.slide-enter-active{
  animation: slide-in 0.4s
}

.slide-leave{
  opacity: 1
}

.slide-leave-active{
    animation: slide-out 0.4s
}
</style>
