const cars_trimsRepo = require("../../repository/cars_trims");

exports.getCars_Trims = async () => {
  const data = await cars_trimsRepo.getCars_Trims();
  return data;
};

exports.getCars_Trim = async (id) => {
  const data = await cars_trimsRepo.getCars_Trim(id);
  return data;
};

exports.setCars_Trim = async (payload) => {
  const data = await cars_trimsRepo.setCars_Trim(payload);
  return data;
};

exports.putCars_Trim = async (id, payload) => {
  await cars_trimsRepo.putCars_Trim(id, payload);
  const data = await cars_trimsRepo.getCars_Trim(id);
  return data;
};

exports.deleteCars_Trim = async (id, deleter_id) => {
  const data = await cars_trimsRepo.deleteCars_Trim(id, deleter_id);
  return data;
};
