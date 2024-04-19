const crypto = require("crypto");
const path = require("path");
const bcrypt = require("bcrypt");
const { user } = require("../../models");
const { uploader } = require("../../helper/cloudinary");
const { getCache, setCache, deleteCache } = require("../../helper/redis");

exports.getUserByID = async (id) => {
  const key = `user:${id}`;
  let data = await getCache(key);

  if (data) {
    return data;
  } else {
    // data is not in cache, then get data from db
    data = await user.findAll({
      where: {
        id,
      },
    });

    if (data.length > 0) {
      await setCache(key, data[0], 300);
      return data[0];
    } else {
      throw new Error(`User is not found!`);
    }
  }
};

exports.getUserByEmail = async (email) => {
  const key = `user:${email}`;
  let data = await getCache(key);

  if (data) {
    return data;
  } else {
    // data is not in cache, then get data from db
    data = await user.findAll({
      where: {
        email,
      },
    });

    if (data.length > 0) {
      await setCache(key, data[0], 300);
      return data[0];
    } else {
      throw new Error(`User is not found!`);
    }
  }
};

exports.setUser = async (payload) => {
  payload.password = bcrypt.hashSync(payload.password, 10);

  if (payload.photo) {
    const { photo } = payload;
    photo.publicId = crypto.randomBytes(16).toString("hex");
    photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

    const imageUpload = await uploader(photo);
    payload.photo = imageUpload.secure_url;
  }

  // save to db
  const data = await user.create(payload);

  // save to redis (email and id)
  const keyID = `user:${data.id}`;
  const keyEmail = `user:${data.email}`;
  await setCache(keyID, data, 300);
  await setCache(keyEmail, data, 300);

  return data;
};
