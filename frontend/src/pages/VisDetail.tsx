import { GoldDatas, GoldGraphs, IEDatas, IEGraphs, InterestRateDatas, InterestRateGraphs, NewsDatas, NewsGraphs, OilDatas, OilGraphs, SandPDatas, SandPGraphs } from "../constants/graphDatas";
import VisualizationDetailPage from "../layout/VisualDetail";

interface Props {
  className?: string;
}

function SandP500(props: Props) {
  const { className } = props;

  return (
    <div>
        <VisualizationDetailPage className={className} graph={SandPGraphs} datas={SandPDatas} />
    </div>
  );
}

function Oil(props: Props) {
  const { className } = props;

  return (
    <div>
        <VisualizationDetailPage className={className} graph={OilGraphs} datas={OilDatas} />
    </div>
  );
}

function IEPriceIndex(props: Props) {
  const { className } = props;

  return (
    <div>
        <VisualizationDetailPage className={className} graph={IEGraphs} datas={IEDatas} />
    </div>
  );
}

function InterestRate(props: Props) {
  const { className } = props;

  return (
    <div>
        <VisualizationDetailPage className={className} graph={InterestRateGraphs} datas={InterestRateDatas} />
    </div>
  );
}

function Gold(props: Props) {
  const { className } = props;

  return (
    <div>
        <VisualizationDetailPage className={className} graph={GoldGraphs} datas={GoldDatas} />
    </div>
  );
}

function NewsSentiment(props: Props) {
  const { className } = props;

  return (
    <div>
        <VisualizationDetailPage className={className} graph={NewsGraphs} datas={NewsDatas} />
    </div>
  );
}

export { SandP500 as SAndP500, Oil, InterestRate, IEPriceIndex, Gold, NewsSentiment }
