#### CSS 속성 선언 순서

1. **display** - 표시(관련 속성:visibility)
2. **overflow** - 넘침
3. **float** - 흐름(관련 속성: clear)
4. **position** - 위치(관련 속성:top,right,bottom,left,z-index)
5. **width & height** - 크기
6. **margin & padding** - 간격
7. **border** - 테두리
8. **background** - 배경
9. **font** - 폰트(관련 속성: color, letter-spacing,text-align, etc)
10. **animation** - 동작(관련 속성: animation, transform, etc)
11. **기타** - 위에 언급되지 않은 나머지 속성

#### 기본 브라우저 스타일 제거 & 기준 폰트 스타일

- 기본 margin, padding 제거, box-sizing을 border-box로 통일
  `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}`

- font-family : Noto Sans KR (Google Font) / 기준 폰트 사이즈 : 16px
