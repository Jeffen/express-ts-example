import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import compression from 'compression';
import passport from 'passport';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { EventRouter, OrderRouter } from './routes';

// initialize configuration
dotenv.config({ path: '.env' });

// Initiate App
const app = express();
app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || 'development');

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
app.use(helmet());
app.disable('x-powered-by');

// compression
app.use(compression());

// Cors
app.use(cors());

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport
app.use(passport.initialize());
app.use(passport.session());
// require('./config/passport')(passport, true);

// Static files serving
app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

// Routes
app.use('/api/event', new EventRouter().router);
app.use('/api/order', new OrderRouter().router);

export default app;
