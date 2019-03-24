import { Request, Response, NextFunction } from 'express';
import dayjs from 'dayjs';
import errorhandler from 'errorhandler';
import logger from './config/logger';
import app from './app';

// Logger Service and Error Handling
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler());
} else {
  app.use(clientErrorHandler);
  app.use(errorHandler);
}

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

export default server;

/*******************************************************
 * End of middlewares
 *******************************************************/
function clientErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.xhr) {
    logger.log({
      level: 'info',
      method: req.method,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      user: req.user ? req.user.id : 'Unknown User ID',
      url: req.originalUrl,
      message: err,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')
    });
    return res
      .status(400)
      .json({ status: 'ERROR', result: err })
      .end();
  } else {
    next(err);
  }
}

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.log({
    level: 'error',
    method: req.method,
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    user: req.user ? req.user.id : 'Unknown User ID',
    url: req.originalUrl,
    message: err,
    timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')
  });
  return res
    .status(500)
    .json({ status: 'ERROR', result: err })
    .end();
}
