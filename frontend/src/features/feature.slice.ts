// src/features/exchange/exchange.slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { getExchange } from "../api/data";
import type { ExchangeRate } from "./exchange.types";
import { loadLatestExchange } from "./exchange.slice";

export const loadLatesFeatures = createAsyncThunk<
    any,          // 성공했을 때 payload 타입
    void,         // 인자가 필요 없음
    { rejectValue: string }
>("exchange/loadFeature", async (_, { rejectWithValue }) => {
    try {
        const data = await getExchange()
        return data
    } catch (e: any) {
        return rejectWithValue(e?.message ?? "Failed to fetch Features")
    }
})

interface ExchangeState {
    latest: any | null
    loading: boolean
    error?: string
}

const initialState: ExchangeState = {
    latest: null,
    loading: false,
    error: undefined,
}

const exchangeSlice = createSlice({
    name: "exchange",
    initialState,
    reducers: {
        selectLatestExchange(state, action: PayloadAction<ExchangeRate | null>) {
            state.latest = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadLatestExchange.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(loadLatestExchange.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.latest = action.payload
            })
            .addCase(loadLatestExchange.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const selectLatestExchange = (state: RootState) => state.exchange.latest
export const selectExchangeLoading = (state: RootState) => state.exchange.loading

export default exchangeSlice.reducer;
