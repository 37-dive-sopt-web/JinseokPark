import { memberData } from "./data.js";
import { renderMembers } from "./render.js";
import { filterMember, resetFilter } from "./filter.js";
import { deleteMember } from "./delete.js";
import { selectAllCheckbox } from "./checkbox.js";
import { DATA_KEY, submit_btn, reset_btn, delete_btn } from "./dom.js";
import "./modal.js";

/* 초기 데이터 렌더링 */

if (!localStorage.getItem(DATA_KEY)) {
  localStorage.setItem(DATA_KEY, JSON.stringify(memberData));
}
const savedData = localStorage.getItem(DATA_KEY);
JSON.parse(savedData).forEach(renderMembers);

/* 필터링 기능 & 필터링 초기화 & 선택 삭제 이벤트 리스너 */

submit_btn.addEventListener("click", filterMember);
reset_btn.addEventListener("click", resetFilter);
delete_btn.addEventListener("click", deleteMember);

/* 전체 선택 체크박스 관리 */
selectAllCheckbox();
