import { ApolloServer, gql } from "apollo-server";
import { createTokenOfPhone } from "../01-05-token-count-api-facade-import/index.js";

// The GraphQL schema
const typeDefs = gql`
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }
  type BoardsReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }
  type Token {
    token: String
    msg: String
  }
  type Query {
    # fetchBoards: BoardsReturn => 객체 1개 의미
    fetchBoards: [BoardsReturn] # 객체 1개 이상 의미
  }

  type Mutation {
    #createBoard(writer: String, title: String, contents: String): String
    createBoard(createBoardInput: CreateBoardInput!): String
    createTokenOfPhone(myphone: String!): Token
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    fetchBoards: () => {
      const result = [
        { number: 1, writer: "철수", title: "제목입니다~", contents: "내용이에요!!" },
        { number: 2, writer: "로직", title: "제목입니다~", contents: "내용이에요!!" },
        { number: 3, writer: "흰둥이", title: "제목입니다~", contents: "내용이에요!!" },
      ];

      return result;
    },
  },

  Mutation: {
    createBoard: (_, args) => {
      console.log(args);
      //parent: 백엔드에서 백엔드로 요청을 보냈을 때 백엔드의  요청은 args가 아니라 parent에 들어온다
      //args:req.body
      //context: req.header
      return "게시물 등록에 성공하였습니다.";
    },

    createTokenOfPhone: (_, args) => {
      const myphone = args.myphone;
      const token = createTokenOfPhone(myphone);

      return {
        token: token,
        msg: "토큰을 받아주세요",
      };
    },
  },
};

//아폴로 서버 사용 등록
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
