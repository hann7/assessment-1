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
      log: 'Error getting car',
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
  const { year, make, model } = res.locals.decoded;
  const { license, registrationNumber, registrationState, registrationExpiration, registrationName, value, mileage, description, color } = req.body;

  const query = 
  `INSERT INTO Cars
  VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, DEFAULT, current_timestamp)
  RETURNING *`;
  const queryParams = [vin, year, make, model, license, registrationNumber, registrationState, registrationExpiration, registrationName, value, mileage, description, color];
  
  db.query(query, queryParams)
  .then(data => {
    res.locals.newCar = data.rows[0];
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
  const { year, make, model } = res.locals.decoded;
  const { license, registrationNumber, registrationState, registrationExpiration, registrationName, value, mileage, description, color } = req.body;

  const query = 
  `UPDATE Cars 
  SET vin = $1, year = $2, make = $3, model = $4, license_plate = $5, registration_number = $6, registration_state = $7, registration_expiration = $8, registration_name = $9, value = $10, mileage = $11, description = $12, color = $13, last_updated = current_timestamp
  WHERE vin = $1 RETURNING *`
  const queryParams = [vin, year, make, model, license, registrationNumber, registrationState, registrationExpiration, registrationName, value, mileage, description, color];

  db.query(query, queryParams)
  .then(data => {
    res.locals.updatedCar = data.rows[0];
    return next();
  }).catch(error => {
    return next({
      log: 'Error updating car',
      message: { error }
    })
  });

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
      log: 'Error deleting car',
      message: { error }
    })
  });

};

module.exports = carController;
