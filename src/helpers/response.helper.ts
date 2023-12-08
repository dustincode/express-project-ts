import Express from 'express';

type Headers = Record<string, string>;
type FieldError = { field: string; message: string };
type Error = { code: string; title: string; message: string; fieldErrors?: FieldError[] };

type BaseResponse = {
  httpStatusCode: number;
  headers: Headers;
};

type SuccessResponse<T> = { data: T } & BaseResponse;
type ErrorResponse = { error: Error } & BaseResponse;
type Response<T> = SuccessResponse<T> | ErrorResponse;

export default class ResponseHelper<T> {
  private _httpStatusCode: number;
  private _headers: Headers;
  private _data?: T;
  private _error?: Error;

  constructor(response: Response<T>) {
    this._httpStatusCode = response.httpStatusCode;
    this._headers = response.headers;
    this._data = (response as SuccessResponse<T>)?.data;
    this._error = (response as ErrorResponse)?.error;
  }

  static ok<T>(data: T, headers: Headers = {}) {
    return new ResponseHelper({
      httpStatusCode: 200,
      headers,
      data,
    });
  }

  static created<T>(data: T, headers: Headers = {}) {
    return new ResponseHelper({
      httpStatusCode: 201,
      headers,
      data,
    });
  }

  static noContent(headers: Headers = {}) {
    return new ResponseHelper({
      httpStatusCode: 204,
      headers,
      data: null,
    });
  }

  static badRequest(error: Error, headers: Headers = {}) {
    return new ResponseHelper({
      httpStatusCode: 400,
      headers,
      error,
    });
  }

  static internalServerError(error: Error, headers: Headers = {}) {
    return new ResponseHelper({
      httpStatusCode: 500,
      headers,
      error,
    });
  }

  sendJson(response: Express.Response) {
    this.setHeaders(response);
    return response.status(this._httpStatusCode).json({
      requestId: Math.random(),
      timestamp: new Date().toISOString(),
      data: this._data,
      error: this._error,
    });
  }

  private setHeaders(response: Express.Response) {
    if (!this._headers) {
      return;
    }
    for (const key in this._headers) {
      response.setHeader(key, this._headers[key]);
    }
  }
}
