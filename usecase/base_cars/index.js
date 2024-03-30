const base_carsRepo = require("../../repository/base_cars");

exports.getBaseCars = async () => {
  const data = await base_carsRepo.getBaseCars();
  return data;
};

exports.getBaseCar = async (id) => {
  const data = await base_carsRepo.getBaseCar(id);
  return data;
};

exports.setBaseCar = async (payload) => {
  const data = await base_carsRepo.setBaseCar(payload);
  return data;
};

exports.putBaseCar = async (id, payload) => {
  await base_carsRepo.putBaseCar(id, payload);
  const data = await base_carsRepo.getBaseCar(id);
  return data;
};

exports.deleteBaseCar = async (id) => {
  const data = await base_carsRepo.deleteBaseCar(id);
  return data;
};
