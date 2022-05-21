let tokenAuth = false;

// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  const PhoneNumber01 = document.getElementById("PhoneNumber01").value;
  const PhoneNumber02 = document.getElementById("PhoneNumber02").value;
  const PhoneNumber03 = document.getElementById("PhoneNumber03").value;
  const phoneNumber = PhoneNumber01 + PhoneNumber02 + PhoneNumber03;
  console.log("인증 번호 전송");
  await axios
    .post("http://localhost:3000/tokens/phone", {
      phone: phoneNumber,
    })
    .then((res) => {
      console.log(res.data);
    });
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  const PhoneNumber01 = document.getElementById("PhoneNumber01").value;
  const PhoneNumber02 = document.getElementById("PhoneNumber02").value;
  const PhoneNumber03 = document.getElementById("PhoneNumber03").value;
  const phoneNumber = PhoneNumber01 + PhoneNumber02 + PhoneNumber03;

  const token = document.getElementById("TokenInput").value;
  alert("인증 완료");
  await axios
    .patch("http://localhost:3000/tokens/phone", {
      phone: phoneNumber,
      token: token,
    })
    .then((res) => {
      tokenAuth = res.data;
    });
};

// 회원 가입 API 요청
const submitSignup = async () => {
  const personal01 = document.getElementById("SignupPersonal1").value;
  const personal02 = document.getElementById("SignupPersonal2").value;
  const PhoneNumber01 = document.getElementById("PhoneNumber01").value;
  const PhoneNumber02 = document.getElementById("PhoneNumber02").value;
  const PhoneNumber03 = document.getElementById("PhoneNumber03").value;

  const name = document.getElementById("SignupName").value;
  const personal = personal01 + "-" + personal02;
  console.log(personal);
  const phone = PhoneNumber01 + PhoneNumber02 + PhoneNumber03;
  const prefer = document.getElementById("SignupPrefer").value;
  const email = document.getElementById("SignupEmail").value;
  const pwd = document.getElementById("SignupPwd").value;

  if (tokenAuth) {
    const userInfo = {
      name: name,
      email: email,
      personal: personal,
      prefer: prefer,
      pwd: pwd,
      phone: phone,
    };

    await axios
      .post("http://localhost:3000/user", {
        userInfo,
      })
      .then((res) => {
        console.log(res.data);
      });
    alert("회원 가입 완료");
  } else {
    alert("인증을 완료해주세요");
  }
};
