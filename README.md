# 회원 관리 서비스

## 실행 방법

``` bash
$ git clone https://github.com/hodory/source.user-management.front-end.git
$ cd ./source.user-management.front-end
 # dev모드로 실행
$ npm i && npm run serve
```

백엔드 서비스는 현재 heroku URL로 고정되어 있습니다.

## 설계
### 응답 설계
### 기본 응답 포맷
```
{
    "responseCode": {RESPONSE_CODE},
    "data": {
        {KEY} : {Object | Array}
    },
    "path": "",
    "message": {MESSAGE},
    "errorCode": {NULL | ERROR_CODE}
}
```
#### 회원 로그인 응답
```
# 로그인 성공시 HTTP Status Code : 201
{
    "expiresIn": {EXPIRE_TIME},
    "accessToken": {JWT_TOKEN},
    "payload": {
        "email": {LOGIN_USER_EMAIL},
        "name": {LOGIN_USER_NAME},
        "level": {LOGIN_USER_LEVEL}
    }
}

# 패스워드 오류 HTTP Status Code : 400
{
    "statusCode": 400,
    "message": "Invalid Password"
}

# 회원 아이디 없음 HTTP Status Code : 204
```

### 사용 프레임워크

- Front-End
    - Vue.js
- BackEnd Service
    - nest.js
    - Heroku(JawsDB)

백엔드는 Heroku 서비스를 이용하고 프론트는 Now 서비스를 이용하여 배포 하였으며,<br/>


### 가능한 개선 사항
- 회원의 레벨 뿐 아니라, 회원이 가질 수 있는 권한을 스프링 시큐리티의 `authorities`와 같이 분할 하여,<br/>
`READ` | `WRITE` | `UPDATE` |`DELETE` 권한을 개별 부여도 가능 할 것 같음
- 언어를 학습 하는것 보다 프레임워크를 학습하는게 더 빠를것이라는 판단을 하여<br/>
자바스크립트 기반의 백엔드 프레임워크를 선정하였지만,<br/>
해당 프레임워크 학습을 하는 과정에서 시간이 부족하게 되어 UI/UX적으로 깔끔하게 처리 하지 못 하였음
- 백엔드 서비스 부팅시 마스터 권한을 가진 계정을 생성할 수 있었을 것으로 보임
- 회원 목록에 대한 페이징 처리도 가능 하였을것임.
- 현재 사용자 액세스 토큰을 localStorage에 우선적으로 담아 두었는데, 쿠키를 이용하여 도메인 기반으로 처리할 수 있었을것이라고 생각합니다.
 
