const {
  Base_Cars: base_cars,
  Manufacturers: manufacturers,
  Users: users,
} = require("../../models");
const { getCache, setCache, deleteCache } = require("../../helper/redis");
const exp = require("constants");

exports.getBase_Cars = async () => {
  const data = await base_cars.findAll({
    include: {
      model: manufacturers,
    },
  });

  return data;
};

exports.getBase_Car = async (id) => {
  const key = `base_cars:${id}`;
  let data = await getCache(key);

  if (data) {
    return data;
  } else {
    // data is not in cache, then get data from db
    data = await base_cars.findAll({
      where: {
        id,
      },
      include: {
        model: manufacturers,
      },
    });

    if (data.length > 0) {
      await setCache(key, data[0], 300);
      return data[0];
    } else {
      throw new Error(`Base Car is not found!`);
    }
  }
};

exports.setBase_Car = async (payload) => {
  const data = await base_cars.create(payload);

  const key = `base_cars:${data.id}`;
  await setCache(key, data, 300);

  return data;
};

exports.putBase_Car = async (id, payload) => {
  const key = `base_cars:${id}`;

  // update data in db
  await base_cars.update(payload, {
    where: {
      id,
    },
  });

  // get data from db in order to update the cache
  const data = await base_cars.findAll({
    where: {
      id,
    },
    include: {
      model: manufacturers,
    },
  });

  if (data.length > 0) {
    await setCache(key, data[0], 300);

    return data[0];
  } else {
    throw new Error(`Base Car is not found!`);
  }
};

exports.deleteBase_Car = async (id, deletedBy) => {
  const key = `base_cars:${id}`;

  await base_cars.update({ deletedBy }, { where: { id } });
  await base_cars.destroy({ where: { id } });
  await deleteCache(key);

  return null;
};
