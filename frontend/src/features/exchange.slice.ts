// src/features/exchange/exchange.slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { getExchange, getExchangeRange } from "../api/data";
import type { ExchangeRate } from "./exchange.types";

export const loadLatestExchange = createAsyncThunk<
  any,          // 성공 시 payload 타입
  void,         // 인자 없음
  { rejectValue: string }
>(
  "exchange/loadLatest",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getExchange();
      return data;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? "Failed to fetch latest exchange");
    }
  }
);

export const loadExchangeRange = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>(
  "exchange/loadRange",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getExchangeRange(15); // ✅ 10년치 한 번만 로드
      return data;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? "Failed to fetch exchange range");
    }
  }
);

interface ExchangeState {
  latest: any | null;
  range: any[];             // ✅ 추가됨: 전체 10년 데이터
  loading: boolean;
  error?: string;
}

const initialState: ExchangeState = {
  latest: null,
  range: [],
  loading: false,
  error: undefined,
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    selectLatestExchange(state, action: PayloadAction<ExchangeRate | null>) {
      state.latest = action.payload;
    },
  },
  extraReducers: (builder) => {
    /* ── 최신 환율 ── */
    builder
      .addCase(loadLatestExchange.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loadLatestExchange.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.latest = action.payload;
      })
      .addCase(loadLatestExchange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* ── 10년치 환율 ── */
    builder
      .addCase(loadExchangeRange.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadExchangeRange.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.range = action.payload;
      })
      .addCase(loadExchangeRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectLatestExchange = (state: RootState) => state.exchange.latest;
export const selectExchangeRange = (state: RootState) => state.exchange.range;
export const selectExchangeLoading = (state: RootState) => state.exchange.loading;

export default exchangeSlice.reducer;
