export interface tokenRequest {
  email: string;
  password: string;
}

export interface TokenString {
  token: string;
}

export interface ResponseToken {
  value: TokenString;
  statusCode: number;
  contentType?: any;
}
