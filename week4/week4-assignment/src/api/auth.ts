import client from "./client";
import type { SignUpRequest, SignUpResponse } from "../types/auth";

export async function signUp(data: SignUpRequest): Promise<SignUpResponse> {
  const response = await client.post<SignUpResponse>("/api/v1/users", data);
  return response.data;
}
