import Boom from '@hapi/boom';

function logErrors(err, req, res, next) {
  console.error('Error:', {
    message: err.message,
    status: err.status,
    path: req.path,
    method: req.method
  });
  next(err);
}

function boomError(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  const status = err.status;
  const isDevelopment = process.env.NODE_ENV === 'dev';
  
  res.status(status).json({
    message: err.message,
    ...(isDevelopment && { stack: err.stack }) 
  });
}

export { logErrors, errorHandler, boomError };