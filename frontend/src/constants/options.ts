import type { Option } from "../types/option";

export const CURRENCY_OPTIONS: Option[] = [
    { value: "usd", label: "USD" },
    { value: "cny", label: "CNY" },
    { value: "eur", label: "EUR" },
    { value: "jpy", label: "JPY" },
]

export const GRAPH_OPTIONS: Option[] = [
    { value: "sp500", label: "S&P 500" },
    { value: "nasdaq", label: "NASDAQ" },
    { value: "kospi", label: "KOSPI" }
]

export const DASHBOARD_OPTIONS: Option[] = [
    { value: "currency", label: "Currency" },
    { value: "prediction", label: "Prediction" }
]

