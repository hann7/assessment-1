# Assumptions & Notes:

- server side data validation is in place, all input in request is good to go
- registration expiration date should be updated on the front end to be the same as the db format (YYYY-MM-DD), but if not we can easily manipulate that on the back end too
- user should not update their own VIN/year/make/model, it should have to be manually adjusted by company - for production I would make it so the user can update only the color, mileage, and description
- production-ready code would use typescript and incorporate unit tests to make sure the endpoints & db queries are working correctly, however for the sake of time I have chosen to exclude them

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
