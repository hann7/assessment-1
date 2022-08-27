const carController = {};
const db = require('../db/carModel');

carController.decodeVin = (req, res, next) => {

  return {
    vin,
    year,
    make,
    model
  };

};

carController.getCar = (req, res, next) => {
  return next();
};

carController.addCar = (req, res, next) => {
  return next();
};

carController.updateCar = (req, res, next) => {
  return next();
};

carController.deleteCar = (req, res, next) => {
  return next();
};

module.exports = carController;
