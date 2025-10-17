import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import {
    getNewsSentimentAll,
    getNewsSentimentLatest,
    getNewsSentimentLatestNonNull
} from "../api/data";
import type { Row } from "../components/CommodityTableCard";

export function toSentimentRows(
  data: Array<{
    date: string;
    value: number;
    itemName?: string;
    statCode?: string;
    itemCode?: string;
  }>,
  meta: Record<string, { name: string; unit: string; exchange: string }>
): Row[] {
  if (!Array.isArray(data) || data.length === 0) return [];

  // 최신 / 전일 데이터 정렬
  const sorted = [...data].sort((a, b) => (a.date < b.date ? 1 : -1));
  const latest = sorted[0];
  const prev = sorted[1] ?? null;

  // 기준일 포맷: YYYY.MM.DD
  const ld = new Date(latest.date);
  const baseDate = `${ld.getFullYear()}.${String(ld.getMonth() + 1).padStart(2, "0")}.${String(
    ld.getDate()
  ).padStart(2, "0")}`;

  // 월물 (YY-MM)
  const defaultMonth = `${String(ld.getFullYear() % 100).padStart(2, "0")}-${String(
    ld.getMonth() + 1
  ).padStart(2, "0")}`;

  // 가격 계산
  const price = Number(latest.value ?? 0);
  const prevPrice = prev ? Number(prev.value ?? 0) : 0;
  const diff = prev ? price - prevPrice : 0;
  const rate = prev && prevPrice !== 0 ? (diff / prevPrice) * 100 : 0;

  // meta.news 사용 (단일 지표)
  const m = meta.news;

  return [
    {
      name: latest.itemName ?? m.name,
      month: defaultMonth,
      unit: m.unit,
      price,
      diff,
      rate,
      baseDate,
      exchange: latest.itemCode ?? m.exchange,
    },
  ];
}


/* ===============================
   Async Thunks
   =============================== */

// 전체 데이터 불러오기
export const loadAllSentiment = createAsyncThunk<
    any,
    void,
    { rejectValue: string }
>("sentiment/loadAll", async (_, { rejectWithValue }) => {
    try {
        const data = await getNewsSentimentAll();
        return data;
    } catch (e: any) {
        return rejectWithValue(e?.message ?? "Failed to load consumer sentiment");
    }
});

// 최신 n건 불러오기
export const loadNLatestSentiment = createAsyncThunk<
    any,
    number | undefined,
    { rejectValue: string }
>("sentiment/loadNLatest", async (countArg, { rejectWithValue }) => {
    try {
        const count = Number.isFinite(countArg) && (countArg as number) > 0
            ? (countArg as number)
            : 3; // 기본값 3개
        const data = await getNewsSentimentLatest(count);
        return data;
    } catch (e: any) {
        return rejectWithValue(e?.message ?? "Failed to fetch latest sentiment data");
    }
});

// 최신 n건 (null 제외)
export const loadNLatestNonNullSentiment = createAsyncThunk<
  any,
  number | undefined,
  { rejectValue: string; dispatch: any }
>("sentiment/loadNLatestNonNull", async (countArg, { rejectWithValue, dispatch }) => {
  try {
    const count = Number.isFinite(countArg) && (countArg as number) > 0
      ? (countArg as number)
      : 2;

    const data = await getNewsSentimentLatestNonNull(count);
    const rows = toSentimentRows(data, META);


    dispatch(setRaw(data)); 
    return rows;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Failed to fetch non-null sentiment data");
  }
});


const META = {
  news: {
    name: "뉴스심리지수",
    unit: "포인트",
    exchange: "Korea Press Foundation", // 뉴스 데이터 출처
  },
}

/* ===============================
   State & Slice
   =============================== */

type SentimentRow = {
    date: string;
    value: number;
    itemName: string;
    statCode: string;
    itemCode: string;
};

type SentimentState = {
    raw: any[];
    rows: SentimentRow[];
    loading: boolean;
    error: string | null;
};

const initialState: SentimentState = {
    raw: [],
    rows: [],
    loading: false,
    error: null,
};

const sentimentSlice = createSlice({
    name: "sentiment",
    initialState,
    reducers: {
        setRaw(state, action: PayloadAction<any[]>) {
            state.raw = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // loadNLatestSentiment
            .addCase(loadNLatestSentiment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadNLatestSentiment.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false;
                state.raw = action.payload;
                state.rows = action.payload;
            })
            .addCase(loadNLatestSentiment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Error loading sentiment";
            })

            // loadNLatestNonNullSentiment
            .addCase(loadNLatestNonNullSentiment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadNLatestNonNullSentiment.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false;
                state.raw = action.payload;
                state.rows = action.payload;
            })
            .addCase(loadNLatestNonNullSentiment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Error loading sentiment";
            })

            // loadAllSentiment
            .addCase(loadAllSentiment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadAllSentiment.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false;
                state.raw = action.payload;
                state.rows = action.payload;
            })
            .addCase(loadAllSentiment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Error loading sentiment";
            });
    },
});

/* ===============================
   Selectors & Exports
   =============================== */

export const selectSentimentRaw = (s: RootState) => s.sentiment.raw;
export const selectSentimentRows = (s: RootState) => s.sentiment.rows;
export const selectSentimentLoading = (s: RootState) => s.sentiment.loading;
export const selectSentimentError = (s: RootState) => s.sentiment.error;

export const { setRaw } = sentimentSlice.actions;
export default sentimentSlice.reducer;
