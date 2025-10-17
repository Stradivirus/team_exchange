import { http } from '../lib/http'

export async function getExchange(): Promise<any> {
    const response = await http.get<any>('/api/exchange/latest')

    return response.data
}

export async function getExchangeRange(years: number) {
  const res = await http.get(`/api/exchange/range?years=${years}`);
  return res.data;
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

// 전체
export async function getNewsSentimentAll() {
    const res = await http.get("/api/mongo/news-sentiment/all");
    return res.data;
}

// 특정 날짜
export async function getNewsSentimentByDate(date: string) {
    const res = await http.get(`/api/mongo/news-sentiment/date/${date}`);
    return res.data;
}

// 기간별
export async function getNewsSentimentRange(start: string, end: string) {
    const res = await http.get(`/api/mongo/news-sentiment/range?start=${start}&end=${end}`);
    return res.data;
}

// 최신 n건 (전체)
export async function getNewsSentimentLatest(n: number) {
    const res = await http.get(`/api/mongo/news-sentiment/latest/${n}`);
    return res.data;
}

// 최신 n건 (value, itemName null 제외)
export async function getNewsSentimentLatestNonNull(n: number) {
    const res = await http.get(`/api/mongo/news-sentiment/latest/non-null/${n}`);
    return res.data;
}

export async function getExportImportPriceIndexLatestN(n: number = 3): Promise<any[]> {
  const response = await http.get<any>(
    `/api/mongo/export-import-price-index/latest/non-null/${n}`
  );
  return response.data; // 데이터 배열 반환
}
