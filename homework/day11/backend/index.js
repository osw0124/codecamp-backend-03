import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { options } from "./swagger/config.js";
import { UserController } from "./mvc/controllers/users.controller.js";
import { StarbucksController } from "./mvc/controllers/starbucks.controller.js";
import { TokenController } from "./mvc/controllers/token.controller.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

//회원 관리 API
const userController = new UserController();
app.post("/user", userController.signUp);
app.get("/users", userController.findUsers);

//토큰 인증 API
const tokenController = new TokenController();
app.post("/tokens/phone", tokenController.startTokenAuth);
app.patch("/tokens/phone", tokenController.finishTokenAuth);

//스타벅스 커피 목록 조회
const starbucksController = new StarbucksController();
app.get("/starbucks", starbucksController.findMenus);

// mongoose.connect("mongodb://my-database:27017/miniProject");
mongoose.connect("mongodb://localhost:27017/miniProject");
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
