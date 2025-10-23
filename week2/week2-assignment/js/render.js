import { tbody } from "./dom.js";

export function renderMembers(member) {
  const tr = document.createElement("tr");
  const table_key = [
    "name",
    "englishName",
    "github",
    "gender",
    "role",
    "codeReviewGroup",
    "age",
  ];

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
