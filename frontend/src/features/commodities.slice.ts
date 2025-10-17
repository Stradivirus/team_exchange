// src/features/exchange/commodities.slice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { getCommodities, getCommoditiesStrictThenRelaxed } from "../api/data";
import type { Row } from "../components/CommodityTableCard";

// ───────────────────────────────────────────────────────────────────────────────
// 1) META: DB 스키마에 맞춘 원자재 정의 (삽입 순서 = 출력 순서)
const META = {
  gold:       { name: "금",        unit: "달러/온스",   exchange: "COMEX" },
  silver:     { name: "은",        unit: "달러/온스",   exchange: "COMEX" },
  copper:     { name: "구리",      unit: "달러/파운드", exchange: "COMEX" },
  crude_oil:  { name: "WTI 원유",  unit: "달러/배럴",   exchange: "NYMEX" },
  brent_oil:  { name: "브렌트유",  unit: "달러/배럴",   exchange: "ICE"   },
} as const;

type MetaKey = keyof typeof META;

// ───────────────────────────────────────────────────────────────────────────────
// 2) API 배열 → 테이블 Row[] (최신 vs 직전으로 전일비/등락률 계산)
export function toCommodityRows(
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
export const loadLatestCommodities = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("commodities/loadLatest", async (_, { rejectWithValue }) => {
  try {
    const data = await getCommodities();
    return data;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Failed to fetch latest commodities");
  }
});

// 최신 N일(기본 2) 받아서: 원본 raw 저장 + Row[] 반환
export const loadNLatestCommodities = createAsyncThunk<
  Row[],                     // ✅ payload는 테이블용 Row[]
  number | undefined,        // 인자: 개수
  { rejectValue: string }
>("commodities/loadNLatest", async (countArg, { rejectWithValue, dispatch }) => {
  try {
    const count =
      Number.isFinite(countArg as number) && (countArg as number) > 0
        ? (countArg as number)
        : 2; // 전일비 계산 위해 2 권장

    const data = await getCommoditiesStrictThenRelaxed(count);

    dispatch(setRaw(data));

    // ✅ 테이블용으로 가공
    const rows = toCommodityRows(data, META);

    return rows;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Failed to fetch latest commodities");
  }
});

// ───────────────────────────────────────────────────────────────────────────────
// 4) Slice

type CommoditiesState = {
  raw: any[];     // 원본
  rows: Row[];    // 테이블용
  loading: boolean;
  error: string | null;
};

const initialState: CommoditiesState = {
  raw: [],
  rows: [],
  loading: false,
  error: null,
};

const commoditiesSlice = createSlice({
  name: "commodities",
  initialState,
  reducers: {
    setRaw(state, action: PayloadAction<any[]>) {
      state.raw = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadNLatestCommodities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadNLatestCommodities.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload; // Row[]
      })
      .addCase(loadNLatestCommodities.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to fetch latest commodities";
      });
  },
});

export const { setRaw } = commoditiesSlice.actions;
export default commoditiesSlice.reducer;

// ───────────────────────────────────────────────────────────────────────────────
// 5) Selectors
export const selectCommoditiesRaw     = (s: RootState) => s.commodities.raw;
export const selectCommoditiesRows    = (s: RootState) => s.commodities.rows;
export const selectCommoditiesLoading = (s: RootState) => s.commodities.loading;
export const selectCommoditiesError   = (s: RootState) => s.commodities.error;
