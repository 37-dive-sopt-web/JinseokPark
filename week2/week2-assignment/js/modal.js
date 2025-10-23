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
  event.preventDefault();

  const members = getMembers();
  const member_input = {
    name: document.querySelector(".modal__name"),
    engname: document.querySelector(".modal__engname"),
    github: document.querySelector(".modal__github"),
    gender: document.querySelector(".modal__gender"),
    role: document.querySelector(".modal__role"),
    team: document.querySelector(".modal__team"),
    age: document.querySelector(".modal__age"),
  };

  for (const ipt of Object.values(member_input)) {
    if (ipt.value === "") {
      alert("모든 필드를 입력해야 새로운 멤버를 추가할 수 있습니다!");
      return;
    }
  }

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

  members.push(new_member);
  localStorage.setItem(DATA_KEY, JSON.stringify(members));
  tbody.innerHTML = "";
  members.forEach(renderMembers);
  modal_bg.classList.remove("pop_modal");
  modal_allInput.forEach((input) => {
    input.value = "";
  });
}
