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

  await fetch(url, { method: 'POST' })
      .then(data => data.json()) 
      .then(data => {
        model = data.Results[0].Model;
        year = Number(data.Results[0].ModelYear);
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
  const query = `SELECT * FROM Cars WHERE vin = $1`;
  const queryParams = [vin];
  
  db.query(query, queryParams)
  .then(data => {
    res.locals.car = data.rows[0];
    return next();
  }).catch(error => {
    return next({
      log: 'Error getting car by VIN',
      message: { error }
    })
  });

};



/**
 * **********************************************
 *     Middleware to add/list a car by VIN      *
 * **********************************************
 */

carController.addCar = (req, res, next) => {
  const { vin } = req.params;
  const { license, registrationNumber, registrationState, registrationExpiration, registrationName, value, mileage, description, color } = req.body;
  const { year, make, model } = res.locals.decoded;

  const query = 
  `INSERT INTO Cars
  VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, DEFAULT, current_timestamp)
  RETURNING *`;
  const queryParams = [vin, year, make, model, license, registrationNumber, registrationState, registrationExpiration, registrationName, value, mileage, description, color];
  
  db.query(query, queryParams)
  .then(data => {
    res.locals.newCar = data.rows[0];
    console.log(data.rows)
    return next();
  }).catch(error => {
    return next({
      log: 'Error adding car',
      message: { error }
    })
  });

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
  
  db.query(query, queryParams)
  .then(data => {
    res.locals.deletedCar = data.rows[0];
    return next();
  }).catch(error => {
    return next({
      log: 'Error getting car by VIN',
      message: { error }
    })
  });

};

module.exports = carController;
