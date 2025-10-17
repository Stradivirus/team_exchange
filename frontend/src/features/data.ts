import { http } from '../lib/http'

export async function getExchange(): Promise<any> {
    const response = await http.get<any>('/api/exchange/latest')

    return response.data
}

export async function getGrains(): Promise<any> {
    const response = await http.get<any>('/api/grains/latest');

    return response.data;
}

export async function getGrainsStrictThenRelaxed(n: number) {
  const strict = await http.get('/api/grains/nlatest', { params: { n, full: true } });
  if (Array.isArray(strict.data) && strict.data.length > 0) return strict.data;

  const relaxed = await http.get('/api/grains/nlatest', { params: { n, full: false } });
  return relaxed.data; // 없으면 [] 처리
}

export async function getCommodities(): Promise<any> {
    const response = await http.get<any>('/api/commodities/latest');

    return response.data;
}

export async function getCommoditiesStrictThenRelaxed(n: number) {
  const strict = await http.get('/api/commodities/nlatest', { params: { n, full: true } });
  if (Array.isArray(strict.data) && strict.data.length > 0) return strict.data;

  const relaxed = await http.get('/api/commodities/nlatest', { params: { n, full: false } });
  return relaxed.data; // 없으면 [] 처리
}

export async function getStock(): Promise<any> {
    const response = await http.get<any>('/api/stock/latest');

    return response.data;
}

export async function getStockStrictThenRelaxed(n: number) {
  const strict = await http.get('/api/stock/nlatest', { params: { n, full: true } });
  if (Array.isArray(strict.data) && strict.data.length > 0) return strict.data;

  const relaxed = await http.get('/api/stock/nlatest', { params: { n, full: false } });
  return relaxed.data; // 없으면 [] 처리
}

