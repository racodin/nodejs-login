"use strict";

const id = document.querySelector("#id");
const name = document.querySelector("#name");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#password-confirm");
const registerButton = document.querySelector("#register-button");

registerButton.addEventListener("click", register);

function register(e) {
  e.preventDefault();

  if (!id.value) return alert("아이디를 입력해주세요.");
  if (!password.value) return alert("비밀번호를 입력해주세요.");
  if (!confirmPassword.value) return alert("비밀번호 확인을 입력해주세요.");
  if (password.value !== confirmPassword.value)
    return alert("비밀번호가 일치하지 않습니다.");

  const req = {
    id: id.value,
    name: name.value,
    password: password.value,
  };

  // console.log(req, JSON.stringify(req));
  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/login";
      } else {
        console.log(res.msg);
      }
    })
    .catch((err) => {
      console.error("회원가입 중 에러 발생");
    });
}
