# Assumptions & Notes:

- server side data validation is in place, all input is good to go
- registration expiration should be updated on the front end to be the same as the db format (YYYY-MM-DD), but if not we can easily manipulate that
- user should not update their own VIN, it should have to be manually adjusted by company (I wrote the functionality, however from a business perspective I don't see the benefit)

## sample of request body to list or update a car:

```json

{
    "license": "ABC123",
    "registrationNumber": "R123456",
    "registrationState": "California",
    "registrationExpiration": "2023-08-29",
    "registrationName": "Hannah Santoyo",
    "value": 60000,
    "mileage": 16574,
    "description": "test description",
    "color": "white"
}
```

- data is all in one table for the sake of time but I've included a diagram of one possible way the database can be organized for scaling purposes

<img src="dbdiagram.png">

## How to start server:

- npm install
- npm run dev
