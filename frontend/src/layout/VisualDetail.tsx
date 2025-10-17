import styles from "../styles/Dashboard.module.scss";
import Header from "./Header";
import Select from "../components/Select";
import ChartCarousel from "./ChartCarousel";
import { useState } from "react";
import type { Graph_Option } from "../types/option";
import HtmlFrame from "../components/HtmlFrame";
import InsightCard, { type InsightItem } from "./InsightCard";

export interface InsightsDatas {
    menus: string[],
    contents: InsightItem[][]
}

interface Props {
    className?: string;
    graph: Graph_Option[];
    datas: InsightsDatas
}

export default function VisualizationDetailPage(props: Props) {
    const { className, graph, datas } = props;
    const [selectedOption, setSelectedOption] = useState(graph[0].value);
    const [isPaused, setIsPaused] = useState(false);

    const getSelectedIndex = () => {
        return graph.findIndex(opt => opt.value === selectedOption);
    };

    const handleSelectChange = (value: string) => {
        setSelectedOption(value);
        setIsPaused(true);

        // 10초 후 다시 자동 회전
        setTimeout(() => {
            setIsPaused(false);
        }, 10000);
    };

    return (
        <div className={`${styles.page} ${className}`}>

            <Header title="Visualization" />

            {/* 본문 컨텐츠 두 컬럼 */}
            <main className={styles.content}>
                <section className={styles.left}>
                    {/* 좌측: 차트/통계 영역 */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>Statistics</h2>
                            <Select
                                options={graph}
                                value={selectedOption}
                                onChange={handleSelectChange}
                            />
                        </div>

                        {/* 탭 */}
                        {/* <ToggleGroup /> */}

                        {/* 차트 영역(placeholder) */}
                        <div className={styles.chartArea}>
                            <ChartCarousel key={isPaused ? selectedOption : 'auto'} intervalMs={isPaused ? 0 : 3000} initialIndex={isPaused ? getSelectedIndex() : 0}>
                                {graph.map((option, index) => (
                                    <div key={index} className={styles.fakeChart}>
                                        <HtmlFrame src={option.src} useBase={option.useBase} />
                                    </div>
                                ))}
                            </ChartCarousel>
                        </div>
                    </div>
                </section>

                <aside className={styles.right}>
                    {/* 우측: 컨트롤/리스트 패널 */}
                    <div className={styles.card}>
                        <InsightCard 
                            tabMenus={datas.menus}
                            menuContents={datas.contents}
                        />
                        {/* <div className={styles.cardHeader}>
                            <h3>Insight</h3>
                        </div> */}

                        {/* <div className={styles.cardBody}>
                            <div className={styles.folderTabs}>
                                {Object.keys(datas).map(tab => (
                                    <button
                                        key={tab}
                                        className={activeTab === tab ? styles.folderTabActive : styles.folderTab}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className={styles.tabContent}>
                                <ul className={styles.list}>
                                    {datas[activeTab]?.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                        </div> */}
                    </div>
                </aside>
            </main>
        </div>
    );
}
