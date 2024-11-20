API 명세서
Base URL
https://github.com/rkddlsxo/daon-back

1. 마이페이지 API
1.1 마이페이지 조회 (개인정보 + 신청한 봉사활동 목록)
Endpoint: GET /api/mypage
Description: "김인하" 사용자의 마이페이지 정보를 조회합니다.
Response (Success)
{
  "user": {
    "userIdx": 1,
    "name": "김인하",
    "email": "inha@example.com",
    "nickname": "선한인하"
  },
  "previousVolunteer": [
    {
      "idx": 1,
      "title": "환경 보호 캠페인",
      "status": "신청 완료",
      "date": "2024-11-20"
    },
    {
      "idx": 2,
      "title": "노인 복지 봉사",
      "status": "진행 중",
      "date": "2024-12-01"
    }
  ]
}

2. 봉사활동 목록 API
2.1 봉사활동 목록 조회
Endpoint: GET /api/volunteers
Description: 등록된 봉사활동 목록을 조회합니다.
Query Parameters:
keyword (optional): 검색 키워드
date (optional): 날짜 필터
Response (Success):
[
  {
    "idx": 1,
    "title": "환경 보호 캠페인",
    "date": "2024-11-20",
    "location": "서울",
    "description": "서울 도심에서 환경 정화 활동"
  },
  {
    "idx": 2,
    "title": "노인 복지 봉사",
    "date": "2024-12-01",
    "location": "부산",
    "description": "지역 복지관에서 봉사 활동"
  }
]

2.2 봉사활동 상세 조회
Endpoint: GET /api/volunteers/:id
Description: 특정 봉사활동의 상세 정보를 조회합니다.
Response (Success):
{
  "idx": 1,
  "title": "환경 보호 캠페인",
  "description": "서울 도심에서 환경 정화 활동",
  "date": "2024-11-20",
  "location": "서울",
  "participants": [
    {
      "userIdx": 1,
      "name": "김인하",
      "nickname": "선한인하"
    }
  ]
}

2.3 봉사활동 신청
Endpoint: POST /api/volunteers/:id/apply
Description: 김인하 사용자가 특정 봉사활동에 신청합니다.
Response (Success):
{
  "message": "봉사활동 신청이 완료되었습니다."
}

3. 후기 작성 게시판 API
3.1 후기 목록 조회
Endpoint: GET /api/reviews
Description: 작성된 후기 목록을 조회합니다.
Query Parameters (optional):
volunteerId: 특정 봉사활동의 후기만 조회
Response (Success):
[
  {
    "idx": 1,
    "volunteerIdx": 1,
    "content": "좋은 경험이었습니다.",
    "author": "김인하",
    "date": "2024-11-20"
  }
]

3.2 후기 작성
Endpoint: POST /api/reviews
Description: 김인하 사용자가 봉사활동 후기를 작성합니다.
Request Body:
{
  "volunteerIdx": 1,
  "content": "좋은 경험이었습니다."
}
Response (Success):
{
  "message": "후기 작성이 완료되었습니다.",
  "reviewId": 1
}

4. 자유게시판 API
4.1 게시글 목록 조회
Endpoint: GET /api/board
Description: 자유게시판의 게시글 목록을 조회합니다.
Response (Success):
[
  {
    "idx": 1,
    "title": "첫 글입니다.",
    "content": "안녕하세요!",
    "author": "김인하",
    "date": "2024-11-20"
  }
]

4.2 게시글 작성
Endpoint: POST /api/board
Description: 김인하 사용자가 자유게시판에 게시글을 작성합니다.
Request Body:
{
  "title": "첫 글입니다.",
  "content": "안녕하세요!"
}
Response (Success):
{
  "message": "게시글 작성이 완료되었습니다.",
  "postId": 1
}

4.3 게시글 상세 조회
Endpoint: GET /api/board/:idx
Description: 특정 게시글을 조회합니다.
Response (Success):
{
  "idx": 1,
  "title": "첫 글입니다.",
  "content": "안녕하세요!",
  "author": "김인하",
  "date": "2024-11-20"
}

5. 봉사활동 모집 게시판 API
5.1 모집 게시글 목록 조회
Endpoint: GET /api/recruit
Description: 봉사활동 모집 게시글 목록을 조회합니다.
Query Parameters (optional):
  status: 모집상태 필터 (recruiting: 모집중, completed: 모집완료)
  keyword: 검색 키워드
Response (Success):
[
  {
    "idx": 1,
    "title": "주말 강아지 산책 봉사 같이하실 분",
    "author": "김인하",
    "date": "2024-11-20",
    "location": "인천 송도",
    "recruitStatus": "모집중",
    "currentMembers": 2,
    "maxMembers": 5,
    "volunteerDate": "2024-12-15"
  }
]

5.2 모집 게시글 상세 조회
Endpoint: GET /api/recruit/:idx
Description: 특정 모집 게시글의 상세 정보를 조회합니다.
Response (Success):
{
  "idx": 1,
  "title": "주말 강아지 산책 봉사 같이하실 분",
  "content": "매주 토요일 강아지 산책 봉사활동을 함께할 분들을 모집합니다.",
  "author": "김인하",
  "date": "2024-11-20",
  "location": "인천 송도",
  "recruitStatus": "모집중",
  "currentMembers": 2,
  "maxMembers": 5,
  "volunteerDate": "2024-12-15",
  "participants": [
    {
      "userIdx": 1,
      "name": "김인하",
      "nickname": "선한인하"
    }
  ]
}

5.3 모집 게시글 작성
Endpoint: POST /api/recruit
Description: 새로운 봉사활동 모집 게시글을 작성합니다.
Request Body:
{
  "title": "주말 강아지 산책 봉사 같이하실 분",
  "content": "매주 토요일 강아지 산책 봉사활동을 함께할 분들을 모집합니다.",
  "location": "인천 송도",
  "maxMembers": 5,
  "volunteerDate": "2024-12-15"
}
Response (Success):
{
  "message": "모집 게시글이 작성되었습니다.",
  "recruitId": 1
}

5.4 모집 참여 신청
Endpoint: POST /api/recruit/:idx/join
Description: 특정 모집 게시글에 참여 신청을 합니다.
Response (Success):
{
  "message": "참여 신청이 완료되었습니다."
}

5.5 모집 마감
Endpoint: PATCH /api/recruit/:idx/close
Description: 모집을 마감 처리합니다. (작성자만 가능)
Response (Success):
{
  "message": "모집이 마감되었습니다."
}
