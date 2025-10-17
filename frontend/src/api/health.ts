// src/api/health.ts
import { http } from '../lib/http'

export type Health = { status: string }

export async function getHealth(): Promise<any> {
  const response = await http.get<Health>('/api/health')
  return response
}

export async function connectPDb(): Promise<any> {
  const response = await http.get<any>('/api/db/pg/tables')
  return response
}

export async function connectMDb(): Promise<any> {
  const response = await http.get<any>('/api/db/mongo/collections')
  return response
}
