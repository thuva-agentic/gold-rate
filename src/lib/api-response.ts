import { NextResponse } from "next/server";

export type ApiErrorBody = {
  error: string;
};

export const apiError = (
  message: string,
  status: number,
): NextResponse<ApiErrorBody> =>
  NextResponse.json({ error: message }, { status });

export const apiSuccess = <T>(data: T, status = 200): NextResponse<T> =>
  NextResponse.json(data, { status });
