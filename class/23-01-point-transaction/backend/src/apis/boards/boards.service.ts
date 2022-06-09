import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  // aaa() {
  //   return 'Hello World!';
  // }

  findAll() {
    // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
    const result = [
      {
        number: 1,
        writer: '철수',
        title: '제목입니다~',
        contents: '내용이에요!!',
      },
      {
        number: 2,
        writer: '로직',
        title: '제목입니다~',
        contents: '내용이에요!!',
      },
      {
        number: 3,
        writer: '흰둥이',
        title: '제목입니다~',
        contents: '내용이에요!!',
      },
    ];

    // 2. 꺼내온 결과 응답
    return result;
  }

  create() {
    // 1. 데이터를 등록하는 로직
    // 2. 저장 결과 응답 주기
    //parent: 백엔드에서 백엔드로 요청을 보냈을 때 백엔드의  요청은 args가 아니라 parent에 들어온다
    //args:req.body
    //context: req.header
    return '게시물 등록에 성공하였습니다.';
  }
}
