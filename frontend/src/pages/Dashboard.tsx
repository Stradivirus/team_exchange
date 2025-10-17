import styles from "../styles/Dashboard.module.scss";
import Header from "../layout/Header";
import { useMemo, useState } from "react";
import CurrencyCalculator from "../components/CurrencyCalc";
import CommodityTableCard from "../components/CommodityTableCard";
import { useAppSelector } from "../app/hook";
import { selectExchangeLoading, selectLatestExchange } from "../features/exchange.slice"
import ExchangeChart from "../layout/ExchangeChart";
import ChartCarousel from "../layout/ChartCarousel";
import HtmlFrame from "../components/HtmlFrame";
import Select from "../components/Select";
import { DASHBOARD_OPTIONS } from "../constants/options";

interface Props {
    className?: string;
}

export default function DashboardPage(props: Props) {
    const { className } = props;
    const latest = useAppSelector(selectLatestExchange);
    const loading = useAppSelector(selectExchangeLoading);
    const [selectedOption, setSelectedOption] = useState(DASHBOARD_OPTIONS[0].value);
    const [isPaused, setIsPaused] = useState(false);

    const getSelectedIndex = () => {
        return DASHBOARD_OPTIONS.findIndex(opt => opt.value === selectedOption);
    };


    const handleSelectChange = (value: string) => {
        setSelectedOption(value);
        setIsPaused(true);
    };


    const headers = [{ key: "currency", header: "통화" }, { key: "exchange_rate", header: "현재 환율", className: "num" }];
    const rows = useMemo(() => {
        if (!latest) return [];
        return [
            { currency: "CNY", exchange_rate: latest.cny },
            { currency: "EUR", exchange_rate: latest.eur },
            { currency: "JPY", exchange_rate: latest.jpy },
            { currency: "USD", exchange_rate: latest.usd },
        ];
    }, [latest]);

    return (
        <div className={`${styles.page} ${className}`}>

            <Header />

            {/* 본문 컨텐츠 두 컬럼 */}
            <p>{loading}</p>
            <main className={styles.content}>
                <section className={styles.left}>
                    {/* 좌측: 차트/통계 영역 */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>Statistics</h2>
                            <Select
                                options={DASHBOARD_OPTIONS}
                                value={selectedOption}
                                onChange={handleSelectChange}
                            />
                        </div>

                        {/* 차트 영역(placeholder) */}
                        <div className={styles.chartArea}>
                            <ChartCarousel
                                intervalMs={8000}
                                initialIndex={isPaused ? getSelectedIndex() : 0}
                                loop
                                paused={isPaused} // ✅ 추가
                                key={isPaused ? selectedOption : "auto"}
                            >
                                <div className={styles.chartWrapper}>
                                    <ExchangeChart />
                                </div>
                                <div className={styles.chartWrapper}>
                                    <HtmlFrame src={"/hong/currency/allcurrencies_predictions.html"} />
                                </div>
                            </ChartCarousel>


                        </div>
                    </div>
                </section>

                <aside className={styles.right}>
                    {/* 우측: 컨트롤/리스트 패널 */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3>환율계산기</h3>
                        </div>

                        <div className={styles.controls}>
                            <CurrencyCalculator />
                        </div>

                        <div className={styles.cardBody}>
                            <CommodityTableCard
                                title="환율 정보"
                                rows={rows}
                                columns={headers}
                            />
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
