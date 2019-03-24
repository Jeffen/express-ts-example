import { Router, Request, Response, NextFunction } from 'express';
import { asyncUtil } from '../utils';

export class EventRouter {
  router: Router = Router();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/getId`, asyncUtil(this.getEventById));
  }

  private async getEventById(req: Request, res: Response, next: NextFunction) {
    return res.json({
      status: 'OK',
      result: 'OK'
    });
  }
}

export default EventRouter;
