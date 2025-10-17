import { http } from '../lib/http'

export async function getExchange(): Promise<any> {
    const response = await http.get<any>('/exchange/latest')
    return response.data
}

export async function getExchangeRange(years: number) {
  const res = await http.get(`/exchange/range?years=${years}`);
  return res.data;
}

export async function getGrains(): Promise<any> {
    const response = await http.get<any>('/grains/latest');
    return response.data;
}

export async function getGrainsStrictThenRelaxed(n: number) {
  const strict = await http.get('/grains/nlatest', { params: { n, full: true } });
  if (Array.isArray(strict.data) && strict.data.length > 0) return strict.data;

  const relaxed = await http.get('/grains/nlatest', { params: { n, full: false } });
  return relaxed.data;
}

export async function getCommodities(): Promise<any> {
    const response = await http.get<any>('/commodities/latest');
    return response.data;
}

export async function getCommoditiesStrictThenRelaxed(n: number) {
  const strict = await http.get('/commodities/nlatest', { params: { n, full: true } });
  if (Array.isArray(strict.data) && strict.data.length > 0) return strict.data;

  const relaxed = await http.get('/commodities/nlatest', { params: { n, full: false } });
  return relaxed.data;
}

export async function getStock(): Promise<any> {
    const response = await http.get<any>('/stock/latest');
    return response.data;
}

export async function getStockStrictThenRelaxed(n: number) {
  const strict = await http.get('/stock/nlatest', { params: { n, full: true } });
  if (Array.isArray(strict.data) && strict.data.length > 0) return strict.data;

  const relaxed = await http.get('/stock/nlatest', { params: { n, full: false } });
  return relaxed.data;
}

export async function getNewsSentimentAll() {
    const res = await http.get("/mongo/news-sentiment/all");
    return res.data;
}

export async function getNewsSentimentByDate(date: string) {
    const res = await http.get(`/mongo/news-sentiment/date/${date}`);
    return res.data;
}

export async function getNewsSentimentRange(start: string, end: string) {
    const res = await http.get(`/mongo/news-sentiment/range?start=${start}&end=${end}`);
    return res.data;
}

export async function getNewsSentimentLatest(n: number) {
    const res = await http.get(`/mongo/news-sentiment/latest/${n}`);
    return res.data;
}

export async function getNewsSentimentLatestNonNull(n: number) {
    const res = await http.get(`/mongo/news-sentiment/latest/non-null/${n}`);
    return res.data;
}

export async function getExportImportPriceIndexLatestN(n: number = 3): Promise<any[]> {
  const response = await http.get<any>(
    `/mongo/export-import-price-index/latest/non-null/${n}`
  );
  return response.data;
}
