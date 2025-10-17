import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { getExportImportPriceIndexLatestN } from "../api/data";
import type { Row } from "../components/CommodityTableCard";

type ExportImportState = {
  raw: any[];
  rows: Row[];
  loading: boolean;
  error: any;
};

const initialState: ExportImportState = {
  raw: [],
  rows: [],
  loading: false,
  error: null,
};

export const loadNLatestExportImport = createAsyncThunk<
  Row[],                       // 성공 payload
  number | undefined,          // 인자 타입
  { rejectValue: string; state: RootState }
>("exportImport/loadNLatest", async (countArg, { rejectWithValue, dispatch }) => {
  try {
    const count =
      Number.isFinite(countArg) && (countArg as number) > 0 ? (countArg as number) : 3;

    const data = await getExportImportPriceIndexLatestN(count);
    dispatch(setRaw(data)); // 원본 저장

    const rows = toExportImportRows(data);
    dispatch(setRows(rows));

    return rows;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? "Failed to fetch export/import price index");
  }
});

export function toExportImportRows(data: any[]): Row[] {
  if (!Array.isArray(data) || data.length === 0) return [];

  // 타입별로 나눔 (import / export)
  const importData = data.filter((d) => d.type === "import");
  const exportData = data.filter((d) => d.type === "export");

  // 날짜 내림차순 정렬
  const sortDesc = (a: any, b: any) =>
    new Date(a.date) < new Date(b.date) ? 1 : -1;

  const sortedImport = [...importData].sort(sortDesc);
  const sortedExport = [...exportData].sort(sortDesc);

  // 최신/직전
  const latestImport = sortedImport[0];
  const prevImport = sortedImport[1] ?? null;

  const latestExport = sortedExport[0];
  const prevExport = sortedExport[1] ?? null;

  // 날짜 포맷
  const fmt = (d: string | Date) => {
    const dt = new Date(d);
    return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, "0")}.${String(
      dt.getDate()
    ).padStart(2, "0")}`;
  };

  // 단일 아이템 → Row로 변환하는 헬퍼
  const toRow = (item: any, prev: any | null) => {
    const price = item?.value ? Number(item.value) : 0;
    const prevPrice = prev?.value ? Number(prev.value) : 0;
    const diff = prev ? price - prevPrice : 0;
    const rate = prev && prevPrice !== 0 ? (diff / prevPrice) * 100 : 0;

    return {
      name: item.indicatorName ?? item.indicator_name ?? "-",
      code: item.type ?? "-",
      price,
      diff,
      rate,
      unit: item.unitName ?? item.unit_name ?? "-",
      baseDate: fmt(item.date),
      month: "-",
      exchange: "-", // Row 타입 일관성 맞춤
    } as Row;
  };

  

  // 결과 합치기
  const rows: Row[] = [];
  if (latestImport) rows.push(toRow(latestImport, prevImport));
  if (latestExport) rows.push(toRow(latestExport, prevExport));

  return rows;
}

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


const exportImportSlice = createSlice({
  name: "exportImport",
  initialState,
  reducers: {
    setRaw(state, action: PayloadAction<any[]>) {
      state.raw = action.payload;
    },
    setRows(state, action: PayloadAction<Row[]>) {
      state.rows = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadNLatestExportImport.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loadNLatestExportImport.fulfilled, (state, action: PayloadAction<Row[]>) => {
        state.loading = false;
        state.rows = action.payload;
      })
      .addCase(loadNLatestExportImport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setRaw, setRows } = exportImportSlice.actions;

export const selectExportImportRaw = (s: RootState) => s.exportImport.raw;
export const selectExportImportRows = (s: RootState) => s.exportImport.rows;
export const selectExportImportLoading = (s: RootState) => s.exportImport.loading;
export const selectExportImportError = (s: RootState) => s.exportImport.error;

export default exportImportSlice.reducer;
