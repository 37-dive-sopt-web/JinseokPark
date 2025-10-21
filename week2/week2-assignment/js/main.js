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
