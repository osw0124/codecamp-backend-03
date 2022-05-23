# 클래스 extends

- extends를 사용하면 비슷한 클래스가 여러개 있을 때 부모 클래스로 부터 중복되는 속성을 상속 받을 수 있다.
- super를 이용하면 자식 클래스는 부모클래스에게 값을 전달할 수 있다.

  - ? super는 객체가 처음 만들어질 때 초기값을 설정하기 위해서만 사용하나?
  - 속성은 공유하고 값은 다르게 설정하고 싶을 때?

  ```javascript
  class Monster {
    power = 10;
    constructor(inputPower) {
      this.power = inputPower;
    }
    attack = () => {
      console.log("공격하자!!!!");
      console.log(`내 공격력은 ${this.power}야!!`);
    };
  }

  class SkyMonster extends Monster {
    constructor(inputPower) {
      super(inputPower);
    }
    run = () => {
      console.log("날아서 도망가자!!!!");
    };
  }

  class GroundMonster extends Monster {
    constructor(inputPower) {
      super(inputPower);
    }
    run = () => {
      console.log("달려서 도망가자!!!!");
    };
  }

  const mymonster01 = new SkyMonster(10);
  mymonster01.attack();
  mymonster01.run();

  const mymonster02 = new GroundMonster(30);
  mymonster02.attack();
  mymonster02.run();
  ```
