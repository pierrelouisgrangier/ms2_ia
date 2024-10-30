export class Workflow {
  'name': string;
  id?: number;
  status?: string;
  'data_source': string;
  'steps': Array<{
    step_type: string;
    parameters: any;
    status?: string;
  }>;
}
