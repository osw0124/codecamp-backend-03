import { Menu } from "../models/MenuShema.js";

export class StarbucksController {
  findMenus = async (req, res) => {
    const coffeeList = await Menu.find();
    res.status(200).send(coffeeList);
  };
}
