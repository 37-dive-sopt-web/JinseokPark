/* 데이터 가져와서 localStorage가 비어있으면 데이터 넣기 */

import memberData from "./data.js";

const data_key = "memberData"; /* localStroage 데이터 키 변수 */
let members = [];

if (!localStorage.getItem(data_key)) {
  localStorage.setItem(data_key, JSON.stringify(memberData));
}

/* 데이터를 테이블에 출력하는 함수 */

const tbody = document.querySelector(".member_list__table tbody");
const table_key = [
  "name",
  "englishName",
  "github",
  "gender",
  "role",
  "codeReviewGroup",
  "age",
];

const savedData = localStorage.getItem(data_key);
members = JSON.parse(savedData);
members.forEach(renderMembers);

function renderMembers(member) {
  const tr = document.createElement("tr");
  tr.classList.add("table_row");

  const checkbox = document.createElement("td");
  checkbox.innerHTML = `<input type="checkbox" id="${member.id}">`;
  tr.appendChild(checkbox);

  table_key.forEach((key) => {
    const td = document.createElement("td");
    if (key === "github") {
      const a = document.createElement("a");
      a.href = `https://github.com/${member[key]}`;
      a.textContent = member[key];
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      td.appendChild(a);
    } else {
      td.textContent = member[key];
    }

    tr.appendChild(td);
  });

  tbody.appendChild(tr);
}

/* 필터링 기능 구현 */

const submit_btn = document.querySelector(".btn_submit");
const reset_btn = document.querySelector(".btn_reset");

submit_btn.addEventListener("click", filterMember);

function filterMember() {
  const filter_input = {
    name: document.querySelector(".filter__name input"),
    englishName: document.querySelector(".filter__engname input"),
    github: document.querySelector(".filter__github input"),
    gender: document.querySelector(".filter__gender select"),
    role: document.querySelector(".filter__role select"),
    codeReviewGroup: document.querySelector(".filter__team input"),
    age: document.querySelector(".filter__age input"),
  };

  const active_filter = [];
  let filtered_member = [];

  for (const key of Object.keys(filter_input)) {
    if (filter_input[key].value !== "") active_filter.push(key);
  }

  filtered_member = members.filter((member) => {
    return active_filter.every((key) => {
      return String(member[key]).includes(filter_input[key].value);
    });
  });

  tbody.innerHTML = "";
  filtered_member.forEach(renderMembers);
}

/* 필터링 초기화 */

reset_btn.addEventListener("click", resetFilter);

function resetFilter() {
  const all_input = document.querySelectorAll("input");
  const all_select = document.querySelectorAll("select");

  all_input.forEach((input) => {
    input.value = "";
  });

  all_select.forEach((select) => {
    select.value = "";
  });

  tbody.innerHTML = "";
  members.forEach(renderMembers);
}

/* 선택 삭제 기능 구현 */

const delete_btn = document.querySelector(".btn_delete");

delete_btn.addEventListener("click", deleteMember);

function deleteMember() {
  const checked_box = tbody.querySelectorAll("input[type='checkbox']:checked");

  const deleteID = Array.from(checked_box).map((box) => {
    return Number(box.id);
  });

  members = members.filter((member) => {
    return !deleteID.includes(member.id);
  });

  localStorage.setItem(data_key, JSON.stringify(members));
  tbody.innerHTML = "";
  members.forEach(renderMembers);
}

/* 전체 선택 기능 구현 */

const select_all = document.querySelector(".btn_all");

select_all.addEventListener("change", (event) => {
  const check = event.target.checked;
  const all_checkbox = tbody.querySelectorAll("input[type='checkbox']");

  all_checkbox.forEach((box) => {
    box.checked = check;
  });
});

/* 모달 구현 */

const modal_btn = document.querySelector(".btn_modal");
const modal_bg = document.querySelector(".modal_bg");
const close_modal = document.querySelector(".modal__form_title button");

modal_btn.addEventListener("click", () => {
  modal_bg.classList.add("pop_modal");
});

close_modal.addEventListener("click", () => {
  modal_bg.classList.remove("pop_modal");
});

modal_bg.addEventListener("click", (event) => {
  if (event.target === modal_bg) {
    modal_bg.classList.remove("pop_modal");
  }
});
