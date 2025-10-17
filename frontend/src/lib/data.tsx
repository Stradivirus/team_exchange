import React from "react";
import type { Row, TableColumn } from "../components/CommodityTableCard";

// 형식
type Renderer<T> = (value: any, row: T, index: number) => React.ReactNode;

// 포맷터 (이미 있으면 주석 처리)
const nf = new Intl.NumberFormat("en-US");
const pf = (v: number) => `${(v >= 0 ? "+" : "")}${v.toFixed(2)}%`;

// ---- 공통 renderer 팩토리 ----
export const R = {
  name: (cls = "name"): Renderer<any> =>
    (value) => <span className={cls}>{value}</span>,

  badge: (cls = "badge"): Renderer<any> =>
    (value) => <span className={cls}>{value}</span>,

  number: (fmt: Intl.NumberFormat = nf): Renderer<any> =>
    (value) => fmt.format(value),

  delta: (fmt: Intl.NumberFormat = nf): Renderer<Row> =>
    (value) => {
      const dir = value > 0 ? "up" : value < 0 ? "down" : "flat";
      return (
        <span className={`delta ${dir}`} aria-label={`전일비 ${value}`}>
          <i aria-hidden="true" />
          <span>{fmt.format(Math.abs(value))}</span>
        </span>
      );
    },

  rate: (percentFmt: (v: number) => string = pf): Renderer<Row> =>
    (value, row) => {
      const dir = row.diff > 0 ? "up" : row.diff < 0 ? "down" : "flat";
      return (
        <span className={`rate ${dir}`} aria-label={`등락률 ${percentFmt(value)}`}>
          <i aria-hidden="true" />
          <span>{percentFmt(value)}</span>
        </span>
      );
    },
};

// ---- className/column 유틸 ----
export const cls = {
  num: "num",
  unit: "unit",
  date: "date",
  ex: "ex",
};

export const col = <T,>(
  key: keyof T | string,
  header: string,
  opts: Omit<TableColumn<T>, "key" | "header"> = {}
): TableColumn<T> => ({ key, header, ...opts });

export const numCol = <T,>(
  key: keyof T | string,
  header: string,
  render?: TableColumn<T>["render"]
): TableColumn<T> =>
  col<T>(key, header, { className: cls.num, align: "right", render });
