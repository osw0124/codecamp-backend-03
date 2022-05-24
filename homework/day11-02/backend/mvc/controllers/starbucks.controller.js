import { StarbucksService } from "../../services/starbucks.service.js";

export class StarbucksController {
  findMenus = async (req, res) => {
    const starbucksService = new StarbucksService();
    const MenuList = starbucksService.getFromDB();

    res.status(200).send(MenuList);
  };
}
