import styles from "../styles/Dashboard.module.scss";
import visStyles from "../styles/Visualization.module.scss";
import Header from "../layout/Header";
import HtmlFrame from "../components/HtmlFrame";

interface Props {
    className?: string;
}

export default function VisualizationBoardPage(props: Props) {
    const { className } = props;


    return (
        <div className={`${styles.page} ${className}`}>

            <Header title="Visualization" />

            {/* 본문 컨텐츠 두 컬럼 */}
            <main className={`${styles.content} ${visStyles.content}`}>
                <section className={styles.left}>
                    {/* 좌측: 차트/통계 영역 */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>Statistics</h2>
                        </div>

                        {/* 탭 */}
                        {/* <ToggleGroup /> */}

                        {/* 차트 영역(placeholder) */}
                        <div className={styles.chartArea}>
                            <div className={styles.chartWrapper}>
                                <HtmlFrame src={"/hong/currency/allcurrencies_predictions1.html"} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}