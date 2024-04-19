const {
  Manufacturers: manufacturers,
  Base_Cars: base_cars,
  Cars_Trims: cars_trims,
  Fleets: fleets,
} = require("../../models");
const { getCache, setCache, deleteCache } = require("../../helper/redis");
const exp = require("constants");

exports.getFleets = async () => {
  const data = await fleets.findAll({
    include: {
      model: cars_trims,
      include: {
        model: base_cars,
        include: {
          model: manufacturers,
        },
      },
    },
  });

  return data;
};

exports.getFleet = async (id) => {
  const key = `fleets:${id}`;
  let data = await getCache(key);

  if (data) {
    return data;
  } else {
    // data is not in cache, then get data from db
    data = await fleets.findAll({
      where: {
        id,
      },
      include: {
        model: cars_trims,
        include: {
          model: base_cars,
          include: {
            model: manufacturers,
          },
        },
      },
    });

    if (data.length > 0) {
      await setCache(key, data[0], 300);
      return data[0];
    } else {
      throw new Error(`Fleet is not found!`);
    }
  }
};

exports.getAvailableFleets = async () => {
  const data = await fleets.findAll({
    where: {
      available: true,
    },
    include: {
      model: cars_trims,
      include: {
        model: base_cars,
        include: {
          model: manufacturers,
        },
      },
    },
  });

  return data;
};

exports.setFleet = async (payload) => {
  const data = await fleets.create(payload);

  const key = `fleets:${data.id}`;
  await setCache(key, data, 300);

  return data;
};

exports.putFleet = async (id, payload) => {
  const key = `fleets:${id}`;

  // update data in db
  await fleets.update(payload, {
    where: {
      id,
    },
  });

  // get data from db in order to update the cache
  const data = await fleets.findAll({
    where: {
      id,
    },
    include: {
      model: cars_trims,
      include: {
        model: base_cars,
        include: {
          model: manufacturers,
        },
      },
    },
  });

  if (data.length > 0) {
    await setCache(key, data[0], 300);

    return data[0];
  } else {
    throw new Error(`Fleet is not found!`);
  }
};

exports.deleteFleet = async (id, deleter_id) => {
  const key = `fleets:${id}`;

  await fleets.update({ deletedBy: deleter_id }, { where: { id } });
  await fleets.destroy({ where: { id } });
  await deleteCache(key);

  return null;
};
