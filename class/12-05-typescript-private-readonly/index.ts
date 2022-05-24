// 1. public
class Aaa {
  constructor(public mypower) {
    // this.mypower = mypower; // public, private, readonly 중 1개만 포함되면 자동으로 셋팅됨
  }

  ggg() {
    console.log(this.mypower);
  }
}
const aaa = new Aaa(50);
aaa.mypower = 5; // 밖에서도 가능 -> public으로 지정했기 때문에

//
//
// 2. private
class Bbb {
  constructor(private mypower) {
    // this.mypower = mypower; // public, private, readonly 중 1개만 포함되면 자동으로 셋팅됨
  }

  ggg() {
    console.log(this.mypower);
  }
}
const bbb = new Bbb(50);
bbb.mypower = 5; // 밖에서 불가능 -> private으로 지정했기 때문에

//
//
// 3. readonly
class Ccc {
  constructor(readonly mypower) {
    // this.mypower = mypower; // public, private, readonly 중 1개만 포함되면 자동으로 셋팅됨
  }

  ggg() {
    console.log(this.mypower);
    this.mypower = 10; // 안에서도 불가능 -> readonly로 지정했기 때문에
  }
}
