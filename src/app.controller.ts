import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
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
}
