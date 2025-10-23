/* 선택 삭제 기능 구현 */

import { renderMembers } from "./render.js";
import { tbody, DATA_KEY, getMembers } from "./dom.js";

export function deleteMember() {
  const checked_box = tbody.querySelectorAll("input[type='checkbox']:checked");
  const members = getMembers();

  /* 체크되어 있는 체크박스의 id 담은 배열 생성 */
  const deleteID = Array.from(checked_box).map((box) => {
    return Number(box.id);
  });

  /* 위에서 만든 배열 기준으로 필터링 */
  const edit_members = members.filter((member) => {
    return !deleteID.includes(member.id);
  });

  /* localStorage 업데이트, 바뀐 멤버 배열로 렌더링 */
  localStorage.setItem(DATA_KEY, JSON.stringify(edit_members));
  tbody.innerHTML = "";
  edit_members.forEach(renderMembers);
}
