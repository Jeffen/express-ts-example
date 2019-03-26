import { Request, Response } from 'express';
import { Get, Controller } from '../lib/overnightjs';

@Controller('')
export class RootRouter {
  @Get('/')
  private test(req: Request, res: Response) {
    return res.send({
      Output: 'Hello World!'
    });
  }
}
