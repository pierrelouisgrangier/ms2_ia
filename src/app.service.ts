import { Injectable } from '@nestjs/common';
import { TrainIA } from './dto/train_id.dto';
import { Workflow } from './dto/workflow.dto';

@Injectable()
export class AppService {
  private readonly workflows = new Array<Workflow>();
  private readonly trains = [];
  private readonly IN_PROGRESS = 'in_progress';
  private readonly COMPLETED = 'completed';
  private readonly PENDING = 'pending';

  getHello(): string {
    return 'Hello World!';
  }

  createWorkflow(workflow: Workflow) {
    const workflow_id = this.workflows.push(workflow);
    this.workflows[workflow_id - 1].id = workflow_id;
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
    return this.workflows;
  }

  exectuteWorkflow(id: number) {
    this.workflows[id].status = this.IN_PROGRESS;
    this.workflows[id].steps.forEach((step) => {
      step.status = this.IN_PROGRESS;
    });
    return {
      workflow_id: id,
      status: this.IN_PROGRESS,
    };
  }

  statusWorkflow(id: number) {
    if (this.workflows[id].status === this.COMPLETED) {
      const steps = [];
      this.workflows[id].steps.forEach((step) => {
        steps.push({ step_type: step.step_type, status: step.status });
      });
      return { workflow_id: id, status: this.COMPLETED, steps };
    } else {
      const steps = [];
      let test = true;
      this.workflows[id].steps.forEach((step) => {
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
    this.trains[id].id = 'rf_' + id;
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
    delete this.workflows[Number.parseInt(id)];
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
