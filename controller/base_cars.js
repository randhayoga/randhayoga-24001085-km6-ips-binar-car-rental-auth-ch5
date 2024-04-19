const base_carsUseCase = require("../usecase/base_cars");

exports.getBaseCars = async (req, res, next) => {
  try {
    const data = await base_carsUseCase.getBaseCars();

    res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBaseCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await base_carsUseCase.getBaseCar(id);

    if (!data) {
      return next({
        message: `Base Car with id ${id} not found!`,
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

exports.setBaseCar = async (req, res, next) => {
  try {
    const { manufacturer_id, model, type } = req.body;
    const createdBy = req.user.id;

    if (!manufacturer_id || manufacturer_id === "") {
      return next({
        message: "Manufacturer ID is required!",
        statusCode: 400,
      });
    }
    if (!model || model === "") {
      return next({
        message: "Model is required!",
        statusCode: 400,
      });
    }
    if (!type || type === "") {
      return next({
        message: "Type is required!",
        statusCode: 400,
      });
    }

    const data = await base_carsUseCase.setBaseCar({
      manufacturer_id,
      model,
      type,
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

exports.putBaseCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { model, type } = req.body;
    const updatedBy = req.user.id;

    if (!model || model === "") {
      return next({
        message: "Model is required!",
        statusCode: 400,
      });
    }
    if (!type || type === "") {
      return next({
        message: "Type is required!",
        statusCode: 400,
      });
    }

    const data = await base_carsUseCase.putBaseCar(id, {
      model,
      type,
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

exports.deleteBaseCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBy = req.user.id;

    const data = await base_carsUseCase.deleteBaseCar(id, deletedBy);

    res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
