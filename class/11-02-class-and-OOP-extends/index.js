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

mymonster01.attack();
mymonster01.run();
