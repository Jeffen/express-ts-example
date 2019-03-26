import { Request, Response, NextFunction } from 'express';
import * as AWS from 'aws-sdk';
import { Controller, Get } from '../lib/overnightjs';

@Controller('api/event')
export class EventRouter {
  @Get(':id')
  async getEventById(req: Request, res: Response, next: NextFunction) {
    const id = req.params['id'];
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName: 'event',
      Key: {
        projectId: id
      }
    };
    const result = await dynamodb.get(params).promise();
    return res.json({
      status: 'OK',
      result: result.Item
    });
  }
}
