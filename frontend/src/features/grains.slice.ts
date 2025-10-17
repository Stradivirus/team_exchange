// src/features/exchange/exchange.slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { getGrains, getGrainsStrictThenRelaxed } from "../api/data";
import type { Row } from "../components/CommodityTableCard";

export const loadLatestGrains = createAsyncThunk<
    any,          // 성공했을 때 payload 타입
    void,         // 인자가 필요 없음
    { rejectValue: string }
>("grains/loadLatest", async (_, { rejectWithValue }) => {
    try {
        const data = await getGrains()
        return data
    } catch (e: any) {
        return rejectWithValue(e?.message ?? "Failed to fetch latest exchange")
    }
})

export const loadNLatestGrains = createAsyncThunk<
    any,                       // 성공 payload 타입
    number | undefined,        // 개수 인자
    { rejectValue: string }
>("grains/loadNLatest", async (countArg, { rejectWithValue }) => {
    try {
        const count =
            Number.isFinite(countArg) && (countArg as number) > 0
                ? (countArg as number)
                : 2; // 기본값

        const data = await getGrainsStrictThenRelaxed(count);

        setRaw(data);                         // ← slice에 원본 저장

        const rows = toCommodityRows(data, META); // ← 가공
        return rows;
    } catch (e: any) {
        return rejectWithValue(e?.message ?? "Failed to fetch latest grains");
    }
});

const META: Record<'corn' | 'wheat' | 'rice' | 'coffee' | 'sugar',
    { name: string; unit: string; exchange: string }> = {
    corn: { name: "옥수수", unit: "센트/부셀", exchange: "CBOT" },
    wheat: { name: "소맥", unit: "센트/부셀", exchange: "CBOT" },
    rice: { name: "쌀", unit: "달러/cwt", exchange: "CBOT" },
    coffee: { name: "커피", unit: "센트/파운드", exchange: "ICE" },
    sugar: { name: "설탕", unit: "센트/파운드", exchange: "ICE" },
};

export function toCommodityRows(
    data: Array<{ date: string;[k: string]: any }>,
    meta: Record<string, { name: string; unit: string; exchange: string }>
): Row[] {
    if (!Array.isArray(data) || data.length === 0) return [];

    // 최신/직전
    const sorted = [...data].sort((a, b) => (a.date < b.date ? 1 : -1));
    const latest = sorted[0];
    const prev = sorted[1] ?? null;

    // 월물: 최신 날짜 기준 YY-MM
    const ld = new Date(latest.date);
    const defaultMonth =
        `${String(ld.getFullYear() % 100).padStart(2, "0")}-${String(ld.getMonth() + 1).padStart(2, "0")}`;

    // 기준일: YYYY.MM.DD
    const baseDate =
        `${ld.getFullYear()}.` +
        `${String(ld.getMonth() + 1).padStart(2, "0")}.` +
        `${String(ld.getDate()).padStart(2, "0")}`;

    // order: meta 선언(삽입) 순서 유지
    const order = Object.keys(meta); // 문자열 키면 JS가 삽입 순서 보장

    return order.map((k) => {
        const price = Number(latest[k] ?? 0);
        const prevPrice = prev ? Number(prev[k] ?? 0) : 0;
        const diff = prev ? price - prevPrice : 0;
        const rate = prev && prevPrice !== 0 ? (diff / prevPrice) * 100 : 0;

        const m = meta[k];
        return {
            name: m.name,
            month: defaultMonth,      // ← 최신 날짜에서 생성
            unit: m.unit,
            price,
            diff,
            rate,
            baseDate,
            exchange: m.exchange,
        };
    });
}

type GrainsState = {
    raw: any[];   // ← 원본 저장
    rows: Row[];        // ← 테이블용 가공 데이터
    loading: boolean;
    error: any;
};

const initialState: GrainsState = {
    raw: [],
    rows: [],
    loading: false,
    error: null,
};

const grainsSlice = createSlice({
    name: "grains",
    initialState,
    reducers: {
        setRaw(state, action: PayloadAction<any[]>) {
            state.raw = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadNLatestGrains.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(loadNLatestGrains.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.rows = action.payload
            })
            .addCase(loadNLatestGrains.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const selectGrainsRaw  = (s: RootState) => s.grains.raw;
export const selectGrainsRows = (s: RootState) => s.grains.rows;
export const selectGrainsLoading = (s: RootState) => s.grains.loading;
export const selectGrainsError   = (s: RootState) => s.grains.error;

export const { setRaw } = grainsSlice.actions;
export default grainsSlice.reducer;
