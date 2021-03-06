# SooBook 프론트엔드 개발  
##### 2017-03-31
- 로그인, 회원가입 구현  
- 구글 api로 책 검색 가능  

##### 2017-04-03  
- 로그인 유지(sessionstorage)를 위해 id저장  
- 메인 페이지 뷰 구성  

##### 2017-04-04  
- 책 저장된 페이지 리스트뷰 변경가능하도록 구현  

##### 2017-04-05  
- 저장된 책을 여러 페이지에 나눠 나오게 구현 하고 싶음.  
- 참고 사이트
  - http://codepen.io/jnav/pen/VKZKLA  
  - https://www.youtube.com/watch?v=p_KAaE3Y0xA  

##### 2017-04-06  
- pagination 구현 중.  

##### 2017-04-07  
- pagination 구현. 하지만 서버 쪽에서 해준다고 하여 통신 쪽으로 봐야할 것 같음.

##### 2017-04-09  
- 디자인 수정  
  - 개인페이지에 3가지 버전의 리스트뷰 디자인 만듦.  
  - 몇 가지 색을 정하여 랜덤으로 뜨게 함  
  - 책의 커버를 한 번더 불어와서 크게 하고 blur효과를 줘서 배경으로 써봄.
  - 책의 위치를 변경하여 네모칸 밖으로 나가는 디자인도 해봄.  

- 제목과 리뷰 내용이 일정 글자 이상이면 "..."으로 바뀌게 수정함.  
- 반응형 시도.  

##### 2017-04-10  
- [team1](https://github.com/lldldudalsll/team1) 깃허브 연결.
###### *여기부턴 team1에 업로드함.*  
- vue cli 적용을 위해 정보를 찾아봄.  

##### 2017-04-11  
- 도서 검색 api와 연결.  
- 이전에 해봤던 jQuery로 연결함.  

##### 2017-04-12  
- vue cli로 옮기면서 작동하지 않던 글자 생략기능을 가능하게 바꿈.  
  - 개인페이지의 경우 mounted에 함수를 넣어서 해결했지만 검색했을 경우는 적용되지 않음.  
  - 선생님과 트러블 슈팅으로 vue에서 filter를 이용하여 고침.  
  - 책 커버이미지와, 제목, 저자를 불러오는 방식도 vue에 맞게 변경  

##### 2017-04-13  
- 원래 구현되었던 Drag and Drop이 vue로 옮기면서 작동하지 않음.  
 - vue에서 관련된 plugin과 자료를 찾아봄  
- html5부터 지원하는 Drag and Drop적용.(같은 조원이 구현했던 코드도 참고)  
- 하지만 vue에서 Drag and Drop 함수를 찾지 못 함.  

##### 2017-04-14  
- Drag and Drop 아직도 해결중.  
- plugin으로 해결하려 했으나 이동은 되는데 책을 검색하면 선택했던 책들도 바뀜.  
- vue에서 이벤트를 $event로 받는 것을 알아서 함수를 못찾는 상황을 옆사람들의 도움을 받아 해결.  
  - 하지만 아직도 plugin과 같이 선택했던 책들도 다시 책을 검색했을 경우 다른 책으로 바뀜.  

##### 2017-04-16  
- console창에서 Drag and Drop했을 때 선택했던 data는 제대로 받아오는 것을 확인  
- 그렇다면 선택된 책들의 노드를 복사해서 저장하면 된다고 생각해서 책에서 관련 부분을 찾아 시도해봄.  
- Drag and Drop이 제대로 작동.  
  - 기존의 구현 했을 때도 검색결과에서 책이 빠져서 선택창으로 갔음. 검색결과가 10개라 할 때 Drag and Drop을 하면 검색결과화면이 9개여서 보기 안 좋음.  
  - 하지만 노드를 복사해 왔기때문에 검색결과에 영향을 기치지도 않고 다시 검색했을 때도 선택했던 책의 정보가 남아 있음.  

##### 2017-04-17  
- 책 검색페이지 구현중.  
  - 토글 메뉴 모바일 버전 구현.  
  - 토글 메뉴 피씨 버전 구현.  
- 책 검색 후 저장 부분 구현 중.  
- 모바일을 생각해서 Drag and Drop 삭제. (관련코드는 booksearch(draganddrop)으로 남겨 두었음.)  
- 책을 클릭했을 때 선택된 목록에 들어가게 구현 중.  

##### 2017-04-18  
- 책 검색페이지에서 클릭시 선택된 목록에 추가 완료.  
  - Drag and Drop처럼 비슷한 방법으로 구현.  
- 선택된 목록에서 저장 버튼을 눌렀을 때 서버 통신 완료.  
- 선택된 목록에서 클릭 시에 대상을 제거하는 게 불가능.  

##### 2017-04-19  
- 책검색페이지에서 선택된 목록 중 클릭시 대상이 제거됨.  
  - 함수를 못 찾아서 고생했으나 addEventListener를 이용하여 함수를 찾음.  
- 책 검색영역에서 10개씩 잘라 여러페이지에 오지만 작동하지 않음.  

##### 2017-04-20  
- 책 검색페이지에 url 부분을 next로 설정해서 다음 목록을 불러와야하는데 불러오질 못 함.  
  - preflight 오류로 뜨는 데 아마도 http문제 인 듯 함.  
- 검색페이지에서는 검색결과가 10개씩 나누어 오는데 책이 저장된 페이지에서는 저장된 모든 책이 나옴.  
  - GET을 해오는 과정에 for문이 문제인 것 같음.  

##### 2017-04-21  
- 책 검색페이지 디자인 다시 조정  
- 검색페이지에서 페이지네이션이 안 된것이 혹시나 API에서 받은 url주소가 http와 https로 다르게 와서 문의후 서버에서 고쳐줬음. 페이지 네이션 성공(개인페이지에서 저장된 모든 책을 불러오는 부분도 서버측에 요청후 제대로 작동함.)  
- 개인페이지에서 책마다 잠금 버튼을 만들어 클릭시 삭제버튼이 나오게 구현  
- 삭제버튼을 클릭시 서버에 지워지는 DELETE통신 완료  
  - 바로 GET을 안 해와서 지워도 새로고침하지 않는 이상 페이지에 남아있음.  

##### 2017-04-24  
- 페이지네이션이 2페이지에서 안 넘어감.
  - 페이지 url을 변수에 저장하는 쪽이 문제인 거 같음

##### 2017-04-25  
- 페이지네이션 다음 페이지로 넘어가게 수정  
  - success에 data값을 다시 설정해줌으로써 주소를 바꿔줌.  
  - 같은 코드로 previous를 시도했지만 작동하지 않음.  
- 페이지네이션이 전체(My book)에 있어서 통신이 두번 부름.  
  - 갤러리뷰와 리스트뷰 컴포넌트 두 개를 v-if로 다시 합쳐야 할 것 같음.  
  - 통신을 줄이고 페이지네이션 가능하도록 해야 함.  

##### 2017-04-26  
- 부모와 통신으로 My book에서 버튼을 누를 때 리스트뷰에 알려줌.  
- 리스트뷰에 갤러리뷰를 합쳐서 v-if로 두가지 화면이 변하도록 바꿈.  
