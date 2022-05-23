class Monster {
  power = 10;

  constructor(inputV) {
    this.power = inputV;
  }
  attack = () => {
    console.log("공격하자!!!!");
    console.log(`내 공격력은 ${this.power}야!!`);
  };

  run = () => {
    console.log("도망가자!!!!");
  };
}

const mymonster01 = new Monster(10);
mymonster01.attack();
mymonster01.run();

const mymonster02 = new Monster(50);
mymonster02.attack();
mymonster02.run();
console.log(mymonster02.power);
