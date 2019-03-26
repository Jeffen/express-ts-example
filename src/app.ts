import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import compression from 'compression';
import passport from 'passport';
import helmet from 'helmet';
import dotenv from 'dotenv';
import errorhandler from 'errorhandler';
import { Server } from './lib/overnightjs';
import { exceptionErrHandler, clientErrHandler } from './config';

import * as routes from './routes';

class RootServer extends Server {
  constructor() {
    super();
    this.setupExpress();
    this.setupRouter();
    this.setupErrorHandler();
  }

  private setupExpress() {
    // initialize configuration
    dotenv.config({ path: '.env' });
    this.app.set('port', process.env.PORT || 3000);
    this.app.set('env', process.env.NODE_ENV || 'development');

    // Initiate DB
    /* Connect to MongoDB
    const mongoUrl = MONGODB_URI;
    (<any>mongoose).Promise = bluebird;
    mongoose.connect(mongoUrl, {useMongoClient: true}).then(
      () => { },
    ).catch(err => {
      console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
      // process.exit();
    });
    */

    // Security
    this.app.use(helmet());
    this.app.disable('x-powered-by');

    // compression
    this.app.use(compression());

    // Cors
    this.app.use(cors());

    // bodyParser
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // Passport
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    // require('./config/passport')(passport, true);

    // Static files serving
    this.app.use(
      express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
    );
  }

  private setupRouter() {
    const ctlrs: any = { ...routes };
    const ctlrInstances = [];

    for (const name in ctlrs) {
      if (routes.hasOwnProperty(name) && typeof ctlrs[name] === 'function') {
        ctlrInstances.push(new ctlrs[name]());
      }
    }
    super.addControllers(ctlrInstances);
  }

  private setupErrorHandler() {
    // Logger Service and Error Handling
    if (process.env.NODE_ENV === 'development') {
      this.app.use(errorhandler());
    } else {
      this.app.use(clientErrHandler);
      this.app.use(exceptionErrHandler);
    }
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(
        '  App is running at http://localhost:%d in %s mode',
        this.app.get('port'),
        this.app.get('env')
      );
      console.log('  Press CTRL-C to stop\n');
    });
  }
}

export default RootServer;
