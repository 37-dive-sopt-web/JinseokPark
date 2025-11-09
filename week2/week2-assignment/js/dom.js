/* tbody, 전체 input 및 select*/
export const tbody = document.querySelector(".member_list__table tbody");
export const all_input = document.querySelectorAll("input");
export const all_select = document.querySelectorAll("select");

/* 다양한 버튼 */
export const submit_btn = document.querySelector(".btn_submit");
export const reset_btn = document.querySelector(".btn_reset");
export const delete_btn = document.querySelector(".btn_delete");
export const select_all = document.querySelector(".btn_all");

/* 모달에서 사용하는 DOM 요소 */
export const open_modalBtn = document.querySelector(".btn_modal");
export const modal_bg = document.querySelector(".modal_bg");
export const close_modalBtn = document.querySelector(
  ".modal__form_title button"
);
export const submit_modalBtn = document.querySelector(".modal__submit button");
export const modal_allInput = document.querySelectorAll(
  ".modal__form input, .modal__form select"
);

/* 인풋 모아놓은 객체 */
export const filter_input = {
  name: document.querySelector("#name"),
  englishName: document.querySelector("#eng-name"),
  github: document.querySelector("#github"),
  gender: document.querySelector("#gender"),
  role: document.querySelector("#role"),
  codeReviewGroup: document.querySelector("#team"),
  age: document.querySelector("#age"),
};

export const member_input = {
  name: document.querySelector("#modal-name"),
  engname: document.querySelector("#modal-engname"),
  github: document.querySelector("#modal-github"),
  gender: document.querySelector("#modal-gender"),
  role: document.querySelector("#modal-role"),
  team: document.querySelector("#modal-team"),
  age: document.querySelector("#modal-age"),
};

/* DOM은 아니지만 자주 사용하는 요소 */

export const DATA_KEY = "memberData"; /* localstorage 데이터 키 변수 사용 */
export function getMembers() {
  /* 현재 localstorage에 있는 데이터 가져오기 */
  const data = localStorage.getItem(DATA_KEY);
  return JSON.parse(data);
}
