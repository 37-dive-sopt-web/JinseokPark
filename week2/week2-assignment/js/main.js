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
members.forEach(appendMembers);

function appendMembers(member) {
  const tr = document.createElement("tr");
  tr.classList.add("table_row");

  const checkbox = document.createElement("td");
  checkbox.innerHTML = `<input type="checkbox" id="${member.id}">`;
  tr.appendChild(checkbox);

  table_key.forEach((key) => {
    const td = document.createElement("td");
    td.textContent = member[key];
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
    gender: document.querySelector(".filter__gender input"),
    role: document.querySelector(".filter__role input"),
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
  filtered_member.forEach(appendMembers);
}

/* 필터링 초기화 */

reset_btn.addEventListener("click", resetFilter);

function resetFilter() {
  const all_input = document.querySelectorAll("input");

  all_input.forEach((input) => {
    input.value = ""; // 각 input의 값을 빈 문자열로 설정
  });

  tbody.innerHTML = "";
  members.forEach(appendMembers);
}
