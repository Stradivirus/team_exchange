import HtmlFrame from "../components/HtmlFrame";
import styles from "../styles/Dashboard.module.scss";
import dataStyles from "../styles/DataBoard.module.scss";
import Header from "../layout/Header";
import {
  CommoditiesColumns,
  ExportImportColumns,
  grainColumns,
  SentimentColumns,
} from "../constants/sampleDatas";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { loadNLatestGrains, selectGrainsRows } from "../features/grains.slice";
import { loadNLatestCommodities, selectCommoditiesRows } from "../features/commodities.slice";
import { loadNLatestStock, selectStockRows } from "../features/stock.slice";
import { loadNLatestNonNullSentiment, selectSentimentRows } from "../features/sentiment.slice";
import { loadNLatestExportImport, selectExportImportRows } from "../features/exportImport.slice";
import CommodityTableCard, { type Row, type TableColumn } from "../components/CommodityTableCard";

interface Props {
  className?: string;
}

export default function DataBoardPage({ className }: Props) {
  const dispatch = useAppDispatch();

  // ✅ Redux store selectors
  const grainRows = useAppSelector(selectGrainsRows);
  const commoditiesRows = useAppSelector(selectCommoditiesRows);
  const stockRows = useAppSelector(selectStockRows);
  const sentimentRows = useAppSelector(selectSentimentRows);
  const exportImportRows = useAppSelector(selectExportImportRows);

  // ✅ 데이터 로드
  useEffect(() => {
    dispatch(loadNLatestGrains());
    dispatch(loadNLatestCommodities());
    dispatch(loadNLatestStock());
    dispatch(loadNLatestNonNullSentiment());
    dispatch(loadNLatestExportImport());
  }, [dispatch]);

  // ✅ 데이터 섹션들
  const sections: {
    key: string;
    title: string;
    rows: Row[];
    columns: TableColumn<Row>[];
  }[] = [
      {
        key: "grains",
        title: "Grains",
        rows: grainRows as Row[],
        columns: grainColumns as TableColumn<Row>[],
      },
      {
        key: "commodities",
        title: "Commodities",
        rows: commoditiesRows as Row[],
        columns: CommoditiesColumns as TableColumn<Row>[],
      },
      {
        key: "stock",
        title: "Stock",
        rows: stockRows as Row[],
        columns: CommoditiesColumns as TableColumn<Row>[],
      },
      {
        key: "sentiment",
        title: "Sentiment",
        rows: sentimentRows as unknown as Row[],
        columns: SentimentColumns as TableColumn<Row>[],
      },
      {
        key: "exportImport",
        title: "Export Import Index",
        rows: exportImportRows as Row[],
        columns: ExportImportColumns as TableColumn<Row>[],
      },
    ];

  return (
    <div className={`${styles.page} ${className}`}>
      <Header title="DataSets" />

      <main className={`${styles.content} ${dataStyles.unifiedLayout}`}>
        <div className={`${styles.card} ${dataStyles.card}`}>
          <div className={styles.cardHeader}>
            <h2>Datas & Graphs</h2>
          </div>

          <div className={dataStyles.chartArea}>
            <div className={dataStyles.fakeChart}>
              <HtmlFrame className="heatmap" src="/hong/currency/correlation_heatmap_basic.html" />
            </div>
          </div>


          <div className={dataStyles.dataGrid}>
            {sections.map((section) => (
              <div className={dataStyles.dataRow} key={section.key}>
                <CommodityTableCard
                  title={section.title}
                  rows={section.rows}
                  columns={section.columns}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
