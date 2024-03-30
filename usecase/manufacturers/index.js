const manufacturersRepo = require("../../repositories/manufacturers");

exports.getManufacturers = async () => {
  const data = await manufacturersRepo.getManufacturers();
  return data;
};

exports.getManufacturer = async (id) => {
  const data = await manufacturersRepo.getManufacturer(id);
  return data;
};

exports.setManufacturer = async (payload) => {
  const data = await manufacturersRepo.setManufacturer(payload);
  return data;
};

exports.putManufacturer = async (id, payload) => {
  await manufacturersRepo.putManufacturer(id, payload);
  const data = await manufacturersRepo.getManufacturer(id);
  return data;
};

exports.deleteManufacturer = async (id) => {
  const data = await manufacturersRepo.deleteManufacturer(id);
  return data;
};
