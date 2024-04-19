const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  createUser,
  getUserByEmail,
  getUserByID,
} = require("../../repository/user");

exports.register = async (payload) => {
  let user = await createUser(payload);
  delete user.dataValues.password;

  const jwtPayload = {
    id: user.id,
  };

  const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const data = {
    user,
    token,
  };

  return data;
};

exports.login = async (email, password) => {
  let user = await getUserByEmail(email);
  if (!user) {
    throw new Error(`User is not found!`);
  }

  const isValid = await bcrypt.compare(password, user?.password);
  if (!isValid) {
    throw new Error(`Wrong password!`);
  }

  if (user?.dataValues?.password) {
    delete user?.dataValues?.password;
  } else {
    delete user?.password;
  }

  const jwtPayload = {
    id: user.id,
  };

  const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const data = {
    user,
    token,
  };

  return data;
};

exports.profile = async (id) => {
  let data = await getUserByID(id);
  if (!data) {
    throw new Error(`User is not found!`);
  }

  if (data?.dataValues?.password) {
    delete data?.dataValues?.password;
  } else {
    delete data?.password;
  }

  return data;
};
