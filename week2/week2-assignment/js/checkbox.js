import { select_all, tbody } from "./dom.js";

export function selectAllCheckbox() {
  select_all.addEventListener("change", (event) => {
    const check = event.target.checked;
    const allCheckbox = tbody.querySelectorAll("input[type='checkbox']");

    allCheckbox.forEach((box) => {
      box.checked = check;
    });

    select_all.indeterminate = false;
  });

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
      select_all.checked = false;
      select_all.indeterminate = true;
    }
  });
}
