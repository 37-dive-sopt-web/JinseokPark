/* 선택 삭제 기능 구현 */

import { renderMembers } from "./render.js";
import { tbody, DATA_KEY, getMembers } from "./dom.js";

export function deleteMember() {
  const checked_box = tbody.querySelectorAll("input[type='checkbox']:checked");
  const members = getMembers();

  const deleteID = Array.from(checked_box).map((box) => {
    return Number(box.id);
  });

  const edit_members = members.filter((member) => {
    return !deleteID.includes(member.id);
  });

  localStorage.setItem(DATA_KEY, JSON.stringify(edit_members));
  tbody.innerHTML = "";
  edit_members.forEach(renderMembers);
}
