export class TrainIA {
  model_type: string;
  id?: number;
  data_source: string;
  parameters: {
    n_estimators: number;
    max_depth: number;
  };
}
