import { Request, Response } from 'express';
import { Get, Controller } from '../lib/overnightjs';

@Controller('api/order')
export class OrderRouter {
  @Get('getId')
  private getOrderById(req: Request, res: Response) {
    return res.status(200).json({
      status: 'OK',
      result: process.env.NODE_ENV.toUpperCase()
    });
  }
}
