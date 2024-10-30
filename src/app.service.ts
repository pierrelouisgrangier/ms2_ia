import { Injectable } from '@nestjs/common';
import { TrainIA } from './dto/train_id.dto';
import { Workflow } from './dto/workflow.dto';

@Injectable()
export class AppService {
  private readonly worflows = [];
  private readonly trains = [];
  private readonly IN_PROGRESS = 'in_progress';
  private readonly COMPLETED = 'completed';
  private readonly PENDING = 'pending';

  getHello(): string {
    return 'Hello World!';
  }

  createWorkflow(workflow: Workflow) {
    const workflow_id = this.worflows.push(workflow);
    const steps = [];
    workflow.steps.forEach((step) =>
      steps.push({ step_type: step.step_type, status: 'pending' }),
    );
    return {
      workflow_id,
      status: 'created',
      steps,
    };
  }

  getWorkflows() {
    return this.worflows;
  }

  exectuteWorkflow(id: number) {
    this.worflows[id].status = this.IN_PROGRESS;
    this.worflows[id].steps.forEach((step) => {
      step.status = this.IN_PROGRESS;
    });
    return {
      workflow_id: id,
      status: this.IN_PROGRESS,
    };
  }

  statusWorkflow(id: number) {
    if (this.worflows[id].status === this.COMPLETED) {
      const steps = [];
      this.worflows[id].steps.forEach((step) => {
        steps.push({ step_type: step.step_type, status: step.status });
      });
      return { workflow_id: id, status: this.COMPLETED, steps };
    } else {
      const steps = [];
      let test = true;
      this.worflows[id].steps.forEach((step) => {
        if (test && step.status === this.IN_PROGRESS) {
          step.status = this.COMPLETED;
          test = false;
        }
        steps.push({ step_type: step.step_type, status: step.status });
      });
      return { workflow_id: id, status: this.COMPLETED, steps };
    }
  }

  trainModel(trainIA: TrainIA) {
    const id = this.trains.push(trainIA);
    return {
      model_id: 'rf_' + id,
      status: 'training_in_progress',
      accuracy: null,
    };
  }

  getModels() {
    return this.trains;
  }
  trainStatus(idString: string) {
    const id = Number.parseInt(idString.split('_')[1]);
    console.log(id);
    return {
      model_id: idString,
      status: 'training_completed',
      metrics: {
        accuracy: Math.random(),
        precision: Math.random(),
        recall: Math.random(),
      },
    };
  }

  deleteWorkflow(id: string) {
    delete this.worflows[Number.parseInt(id)];
    return {
      workflow_id: id,
      status: 'deleted',
    };
  }

  deleteModel(idString: string) {
    const id = Number.parseInt(idString.split('_')[1]);
    console.log(id);
    delete this.trainModel[id];
    return {
      workflow_id: id,
      status: 'deleted',
    };
  }
}
