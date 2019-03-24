import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import passportJwt from 'passport-jwt';
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  issuer: '2fun',
  secretOrKey: '123123'
};

passport.use(
  new JwtStrategy(jwtOpts, (jwt_payload, done) => {
    return done(null, { id: 'fake' });
    // User.findOne({id: jwt_payload.id}, function(err: any, user: any) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //     }
    // });
  })
);

/**
 * Login Required middleware.
 */
export let isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json('UnAuthorized');
};
