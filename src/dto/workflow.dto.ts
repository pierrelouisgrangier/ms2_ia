export class Workflow {
  'name': string;
  'data_source': string;
  'steps': Array<{
    step_type: string;
    parameters: any;
  }>;
}
