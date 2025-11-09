import { tbody } from "./dom.js";
import { syncCheckbox } from "./checkbox.js";

const table_key = [
  "name",
  "englishName",
  "github",
  "gender",
  "role",
  "codeReviewGroup",
  "age",
];

export function renderMembers(member) {
  const tr = document.createElement("tr");
  tr.classList.add("table_row");

  const checkbox = document.createElement("td");
  checkbox.innerHTML = `<input type="checkbox" id="${member.id}">`;
  tr.appendChild(checkbox);

  table_key.forEach((key) => {
    const td = document.createElement("td");
    if (key === "github") {
      /* 깃허브만 a태그 추가해서 링크 넣기 */
      const a = document.createElement("a");
      a.href = `https://github.com/${member[key]}`;
      a.textContent = member[key];
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      td.appendChild(a);
    } else {
      td.textContent = member[key]; /* 깃허브 제외 나머지는 값만 넣기 */
    }

    tr.appendChild(td);
  });

  tbody.appendChild(tr);
  syncCheckbox();
}
