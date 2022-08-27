const carController = {};
const db = require('../db/carModel');
const fetch = require('node-fetch');

/**
 * **********************************************
 *            Middleware to decode VIN          *
 * **********************************************
 */

carController.decodeVin = async (req, res, next) => {
  const { vin } = req.params;
  let year, make, model;
  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/${vin}?format=json`;

  // hit up decoder API and assign details to the appropriate variables
  await fetch(url, { method: 'POST' })
      .then(data => data.json()) 
      .then(data => {
        model = data.Results[0].Model;
        year = data.Results[0].ModelYear;
        make = data.Results[0].Make
      }).catch(error => {
        return next({
          log: 'Error decoding VIN',
          message: { error }
      })
    });
      
  res.locals.decoded = {
    vin,
    year,
    make,
    model
  };
  return next();
};



/**
 * **********************************************
 *     Middleware to search a car by VIN        *
 * **********************************************
 */

carController.getCar = (req, res, next) => {
  const { vin } = req.params;
  const query = `SELECT * FROM Cars WHERE vin = $1`
  const queryParams = [ vin ]
  // query db table by vin
  db.query(query, queryParams)
  .then(data => {
    //save object in res.locals
    res.locals.car = data.rows[0];
    return next();
  }).catch(error => {
    //error handler
    return next({
      log: 'Error getting car by VIN',
      message: { error }
    })
  })
};



/**
 * **********************************************
 *     Middleware to add/list a car by VIN      *
 * **********************************************
 */

carController.addCar = (req, res, next) => {
  const { vin } = req.params;
  return next();
};



/**
 * **********************************************
 *     Middleware to update a car by VIN        *
 * **********************************************
 */

carController.updateCar = (req, res, next) => {
  const { vin } = req.params;
  return next();
};



/**
 * **********************************************
 *     Middleware to delete a car by VIN        *
 * **********************************************
 */

carController.deleteCar = (req, res, next) => {
  const { vin } = req.params;
  const query = `DELETE * FROM Cars WHERE vin = $1 RETURNING *`
  const queryParams = [ vin ]
  // query db table by vin
  db.query(query, queryParams)
  .then(data => {
    //save object in res.locals
    res.locals.deletedCar = data.rows[0];
    return next();
  }).catch(error => {
    //error handler
    return next({
      log: 'Error getting car by VIN',
      message: { error }
    })
  })
};

module.exports = carController;
