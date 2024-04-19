const manufacturersRepo = require("../../repository/manufacturers");

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

exports.deleteManufacturer = async (id, deleter_id) => {
  const data = await manufacturersRepo.deleteManufacturer(id, deleter_id);
  return data;
};
