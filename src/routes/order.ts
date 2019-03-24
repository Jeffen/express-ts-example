import { Router, Request, Response, NextFunction } from 'express';
import { asyncUtil } from '../utils';

export class OrderRouter {
  router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/getId`, asyncUtil(this.getOrderById));
  }

  private async getOrderById(req: Request, res: Response, next: NextFunction) {
    return res.json({
      status: 'OK',
      result: null
    });
  }
}

export default OrderRouter;
