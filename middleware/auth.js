const { getTokenFromHeaders, extractToken } = require("../helper/auth");
const { profile } = require("../usecase/auth/index");

exports.authMiddleware = (roles) => async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req?.headers);
    const extractedToken = extractToken(token);

    const user = await profile(extractedToken?.id);
    if (!roles.includes(user?.role)) {
      return next({
        message: "Forbidden!",
        statusCode: 403,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};
