import { Injectable } from '@nestjs/common';
import { Workflow } from './dto/workflow.dto';

@Injectable()
export class AppService {
  private readonly worflows = [];
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

  exectuteWorkflow(id: number) {
    return {
      workflow_id: id,
      status: 'in_progress',
    };
  }
}
