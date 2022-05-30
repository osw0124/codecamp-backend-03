import { Injectable } from '@nestjs/common';

@Injectable()
export class StarbucksService {
  createMenu = () => {
    return '등록에 성공했습니다';
  };

  fetchMenu = () => {
    const menu = [
      {
        menu: '아메리카노',
        price: 100,
        kcal: 10,
        saturated_fat: 10,
        protein: 10,
        salt: 10,
        sugar: 10,
        caffeine: 10,
      },
      {
        menu: '라떼',
        price: 100,
        kcal: 10,
        saturated_fat: 10,
        protein: 10,
        salt: 10,
        sugar: 10,
        caffeine: 10,
      },
      {
        menu: '모카',
        price: 100,
        kcal: 10,
        saturated_fat: 10,
        protein: 10,
        salt: 10,
        sugar: 10,
        caffeine: 10,
      },
      {
        menu: '우유',
        price: 100,
        kcal: 10,
        saturated_fat: 10,
        protein: 10,
        salt: 10,
        sugar: 10,
        caffeine: 10,
      },
      {
        menu: '차',
        price: 100,
        kcal: 10,
        saturated_fat: 10,
        protein: 10,
        salt: 10,
        sugar: 10,
        caffeine: 10,
      },
    ];
    return menu;
  };
}
