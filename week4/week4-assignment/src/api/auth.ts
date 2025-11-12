import client from "./client";
import type {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
  getInfoResponse,
  editInfoRequest,
  editInfoResponse,
} from "../types/auth";

export async function signUp(data: SignUpRequest): Promise<SignUpResponse> {
  const response = await client.post<SignUpResponse>("/api/v1/users", data);
  return response.data;
}

export async function logIn(data: LoginRequest): Promise<LoginResponse> {
  const response = await client.post<LoginResponse>("/api/v1/auth/login", data);
  return response.data;
}

export async function getInfo(data: number): Promise<getInfoResponse> {
  const response = await client.get<getInfoResponse>(`/api/v1/users/${data}`);
  return response.data;
}

export async function editInfo(
  userId: number,
  data: editInfoRequest
): Promise<editInfoResponse> {
  const response = await client.patch<editInfoResponse>(
    `/api/v1/users/${userId}`,
    data
  );
  return response.data;
}
