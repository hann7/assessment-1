const express = require('express');
const carController = require('../controllers/carController');
const router = express.Router();

/**
 * **********************************************
 *     routes for database CRUD operations      *
 * **********************************************
 */

router.get('/:vin', carController.getCar, (req, res) => {
  return res.status(200).json(res.locals.car);
});

router.post('/:vin', carController.decodeVin, carController.addCar, (req, res) => {
  return res.status(200).json(res.locals.newCar);
});

router.patch('/:vin', carController.decodeVin, carController.updateCar, (req, res) => {
  return res.status(200).json(res.locals.updatedCar);
});

router.delete('/:vin', carController.deleteCar, (req, res) => {
  return res.status(200).json(res.locals.deletedCar);
});

module.exports = router;