import { select_all, tbody } from "./dom.js";

export function syncCheckbox() {
  if (!tbody || !select_all) return;

  const checkboxes = tbody.querySelectorAll("input[type='checkbox']");
  const totalCount = checkboxes.length;
  const checkedCount = Array.from(checkboxes).filter((cb) => cb.checked).length;

  if (totalCount === 0) {
    select_all.checked = false;
    select_all.indeterminate = false;
  } else if (checkedCount === 0) {
    select_all.checked = false;
    select_all.indeterminate = false;
  } else if (checkedCount === totalCount) {
    select_all.checked = true;
    select_all.indeterminate = false;
  } else {
    select_all.checked = false;
    select_all.indeterminate = true;
  }
}

export function selectAllCheckbox() {
  select_all.addEventListener("change", (event) => {
    const check = event.target.checked;
    const allCheckbox = tbody.querySelectorAll("input[type='checkbox']");

    allCheckbox.forEach((box) => {
      box.checked = check;
    });
  });

  tbody.addEventListener("change", (event) => {
    if (event.target.type === "checkbox") {
      syncCheckbox();
    }
  });
}
