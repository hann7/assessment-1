const express = require('express');
const carRouter = require('./routes/carRoutes.js');

const app = express();
const PORT = 3000;

app.use(express.json());

//car router
app.use('/cars', carRouter);

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});