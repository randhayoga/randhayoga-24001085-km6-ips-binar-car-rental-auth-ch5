const { createClient } = require("redis");

const client = async () => {
  const connection = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  await connection.connect();
  return connection;
};

module.exports = client;
