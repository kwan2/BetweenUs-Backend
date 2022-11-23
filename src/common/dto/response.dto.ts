export class ResponseDto<T> {
  private statusCode: number;
  private message: string;
  private data: T | T[] | null;

  constructor(response: ResponseBuilder<T>) {
    this.statusCode = response.getStatusCode;
    this.message = response.getMessage;
    this.data = response.getData;
  }
}

export class ResponseBuilder<T> {
  private _statusCode: number;
  private _message: string;
  private _data: T | T[] | null;

  get getStatusCode(): number {
    return this._statusCode;
  }

  get getMessage(): string {
    return this._message;
  }

  get getData(): T | T[] | null {
    return this._data;
  }

  public status(code: number): ResponseBuilder<T> {
    this._statusCode = code;
    return this;
  }

  public message(message: string): ResponseBuilder<T> {
    this._message = message;
    return this;
  }

  public body(data: T | T[]): ResponseBuilder<T> {
    this._data = data;
    return this;
  }

  build(): ResponseDto<T> {
    return new ResponseDto(this);
  }
}
