import Model from "../models/model.js";

class CarModel extends Model {
  async getAllCars() {
    const query = 'SELECT * FROM cars ORDER BY id ASC';
    return await this.fetchAll(query);
  }
}

export default new CarModel();