export class TrainIA {
  model_type: string;
  data_source: string;
  parameters: {
    n_estimators: number;
    max_depth: number;
  };
}
