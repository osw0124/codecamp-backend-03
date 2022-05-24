import Menu from "../mvc/models/MenuShema.js";

export class StarbucksService {
  getFromDB = async () => {
    return await Menu.find();
  };
}
