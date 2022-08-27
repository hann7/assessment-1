const express = require('express');
const carController = require('../controllers/carController');
const router = express.Router();

router.get('/:vin', carController.getCar, (req, res) => {
  return res.status(200).json(res.locals.car);
});

router.post('/', carController.addCar, (req, res) => {
  return res.status(200).json("car added", res.locals.newCar);
});

router.patch('/:vin', carController.updateCar, (req, res) => {
  return res.status(200).json("car updated", res.locals.updatedCar);
});

router.delete('/:vin', carController.deleteCar, (req, res) => {
  return res.status(200).json("car deleted", res.locals.deletedCar);
});

module.exports = router;