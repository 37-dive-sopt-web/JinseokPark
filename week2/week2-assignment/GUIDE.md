### 1. CSS 가이드라인

#### 1.1. 컬러 팔레트

| 역할      | CSS 변수                    | Hex 코드  | 설명               |
| --------- | --------------------------- | --------- | ------------------ |
| 메인      | `var(--color-main)`         | `#3B82F6` | 헤더, 주요 버튼    |
| 포인트    | `var(--color-point)`        | `#F97316` | 깃허브 텍스트 호버 |
| 서브      | `var(--color-main-light)`   | `#eff6ff` | 테이블 헤더        |
| 화이트    | `var(--color-white)`        | `#ffffff` | 전체 배경, 흰 글씨 |
| 섹션      | `var(--color-bg-section)`   | `#f9fafb` | 섹션 배경          |
| 보더      | `var(--color-border)`       | `#e5e7eb` | 보더 컬러          |
| 텍스트    | `var(--color-text-primary)` | `#1f2937` | 텍스트 메인 컬러   |
| 버튼 호버 | `var(--color-btn-hover)`    | `#2563eb` | 버튼 호버          |

#### 1.2. 기본 폰트

- **기본 폰트:**'IBM Plex Sans KR' (Google Font)
- **기본 크기:** 16px

#### 1.3. 속성 정의 순서

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
    <br />

### 2. JavaScript 함수 설명

#### 2.1. `render.js` (멤버 테이블 렌더링)

- **`renderMembers(member)`**
  - **설명:** 매개변수로 받은 객체를 테이블로 화면에 렌더링합니다.
  - **파라미터:** 멤버 데이터 객체
  - **반환 값:** 없음 (DOM 요소 직접 조작)
  - **간단한 로직**
    1.  `tr` 태그와 `td` 태그를 새롭게 생성
    2.  필요한 데이터 하나씩 넣어서 `appendchild` 활용 계층 만들기
    3.  `tr` 태그 완성되면 `tbody`에 직접 넣어서 화면 렌더링

---

#### 2.2. `filter.js` (필터링 로직)

- **`filterMember()`**

  - **설명:** 사용자가 입력한 필터링 조건에 따라 데이터를 필터링합니다.
  - **파라미터:** 없음
  - **반환 값:** 없음 (DOM 요소 직접 조작)
  - **간단한 로직**
    1.  필터 섹션 인풋 순회하며, 사용자가 작성한 조건만 모아서 배열로 생성 - `active_filter`
    2.  위 배열 요소를 모두 만족하는 멤버 데이터만 새로운 변수에 저장 - `filter()` + `every()` 고차함수 조합
    3.  필터링 된 데이터 테이블 렌더링 -> `renderMembers` 함수 활용

- **`resetFilter()`**
  - **설명:** 필터 섹션 인풋을 비우고, 필터링되지 않은 상태로 초기화합니다.
  - **파라미터:** 없음
  - **반환 값:** 없음 (DOM 요소 직접 조작)
  - **간단한 로직**
    1.  필터 섹션 모든 인풋 비우기
    2.  기존 멤버 데이터 (필터링 되기 전) 테이블 렌더링

---

#### 2.3. `delete.js` (데이터 선택 삭제)

- **`deleteMember()`**
  - **설명:** 체크한 데이터를 localStorage에서 삭제합니다.
  - **파라미터:** 없음
  - **반환 값:** 없음 (DOM 요소 직접 조작)
  - **간단한 로직**
    1.  체크되어 있는 박스의 id만 담은 배열을 생성합니다 -> `deleteID`
    2.  위 배열을 기준으로 현재 멤버 데이터를 필터링합니다.
    3.  필터링한 데이터를 localStorage에 덮어쓰고, 테이블에 렌더링합니다.

---

#### 2.4. `checkbox.js` (체크박스 로직)

- **`selectAllCheckbox()`**
  - **설명:** 전체 선택 체크박스를 구현합니다.
  - **파라미터:** 없음
  - **반환 값:** 없음 (DOM 요소 직접 조작)
  - **간단한 로직**
  1. 전체 체크박스의 상태에 따라, 아래 체크박스도 동일하게 설정합니다. (checked인지 아닌지) 2. 전체 체크박스를 제외한 아래 체크박스 중 몇 개가 선택되었는지에 따라 전체 체크박스 상태를 바꿉니다.

```
if (checkedCount === 0) {
      select_all.checked = false;
      select_all.indeterminate = false;
} else if (checkedCount === totalCount) {
      select_all.checked = true;
      select_all.indeterminate = false;
} else {
      /* 전체 중 일부만 체크되어 있는 경우 -> 전체 체크박스를 indeterminate 상태로 설정 */
      select_all.checked = false;
      select_all.indeterminate = true;
    }
```

#### 2.5. `modal.js` (모달에서 데이터 추가)

- **`appendMember(event)`**

  - **설명:** 사용자가 입력한 멤버 정보를 바탕으로 데이터에 새로운 멤버를 추가합니다.
  - **파라미터:** event 객체
  - **반환 값:** 없음 (DOM 요소 직접 조작)
  - **간단한 로직**
    1. `event.preventDefault()`로 브라우저의 기본 동작을 막습니다.
       (alert가 발생하고 난 후, 페이지가 재로드되면서 모달이 사라지는 것 방지 목적)
    2. 비어있는 인풋이 있다면 alert를 발생시킵니다.
    3. 사용자의 입력을 기반으로 새로운 멤버 객체를 생성합니다 -> new_member
    4. 현재 데이터에 추가해서 localStorage에 저장하고, 테이블을 새로 렌더링합니다.
    5. 모달을 닫고, 모달 내부 인풋을 비웁니다.

- **그 외 익명 함수 3개 : ** 모달 열기, 모달 닫기, 배경 누르면 모달 닫는 용도
