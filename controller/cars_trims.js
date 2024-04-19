const cars_trimsUseCase = require("../usecase/cars_trims");

exports.getCarsTrims = async (req, res, next) => {
  try {
    const data = await cars_trimsUseCase.getCars_Trims();

    res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCarsTrim = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await cars_trimsUseCase.getCars_Trim(id);

    if (!data) {
      return next({
        message: `Cars Trim with id ${id} not found!`,
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

exports.setCarsTrim = async (req, res, next) => {
  try {
    const {
      base_car_id,
      year,
      transmission,
      options,
      specs,
      capacity,
      rentPerDay,
    } = req.body;
    const { image } = req.files;
    const createdBy = req.user.id;

    if (!base_car_id || base_car_id === "") {
      return next({
        message: "Base Car ID is required!",
        statusCode: 400,
      });
    }
    if (!year || year === "") {
      return next({
        message: "Year is required!",
        statusCode: 400,
      });
    }
    if (!transmission || transmission === "") {
      return next({
        message: "Transmission is required!",
        statusCode: 400,
      });
    }
    if (!options || options === "") {
      return next({
        message: "Options is required!",
        statusCode: 400,
      });
    }
    if (!specs || specs === "") {
      return next({
        message: "Specs is required!",
        statusCode: 400,
      });
    }
    if (!capacity || capacity === "" || parseInt(capacity) <= 0) {
      return next({
        message: "Capacity is required!",
        statusCode: 400,
      });
    }
    if (!rentPerDay || rentPerDay === "" || parseInt(rentPerDay) < 0) {
      return next({
        message: "Rent per day is required!",
        statusCode: 400,
      });
    }

    const data = await cars_trimsUseCase.setCars_Trim({
      base_car_id,
      year,
      transmission,
      options,
      specs,
      capacity,
      rentPerDay,
      image,
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

exports.putCarsTrim = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { year, transmission, options, specs, capacity, rentPerDay } =
      req.body;
    const { image } = req.files;
    const updatedBy = req.user.id;

    if (!year || year === "") {
      return next({
        message: "Year is required!",
        statusCode: 400,
      });
    }
    if (!transmission || transmission === "") {
      return next({
        message: "Transmission is required!",
        statusCode: 400,
      });
    }
    if (!options || options === "") {
      return next({
        message: "Options is required!",
        statusCode: 400,
      });
    }
    if (!specs || specs === "") {
      return next({
        message: "Specs is required!",
        statusCode: 400,
      });
    }
    if (!capacity || capacity === "" || parseInt(capacity) <= 0) {
      return next({
        message: "Capacity is required!",
        statusCode: 400,
      });
    }
    if (!rentPerDay || rentPerDay === "" || parseInt(rentPerDay) < 0) {
      return next({
        message: "Rent per day is required!",
        statusCode: 400,
      });
    }

    const data = await cars_trimsUseCase.putCars_Trim(id, {
      year,
      transmission,
      options,
      specs,
      capacity,
      rentPerDay,
      image,
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

exports.deleteCarsTrim = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBy = req.user.id;

    const data = await cars_trimsUseCase.deleteCars_Trim(id, deletedBy);

    res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
