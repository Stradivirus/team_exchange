import type { Row, TableColumn } from "../components/CommodityTableCard";
import { cls, col, numCol, R } from "../lib/data";

export const rows: Row[] = [
  { name:"옥수수", month:"25-12", unit:"센트/부셀", price:417.00, diff:-2.75, rate:-0.66, baseDate:"2025.09.10", exchange:"CBOT" },
  { name:"설탕",   month:"25-10", unit:"센트/파운드", price:15.93, diff:0.09, rate:0.57, baseDate:"2025.09.10", exchange:"ICE" },
  { name:"대두",   month:"25-11", unit:"센트/부셀", price:1025.25, diff:-6.00, rate:-0.57, baseDate:"2025.09.10", exchange:"CBOT" },
  { name:"대두박", month:"25-10", unit:"달러/쇼튼", price:285.80, diff:-3.20, rate:-1.11, baseDate:"2025.09.10", exchange:"CBOT" },
  { name:"대두유", month:"25-12", unit:"센트/파운드", price:51.01, diff:0.53, rate:1.05, baseDate:"2025.09.10", exchange:"CBOT" },
  { name:"면화",   month:"25-12", unit:"센트/파운드", price:66.67, diff:0.21, rate:0.32, baseDate:"2025.09.10", exchange:"ICE" },
  { name:"소맥",   month:"25-12", unit:"센트/부셀", price:515.00, diff:-5.25, rate:-1.01, baseDate:"2025.09.10", exchange:"CBOT" },
  { name:"쌀",     month:"25-11", unit:"달러/cwt",  price:11.61, diff:-0.04, rate:-0.30, baseDate:"2025.09.10", exchange:"CBOT" },
  { name:"오렌지주스", month:"25-11", unit:"센트/파운드", price:254.30, diff:4.35, rate:1.74, baseDate:"2025.09.10", exchange:"ICE" },
  { name:"커피",   month:"25-12", unit:"센트/파운드", price:386.90, diff:5.10, rate:1.34, baseDate:"2025.09.10", exchange:"ICE" },
  { name:"코코아", month:"25-12", unit:"달러/톤", price:7468.00, diff:73.00, rate:0.99, baseDate:"2025.09.10", exchange:"ICE" },
];

export const defaultColumns: TableColumn<Row>[] = [
  col<Row>("name",     "상품명", { render: R.name() }),
  col<Row>("month",    "월물",   { render: R.badge() }),
  col<Row>("unit",     "단위",   { className: cls.unit }),
  numCol<Row>("price", "현재가", R.number()),
  numCol<Row>("diff",  "전일비", R.delta()),
  numCol<Row>("rate",  "등락률", R.rate()),
  col<Row>("baseDate", "기준일", { className: cls.date }),
  col<Row>("exchange", "거래소", { className: cls.ex }),
];

export const grainColumns: TableColumn<Row>[] = [
  col<Row>("name",     "상품명", { render: R.name() }),
  col<Row>("month",    "월물",   { render: R.badge() }),
  col<Row>("unit",     "단위",   { className: cls.unit }),
  numCol<Row>("price", "현재가", R.number()),
  numCol<Row>("diff",  "전일비", R.delta()),
  numCol<Row>("rate",  "등락률", R.rate()),
  col<Row>("baseDate", "기준일", { className: cls.date }),
];

export const CommoditiesColumns: TableColumn<Row>[] = [
  col<Row>("name",     "상품명", { render: R.name() }),
  col<Row>("month",    "월물",   { render: R.badge() }),
  col<Row>("unit",     "단위",   { className: cls.unit }),
  numCol<Row>("price", "현재가", R.number()),
  numCol<Row>("diff",  "전일비", R.delta()),
  numCol<Row>("rate",  "등락률", R.rate()),
  col<Row>("baseDate", "기준일", { className: cls.date }),
];

export interface SentimentRow {
  date: string;
  value: number;
  itemName: string;
  statCode: string;
  itemCode: string;
}

export const SentimentColumns: TableColumn<Row>[] = [
  col<Row>("name", "지표명", { render: R.name() }),
  col<Row>("exchange", "코드", { className: cls.unit }),
  numCol<Row>("price", "지수값", R.number()),     // 최신 지수값
  numCol<Row>("diff", "전일비", R.delta()),        // 전일 대비
  numCol<Row>("rate", "등락률", R.rate()),        // 등락률 (%)
  col<Row>("baseDate", "기준일", { className: cls.date }),
];

export const ExportImportColumns: TableColumn<Row>[] = [
  col<Row>("name", "지표명", { render: R.name() }),        
  col<Row>("code", "구분", { render: R.badge() }),        
  numCol<Row>("price", "지수값", R.number()),             
  col<Row>("unit", "단위", { className: cls.unit }),     
  col<Row>("baseDate", "기준일", { className: cls.date }), 
];