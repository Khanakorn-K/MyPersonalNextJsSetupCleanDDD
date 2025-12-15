export interface SuccessModelResponse {
  success: boolean;
  message: string;
}

export interface SuccessWithDataModelResponse {
  success: boolean;
  data: object | [];
  message: string;
}
