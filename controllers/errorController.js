const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path} : ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: "${value}". Please use another value!`;

  return new AppError(message, 400);
}

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTErrorDB = () => new AppError('Invalid token. Please login again.', 401);

const handleJWTExpiredErrorDB = () => new AppError('Your token has expired. Please login again.', 401);

const sendErrorDev = (err,req,res) => {
  // API
  if(req.originalUrl.startsWith('/api')){
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack
    });
  } else {
    // RENDERED WEBSITE
    console.error('Error: ', err);
    res.status(err.statusCode).render('error',{
      title: 'Something went wrong',
      msg: err.message
    });
  }
};

const sendErrorProd = (err,req,res) => {
  // A) API
  if(req.originalUrl.startsWith('/api')){
    //operational, trusted error: send message to the client
    if(err.isOperational){
      // if(!err.message) err.message = 'No tour found with that ID';
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
  
      //programming or unknown error: don't leak error details to client
    } else {
      //1) log error
      console.error('Error: ', err);
      //2) send generic message
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      });
    }
  } else {
    // B) RENDERED WEBSITE
    //operational, trusted error: send message to the client
    if(err.isOperational){
      res.status(err.statusCode).render('error',{
        title: 'Something went wrong',
        msg: err.message
      });
      //programming or unknown error: don't leak error details to client
    } else {
      //1) log error
      console.error('Error: ', err);
  
      //2) send generic message
      res.status(err.statusCode).render('error',{
        title: 'Something went wrong',
        msg: 'Please try again later.'
      });
    }
  }
};

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development'){
      sendErrorDev(err,req,res);
    } else /*if(process.env.NODE_ENV === 'production')*/{
      let error = {...err}; 
      error.name = err.name;
      error.message = err.message;
      
      if(error.name === 'CastError') error = handleCastErrorDB(error);
      if(error.code === 11000) error = handleDuplicateFieldsDB(error);
      if(error.name === 'ValidationError') error = handleValidationErrorDB(error);
      if(error.name === 'JsonWebTokenError') error = handleJWTErrorDB();
      if(error.name === 'TokenExpiredError') error = handleJWTExpiredErrorDB();

      sendErrorProd(error,req,res);
    }
  
}