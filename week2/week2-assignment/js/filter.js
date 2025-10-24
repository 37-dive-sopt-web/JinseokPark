/* 필터링 기능 구현 */

import { renderMembers } from "./render.js";
import {
  tbody,
  all_input,
  all_select,
  filter_input,
  getMembers,
} from "./dom.js";

export function filterMember() {
  const members = getMembers();

  /* filter_input 중에 비어있지 않은 요소의 key만 active_filter에 담음 */
  const active_filter = [];
  for (const key of Object.keys(filter_input)) {
    if (filter_input[key].value !== "") active_filter.push(key);
  }

  /* 이전에 담은 active_filter 배열 기준으로 필터링한 멤버 배열 새로 만들기 */
  const filtered_member = members.filter((member) => {
    return active_filter.every((key) => {
      /* active_filter 배열에 담긴 모든 조건을 만족하게 하도록 every 사용 */
      return String(member[key]).includes(filter_input[key].value);
    });
  });

  if (filtered_member.length === 0) {
    tbody.innerHTML = "";
    tbody.innerHTML = `
    <tr>
      <td colspan="8" class="filter__no-results">
        검색 결과가 없습니다
      </td>
    </tr>
  `;
  } else {
    tbody.innerHTML = "";
    filtered_member.forEach(renderMembers);
  }
}

/* 필터링 초기화 - 필터 인풋 다 비우고, localStorage 데이터 렌더링 */

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
