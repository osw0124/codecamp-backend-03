# 클래스

- 클래스를 생성하고 생성한 클래스를 이용해서 새로운 객체를 만들면 클래스의 정보를 상속한다.
- 객체는 인스턴스라고도 한다.
- constructor로 새로 생선되는 객체의 초기값을 설정할 수 있다.

  ```javascript
  class Monster {
    power = 10;
    attack = () => {
      console.log("공격하자!!!!");
    };

    run = () => {
      console.log("도망가자!!!!");
    };
  }

  const mymonster01 = new Monster();
  mymonster01.attack(); //공격하자!!!!
  mymonster01.run(); //도망가자!!!!

  const mymonster02 = new Monster();
  mymonster02.attack(); //공격하자!!!!
  mymonster02.run(); //도망가자!!!!
  console.log(mymonster02.power); //10
  ```
