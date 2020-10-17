export interface IResponseModel<T = unknown, R = unknown> {
  data: T;
  error: R;
}
