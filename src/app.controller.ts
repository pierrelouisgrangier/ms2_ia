import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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

  @Get('workflows')
  getWorkflows() {
    return this.appService.getWorkflows();
  }

  @Post('workflow')
  createWorkflow(@Body() body: Workflow) {
    return this.appService.createWorkflow(body);
  }

  @Post('workflow/:id/execute')
  exectuteWorkflow(@Param('id') id: string) {
    return this.appService.exectuteWorkflow(Number.parseInt(id));
  }

  @Post('workflow/:id/status')
  statusWorkflow(@Param('id') id: string) {
    return this.appService.statusWorkflow(Number.parseInt(id));
  }

  @Post('model/train')
  trainModel(@Body() body: TrainIA) {
    return this.appService.trainModel(body);
  }

  @Get('model/:id/status')
  trainStatus(@Param('id') id: string) {
    return this.appService.trainStatus(id);
  }

  @Get('models')
  getModels() {
    return this.appService.getModels();
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

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: async (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = `${uniqueSuffix}${extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully',
      filename: file.filename,
    };
  }
}
