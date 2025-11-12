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

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  code: string;
  data: { userId: number; message: string };
  message: string;
  success: boolean;
}

export interface getInfoResponse {
  code: string;
  data: {
    id: number;
    username: string;
    name: string;
    email: string;
    age: number;
    status: string;
  };
  message: string;
  success: boolean;
}
