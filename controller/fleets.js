const fleetsUseCase = require("../usecase/fleets");

exports.getFleets = async (req, res, next) => {
  try {
    const data = await fleetsUseCase.getFleets();

    res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getFleet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await fleetsUseCase.getFleet(id);

    if (!data) {
      return next({
        message: `Fleet with id ${id} not found!`,
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

exports.getAvailableFleets = async (req, res, next) => {
  try {
    const data = await fleetsUseCase.getAvailableFleets();

    res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.setFleet = async (req, res, next) => {
  try {
    const { car_trims_id, plate, availableAt, available, description } =
      req.body;
    const createdBy = req.user.id;

    if (!car_trims_id || car_trims_id === "") {
      return next({
        message: "Car trims id is required!",
        statusCode: 400,
      });
    }
    if (!plate || plate === "") {
      return next({
        message: "Plate is required!",
        statusCode: 400,
      });
    }
    if (!availableAt || availableAt === "") {
      return next({
        message: "Available at is required!",
        statusCode: 400,
      });
    }
    if (!available || available === "") {
      return next({
        message: "Available is required!",
        statusCode: 400,
      });
    }
    if (!description || description === "") {
      return next({
        message: "Description is required!",
        statusCode: 400,
      });
    }

    const data = await fleetsUseCase.setFleet({
      car_trims_id,
      plate,
      availableAt,
      available,
      description,
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

exports.putFleet = async (req, res, next) => {
  try {
    const { plate, availableAt, available, description } = req.body;
    const updatedBy = req.user.id;

    if (!plate || plate === "") {
      return next({
        message: "Plate is required!",
        statusCode: 400,
      });
    }
    if (!availableAt || availableAt === "") {
      return next({
        message: "Available at is required!",
        statusCode: 400,
      });
    }
    if (!available || available === "") {
      return next({
        message: "Available is required!",
        statusCode: 400,
      });
    }
    if (!description || description === "") {
      return next({
        message: "Description is required!",
        statusCode: 400,
      });
    }

    const data = await fleetsUseCase.putFleet(id, {
      plate,
      availableAt,
      available,
      description,
      updatedBy,
    });

    res.status(201).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteFleet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBy = req.user.id;

    const data = await fleetsUseCase.deleteFleet(id, deletedBy);

    res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
