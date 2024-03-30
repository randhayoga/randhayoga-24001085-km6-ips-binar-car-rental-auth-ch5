const base_carsRepo = require("../../repository/base_cars");

exports.getBaseCars = async () => {
  const data = await base_carsRepo.getBase_Cars();
  return data;
};

exports.getBaseCar = async (id) => {
  const data = await base_carsRepo.getBase_Car(id);
  return data;
};

exports.setBaseCar = async (payload) => {
  const data = await base_carsRepo.setBase_Car(payload);
  return data;
};

exports.putBaseCar = async (id, payload) => {
  await base_carsRepo.putBase_Car(id, payload);
  const data = await base_carsRepo.getBase_Car(id);
  return data;
};

exports.deleteBaseCar = async (id) => {
  const data = await base_carsRepo.deleteBase_Car(id);
  return data;
};
