/* 모달 구현 */

import { renderMembers } from "./render.js";
import {
  open_modalBtn,
  close_modalBtn,
  submit_modalBtn,
  modal_bg,
  modal_allInput,
  DATA_KEY,
  getMembers,
  tbody,
  member_input,
} from "./dom.js";

open_modalBtn.addEventListener("click", () => {
  modal_bg.classList.add("pop_modal");
});

close_modalBtn.addEventListener("click", () => {
  modal_bg.classList.remove("pop_modal");
  modal_allInput.forEach((input) => {
    input.value = "";
  });
});

/* 모달 뒤 배경 눌렀을 때 모달 닫기 & 모달 내부 인풋 비우기 */
modal_bg.addEventListener("click", (event) => {
  if (event.target === modal_bg) {
    modal_bg.classList.remove("pop_modal");
    modal_allInput.forEach((input) => {
      input.value = "";
    });
  }
});

submit_modalBtn.addEventListener("click", appendMember);

function appendMember(event) {
  event.preventDefault(); /* alert 띄운 이후, 페이지 재로드 방지 용도 */

  /* 위 인풋 중 하나라도 비어있으면, alert */
  for (const ipt of Object.values(member_input)) {
    if (ipt.value === "") {
      alert("모든 필드를 입력해야 새로운 멤버를 추가할 수 있습니다!");
      return;
    }
  }

  /* 새로운 멤버 객체 생성 */
  const new_member = {
    id: Date.now(),
    name: member_input.name.value,
    englishName: member_input.engname.value,
    github: member_input.github.value,
    gender: member_input.gender.value,
    role: member_input.role.value,
    codeReviewGroup: member_input.team.value,
    age: member_input.age.value,
  };

  const members = getMembers();
  members.push(new_member);
  localStorage.setItem(DATA_KEY, JSON.stringify(members));
  tbody.innerHTML = "";
  members.forEach(renderMembers);

  /* 모달 닫고, 모달 내부 인풋 요소들 비우기 */
  modal_bg.classList.remove("pop_modal");
  modal_allInput.forEach((input) => {
    input.value = "";
  });
}
