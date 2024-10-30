export class Workflow {
  'name': string;
  id?: number;
  'data_source': string;
  'steps': Array<{
    step_type: string;
    parameters: any;
  }>;
}
