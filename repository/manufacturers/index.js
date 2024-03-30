const crypto = require("crypto");
const path = require("path");
const {
  manufacturers,
  base_cars,
  cars_trims,
  fleets,
} = require("../../models");
const { uploader } = require("../../helper/cloudinary");
const { getCache, setCache, deleteCache } = require("../../helper/redis");
const exp = require("constants");

exports.getManufacturers = async () => {
  const data = await manufacturers.findAll({
    include: {
      model: base_cars,
      include: {
        model: cars_trims,
        include: {
          model: fleets,
        },
      },
    },
  });

  return data;
};

exports.getManufacturer = async (id) => {
  const key = `manufacturers:${id}`;
  let data = await getCache(key);

  if (data) {
    return data;
  } else {
    // data is not in db, then get data from db
    data = await manufacturers.findAll({
      where: {
        id,
      },
      include: {
        model: base_cars,
        include: {
          model: cars_trims,
          include: {
            model: fleets,
          },
        },
      },
    });

    if (data.length > 0) {
      await setCache(key, data[0], 300);
      return data[0];
    } else {
      throw new Error(`Manufacturer is not found!`);
    }
  }
};

exports.setManufacturer = async (payload) => {
  const data = await manufacturers.create(payload);

  const key = `manufacturers:${data.id}`;
  await setCache(key, data, 300);

  return data;
};

exports.putManufacturer = async (id, payload) => {
  const key = `manufacturers:${id}`;

  // update data in db
  await manufacturers.update(payload, {
    where: {
      id,
    },
  });

  // get data from db in order to update the cache
  const data = await manufacturers.findAll({
    where: {
      id,
    },
    include: {
      model: base_cars,
      include: {
        model: cars_trims,
        include: {
          model: fleets,
        },
      },
    },
  });

  if (data.length > 0) {
    await setCache(key, data[0], 300);

    return data[0];
  } else {
    throw new Error(`Manufacturer is not found!`);
  }
};

exports.deleteManufacturer = async (id) => {
  const key = `manufacturers:${id}`;

  await manufacturers.destroy({ where: { id } });
  await deleteCache(key);

  return null;
};
