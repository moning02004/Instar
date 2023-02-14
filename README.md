# 인스타그램 클론 코딩

## 실행
```bash
docker-compose -c config/docker-compose.yml up -d --build  # container 시작
docker-compose -c config/docker-compose.yml down  # container 삭제

docker-compose -c config/docker-compose.yml stop     # container 종료
docker-compose -c config/docker-compose.yml start    # container 실행
docker-compose -c config/docker-compose.yml restart  # container 재실행
```

## 최종

### 2020/06/29

처음 설계했던 기능인 게시물 CRUD, 사용자 CRUD, 검색, 태그 등 완료하였다.
구상했던 그림과는 조금은 다르지만 한 달 간의 개발에서 많은 부분을 배울 수 있었다.
반응형은 부분적으로 구현했기 때문에 모바일에서는 보기 많이 어려울 수 있다.


## 기능
- 게시물 CRUD
- 댓글 CR
- 로그인 / 회원가입