import { select_all, tbody } from "./dom.js";

export function selectAllCheckbox() {
  /* 전체 선택 체크박스의 체크 여부에 따라 아래 박스들도 일괄적으로 바뀌도록 설정 */
  select_all.addEventListener("change", (event) => {
    const check = event.target.checked;
    const allCheckbox = tbody.querySelectorAll("input[type='checkbox']");

    allCheckbox.forEach((box) => {
      box.checked = check;
    });
  });

  /* thead 제외하고 tbody의 체크박스 체크 개수에 따라 전체 체크박스 상태 결정 */
  tbody.addEventListener("change", (event) => {
    if (event.target.type !== "checkbox") return;

    const totalCount = tbody.querySelectorAll("input[type='checkbox']").length;
    const checkedCount = tbody.querySelectorAll(
      "input[type='checkbox']:checked"
    ).length;

    if (checkedCount === 0) {
      select_all.checked = false;
      select_all.indeterminate = false;
    } else if (checkedCount === totalCount) {
      select_all.checked = true;
      select_all.indeterminate = false;
    } else {
      /* 전체 중 일부만 체크되어 있는 경우 -> 전체 체크박스를 indeterminate 상태로 설정 */
      select_all.checked = false;
      select_all.indeterminate = true;
    }
  });
}
