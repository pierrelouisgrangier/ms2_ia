import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TrainIA } from './dto/train_id.dto';
import { Workflow } from './dto/workflow.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('workflow')
  createWorkflow(@Body() body: Workflow) {
    this.appService.createWorkflow(body);
  }

  @Post('workflow/:id/execute')
  exectuteWorkflow(@Param('id') id: string) {
    this.appService.exectuteWorkflow(Number.parseInt(id));
  }

  @Post('workflow/:id/status')
  statusWorkflow(@Param('id') id: string) {
    this.appService.statusWorkflow(Number.parseInt(id));
  }

  @Post('model/train')
  trainModel(@Body() body: TrainIA) {
    return this.appService.trainModel(body);
  }

  @Get('model/:id/status')
  trainStatus(@Param('id') id: string) {
    return this.appService.trainStatus(id);
  }

  @Post('model/:id/predict')
  prediction(@Param('id') id: string) {
    console.log(id);
    return {
      predictions: [0, 1],
    };
  }

  @Delete('workflow/:id')
  deleteWorkflow(@Param('id') id: string) {
    return this.appService.deleteWorkflow(id);
  }

  @Delete('model/:id')
  deleteModel(@Param('id') id: string) {
    return this.appService.deleteModel(id);
  }
}
