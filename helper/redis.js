const redis = require("../config/redis");

exports.getCache = async (key) => {
  const redisClient = await redis();
  try {
    let dataString = await redisClient.get(key);
    if (dataString) {
      data = JSON.parse(dataString);
      return data;
    }
  } finally {
    await redisClient.disconnect();
  }
};

exports.setCache = async (key, value, expiration) => {
  const redisClient = await redis();
  try {
    const payload = JSON.stringify(value);
    await redisClient.set(key, payload, {
      EX: expiration,
    });
  } finally {
    await redisClient.disconnect();
  }
};

exports.deleteCache = async (key) => {
  const redisClient = await redis();
  try {
    await redisClient.del(key);
  } finally {
    await redisClient.disconnect();
  }
};
