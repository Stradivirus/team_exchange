// src/api/health.ts
import { http } from '../lib/http'

export type Health = { status: string }

export async function getHealth(): Promise<any> {
  const response = await http.get<Health>('/health')
  return response
}

export async function connectPDb(): Promise<any> {
  const response = await http.get<any>('/db/pg/tables')
  return response
}

export async function connectMDb(): Promise<any> {
  const response = await http.get<any>('/db/mongo/collections')
  return response
}
