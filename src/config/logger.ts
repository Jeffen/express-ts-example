import { createLogger, format, transports } from 'winston';
const { simple, prettyPrint } = format;

// Initiate Logger Service
export default createLogger({
  transports: [
    new transports.Console({ format: simple() }),
    // new transports.File({ filename: 'log/error.log', level: 'error', format: prettyPrint() }),
    new transports.File({ filename: 'log/combined.log', format: simple() })
  ],
  exceptionHandlers: [new transports.File({ filename: 'log/exceptions.log' })]
});
