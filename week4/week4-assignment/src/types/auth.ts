export interface SignUpRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

export interface SignUpResponse {
  message: string;
  success: boolean;
}
