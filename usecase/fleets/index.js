const fleetsRepo = require("../../repository/fleets");

exports.getFleets = async () => {
  const data = await fleetsRepo.getFleets();
  return data;
};

exports.getFleet = async (id) => {
  const data = await fleetsRepo.getFleet(id);
  return data;
};

exports.getAvailableFleets = async () => {
  const data = await fleetsRepo.getAvailableFleets();
  return data;
};

exports.setFleet = async (payload) => {
  const data = await fleetsRepo.setFleet(payload);
  return data;
};

exports.putFleet = async (id, payload) => {
  await fleetsRepo.putFleet(id, payload);
  const data = await fleetsRepo.getFleet(id);
  return data;
};

exports.deleteFleet = async (id, deletedBy) => {
  const data = await fleetsRepo.deleteFleet(id, deletedBy);
  return data;
};
