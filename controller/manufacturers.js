const manufacturersUseCase = require("../usecase/manufacturers");

exports.getManufacturers = async (req, res, next) => {
  try {
    const data = await manufacturersUseCase.getManufacturers();

    res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getManufacturer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await manufacturersUseCase.getManufacturer(id);

    if (!data) {
      return next({
        message: `Manufacturer with id ${id} not found!`,
        statusCode: 404,
      });
    }

    res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.setManufacturer = async (req, res, next) => {
  try {
    const { name } = req.body;
    const createdBy = req.user.id;

    if (!name || name === "") {
      return next({
        message: "Name is required!",
        statusCode: 400,
      });
    }

    const data = await manufacturersUseCase.setManufacturer({
      name,
      createdBy,
    });

    res.status(201).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.putManufacturer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedBy = req.user.id;

    if (!name || name === "") {
      return next({
        message: "Name is required!",
        statusCode: 400,
      });
    }

    const data = await manufacturersUseCase.putManufacturer(id, {
      name,
      updatedBy,
    });

    res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteManufacturer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBy = req.user.id;

    const data = await manufacturersUseCase.deleteManufacturer(id, deletedBy);

    res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
