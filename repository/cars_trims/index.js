const crypto = require("crypto");
const path = require("path");
const { Cars_Trims: cars_trims, Fleets: fleets } = require("../../models");
const { uploader } = require("../../helper/cloudinary");
const { getCache, setCache, deleteCache } = require("../../helper/redis");
const exp = require("constants");

exports.getCars_Trims = async () => {
  const data = await cars_trims.findAll({
    include: {
      model: fleets,
    },
  });

  return data;
};

exports.getCars_Trim = async (id) => {
  const key = `cars_trims:${id}`;
  let data = await getCache(key);

  if (data) {
    return data;
  } else {
    // data is not in db, then get data from db
    data = await cars_trims.findAll({
      where: {
        id,
      },
      include: {
        model: fleets,
      },
    });

    if (data.length > 0) {
      await setCache(key, data[0], 300);
      return data[0];
    } else {
      throw new Error(`Cars Trim is not found!`);
    }
  }
};

exports.setCars_Trim = async (payload) => {
  if (payload.image) {
    const { image } = payload;
    image.publicId = crypto.randomBytes(16).toString("hex");
    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    const imageUpload = await uploader(image);
    payload.image = imageUpload.secure_url;
  }

  const data = await cars_trims.create(payload);

  const key = `cars_trims:${data.id}`;
  await setCache(key, data, 300);

  return data;
};

exports.putCars_Trim = async (id, payload) => {
  const key = `cars_trims:${id}`;

  if (payload.image) {
    const { image } = payload;
    image.publicId = crypto.randomBytes(16).toString("hex");
    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    const imageUpload = await uploader(image);
    payload.image = imageUpload.secure_url;
  }

  // update data in db
  await cars_trims.update(payload, {
    where: {
      id,
    },
  });

  // get data from db in order to update the cache
  const data = await cars_trims.findAll({
    where: {
      id,
    },
    include: {
      model: fleets,
    },
  });

  if (data.length > 0) {
    await setCache(key, data, 300);

    return data[0];
  } else {
    throw new Error(`Cars Trim is not found!`);
  }
};

exports.deleteCars_Trim = async (id, deleter_id) => {
  const key = `cars_trims:${id}`;

  await cars_trims.update({ deletedBy: deleter_id }, { where: { id } });
  await cars_trims.destroy({ where: { id } });
  await deleteCache(key);

  return null;
};
