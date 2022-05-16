// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  const PhoneNumber01 = document.getElementById("PhoneNumber01").value;
  const PhoneNumber02 = document.getElementById("PhoneNumber02").value;
  const PhoneNumber03 = document.getElementById("PhoneNumber03").value;

  const phoneNumber = PhoneNumber01 + PhoneNumber02 + PhoneNumber03;

  axios
    .post("http://localhost:3000/tokens/phone", {
      phoneNumber: phoneNumber,
    })
    .then((res) => {
      console.log(res.data);
    });
};

// 회원 가입 API 요청
const submitSignup = async () => {
  const PhoneNumber01 = document.getElementById("PhoneNumber01").value;
  const PhoneNumber02 = document.getElementById("PhoneNumber02").value;
  const PhoneNumber03 = document.getElementById("PhoneNumber03").value;

  const name = document.getElementById("SignupName").value;
  const citizenNumber = document.getElementById("SignupPersonal").value;
  const phonenumber = PhoneNumber01 + PhoneNumber02 + PhoneNumber03;
  const favoriteSite = document.getElementById("SignupPrefer").value;
  const password = document.getElementsByName("SignupPwd").value;
  const email = document.getElementById("SignupEmail").value;

  axios
    .post("http://localhost:3000/users", {
      myuser: {
        name: name,
        citizenNumber: citizenNumber,
        phonenumber: phonenumber,
        favoriteSite: favoriteSite,
        password: password,
        email: email,
      },
    })
    .then((res) => {
      console.log(res.data);
    });

  console.log("회원 가입 이메일 전송");
};
