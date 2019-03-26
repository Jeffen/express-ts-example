import { Request, Response, NextFunction } from 'express';
import { Controller, Get } from '../lib/overnightjs';

@Controller('api/event')
export class EventRouter {
  @Get('getId')
  async getEventById(req: Request, res: Response, next: NextFunction) {
    return res.json({
      status: 'OK',
      result: 'OK'
    });
  }
}
