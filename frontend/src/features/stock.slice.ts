// src/features/exchange/commodities.slice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { getStock, getStockStrictThenRelaxed } from "../api/data";
import type { Row } from "../components/CommodityTableCard";

// ───────────────────────────────────────────────────────────────────────────────
// 1) META: DB 스키마에 맞춘 원자재 정의 (삽입 순서 = 출력 순서)
const META = {
  sp500: {
    name: "S&P 500",
    unit: "포인트",
    exchange: "NYSE" // 뉴욕증권거래소
  },
  dow_jones: {
    name: "다우존스 산업지수",
    unit: "포인트",
    exchange: "NYSE"
  },
  nasdaq: {
    name: "나스닥 종합지수",
    unit: "포인트",
    exchange: "NASDAQ"
  },
  kospi: {
    name: "코스피",
    unit: "포인트",
    exchange: "KRX" // 한국거래소
  },
  kosdaq: {
    name: "코스닥",
    unit: "포인트",
    exchange: "KRX"
  },
} as const;

type MetaKey = keyof typeof META;

// ───────────────────────────────────────────────────────────────────────────────
// 2) API 배열 → 테이블 Row[] (최신 vs 직전으로 전일비/등락률 계산)
export function toStockRows(
  data: Array<{ date: string; [k: string]: any }>,
  meta: Record<MetaKey, { name: string; unit: string; exchange: string }>
): Row[] {
  if (!Array.isArray(data) || data.length === 0) return [];

  // 최신/직전
  const sorted = [...data].sort((a, b) => (a.date < b.date ? 1 : -1));
  const latest = sorted[0];
  const prev   = sorted[1] ?? null;

  // 월물: 최신 날짜 기준 YY-MM
  const ld = new Date(latest.date);
  const defaultMonth =
    `${String(ld.getFullYear() % 100).padStart(2, "0")}-${String(ld.getMonth() + 1).padStart(2, "0")}`;

  // 기준일: YYYY.MM.DD
  const baseDate =
    `${ld.getFullYear()}.` +
    `${String(ld.getMonth() + 1).padStart(2, "0")}.` +
    `${String(ld.getDate()).padStart(2, "0")}`;

  // meta 선언 순서대로 출력
  const order = Object.keys(meta) as MetaKey[];

  return order.map((k) => {
    const price = Number(latest[k] ?? 0);
    const prevPrice = prev ? Number(prev[k] ?? 0) : 0;
    const diff = prev ? price - prevPrice : 0;
    const rate = prev && prevPrice !== 0 ? (diff / prevPrice) * 100 : 0;

    const m = meta[k];
    return {
      name: m.name,
      month: defaultMonth,
      unit: m.unit,
      price,
      diff,
      rate,
      baseDate,
      exchange: m.exchange,
    };
  });
}

// ───────────────────────────────────────────────────────────────────────────────
// 3) Thunks

// (옵션) 최신 1건 그대로
export const loadLatestStock = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("commodities/loadLatest", async (_, { rejectWithValue }) => {
  try {
    const data = await getStock();
    return data;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Failed to fetch latest commodities");
  }
});

// 최신 N일(기본 2) 받아서: 원본 raw 저장 + Row[] 반환
export const loadNLatestStock = createAsyncThunk<
  Row[],                     // ✅ payload는 테이블용 Row[]
  number | undefined,        // 인자: 개수
  { rejectValue: string }
>("stock/loadNLatest", async (countArg, { rejectWithValue, dispatch }) => {
  try {
    const count =
      Number.isFinite(countArg as number) && (countArg as number) > 0
        ? (countArg as number)
        : 2; // 전일비 계산 위해 2 권장

    const data = await getStockStrictThenRelaxed(count);

    dispatch(setRaw(data));

    const rows = toStockRows(data, META);

    return rows;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Failed to fetch latest commodities");
  }
});

// ───────────────────────────────────────────────────────────────────────────────
// 4) Slice

type stockSlice = {
  raw: any[];     // 원본
  rows: Row[];    // 테이블용
  loading: boolean;
  error: string | null;
};

const initialState: stockSlice = {
  raw: [],
  rows: [],
  loading: false,
  error: null,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setRaw(state, action: PayloadAction<any[]>) {
      state.raw = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadNLatestStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadNLatestStock.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload; // Row[]
      })
      .addCase(loadNLatestStock.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to fetch latest commodities";
      });
  },
});

export const { setRaw } = stockSlice.actions;
export default stockSlice.reducer;

// ───────────────────────────────────────────────────────────────────────────────
// 5) Selectors
export const selectStockRaw     = (s: RootState) => s.stock.raw;
export const selectStockRows    = (s: RootState) => s.stock.rows;
export const selectStockLoading = (s: RootState) => s.stock.loading;
export const selectStockError   = (s: RootState) => s.stock.error;
