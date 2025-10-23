/* 필터링 기능 구현 */

import { renderMembers } from "./render.js";
import { tbody, all_input, all_select, getMembers } from "./dom.js";

export function filterMember() {
  const filter_input = {
    name: document.querySelector(".filter__name input"),
    englishName: document.querySelector(".filter__engname input"),
    github: document.querySelector(".filter__github input"),
    gender: document.querySelector(".filter__gender select"),
    role: document.querySelector(".filter__role select"),
    codeReviewGroup: document.querySelector(".filter__team input"),
    age: document.querySelector(".filter__age input"),
  };
  const members = getMembers();
  const active_filter = [];

  for (const key of Object.keys(filter_input)) {
    if (filter_input[key].value !== "") active_filter.push(key);
  }

  const filtered_member = members.filter((member) => {
    return active_filter.every((key) => {
      return String(member[key]).includes(filter_input[key].value);
    });
  });

  tbody.innerHTML = "";
  filtered_member.forEach(renderMembers);
}

/* 필터링 초기화 */

export function resetFilter() {
  const members = getMembers();

  all_input.forEach((input) => {
    input.value = "";
  });

  all_select.forEach((select) => {
    select.value = "";
  });

  tbody.innerHTML = "";
  members.forEach(renderMembers);
}
