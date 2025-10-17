import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  loadExchangeRange,
  selectExchangeRange,
  selectExchangeLoading,
} from "../features/exchange.slice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import styles from "../styles/ExchangeChart.module.scss";

export default function ExchangeChart() {
  const dispatch = useAppDispatch();
  const allData = useAppSelector(selectExchangeRange);
  const loading = useAppSelector(selectExchangeLoading);
  const [period, setPeriod] = useState("10Y");
  const [zoomRange, setZoomRange] = useState<[number, number] | null>(null);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [activeKeys, setActiveKeys] = useState<string[]>(["USD", "EUR", "JPY", "CNY"]);

  useEffect(() => {
    dispatch(loadExchangeRange());
  }, [dispatch]);

  const filteredData = useMemo(() => {
    if (!allData || allData.length === 0) return [];
    const total = allData.length;
    const yearMap: Record<string, number> = { "1Y": 1, "5Y": 5, "10Y": 10, MAX: 15 };
    const years = yearMap[period];
    const sliceSize = Math.floor((years / 15) * total);
    const baseData = allData.slice(-sliceSize);
    if (zoomRange) {
      const [start, end] = zoomRange;
      return baseData.slice(start, end);
    }
    return baseData;
  }, [allData, period, zoomRange]);

  const handleLegendClick = (o: any) => {
    const { value } = o;
    setActiveKeys((prev) => {
      if (prev.length === 1 && prev.includes(value)) {
        return ["USD", "EUR", "JPY", "CNY"];
      }
      if (prev.length !== 1 || !prev.includes(value)) {
        return [value];
      }
      return prev;
    });
  };

  const handleMouseDown = (e: any) => {
    if (!e || e.activeTooltipIndex === undefined) return;
    setDragStart(e.activeTooltipIndex);
  };

  const handleMouseUp = (e: any) => {
    if (dragStart === null || e.activeTooltipIndex === undefined) return;

    const end = e.activeTooltipIndex;
    const distance = Math.abs(end - dragStart);

    if (distance > 5) {
      const start = Math.min(dragStart, end);
      const stop = Math.max(dragStart, end);
      setZoomRange([start, stop]);
    }

    setDragStart(null);
  };

  const resetZoom = () => setZoomRange(null);

  if (loading) {
    return <div className={styles.loading}>📡 환율 데이터 불러오는 중...</div>;
  }

  return (
    <div className={styles.chartContainer} onDoubleClick={resetZoom}>
      <div className={styles.header}>
        <h3 className={styles.title}>환율 추이 ({period})</h3>
        <div className={styles.periodButtons}>
          {["1Y", "5Y", "10Y", "MAX"].map((label) => (
            <button
              key={label}
              onClick={() => {
                setPeriod(label);
                setZoomRange(null);
              }}
              className={`${styles.periodButton} ${
                period === label ? styles.active : ""
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={filteredData}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend onClick={handleLegendClick} />
          <Brush dataKey="date" height={20} stroke="#8884d8" />

          {activeKeys.includes("USD") && (
            <Line type="monotone" dataKey="usd" stroke="#1976d2" dot={false} name="USD" />
          )}
          {activeKeys.includes("EUR") && (
            <Line type="monotone" dataKey="eur" stroke="#ef6c00" dot={false} name="EUR" />
          )}
          {activeKeys.includes("JPY") && (
            <Line type="monotone" dataKey="jpy" stroke="#8e24aa" dot={false} name="JPY" />
          )}
          {activeKeys.includes("CNY") && (
            <Line type="monotone" dataKey="cny" stroke="#43a047" dot={false} name="CNY" />
          )}
        </LineChart>
      </ResponsiveContainer>

      {zoomRange && (
        <p className={styles.zoomHint}>
          🔍 확대 보기 중 — 더블클릭하면 전체로 복귀합니다.
        </p>
      )}
    </div>
  );
}