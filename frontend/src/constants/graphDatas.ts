import type { InsightsDatas } from "../layout/VisualDetail";
import type { Graph_Option } from "../types/option";

export const DashboardGraphs: Graph_Option[] = [
    { value: "usdkrw", label: "USD/KRW", src: "/hong/expimp/expimp_correlation_bar.html" },
    { value: "eurkrw", label: "EUR/KRW", src: "/charts/eurkrw.html" },
    { value: "cnykrw", label: "CNY/KRW", src: "/charts/cnykrw.html" },
    { value: "jpykrw", label: "JPY/KRW", src: "/charts/jpykrw.html" },
]

export const SandPGraphs: Graph_Option[] = [
    { value: "s&p500", label: "S&P500", src: "/gu/usd_krw/usdkrw_sp500_relationship.html" }
];

export const SandPDatas: InsightsDatas = {
    menus: ["Comment", "투자자 Action Point"],
    contents: [
        [
            { type: "Comment", icon: "🚢", title: "미국 증시와 환율, 이제는 같은 배를 탔다!", description: "" }
        ],
        [
            { type: "투자자 Action Point", icon: "💱", title: "환노출 vs 환헷지 선택", description: "환율 상승이 예상되면 '환노출' 상품으로 환차익을, 환율 하락이 예상되면 '환헷지' 상품으로 안정성을 추구해 보세요." },
            { type: "투자자 Action Point", icon: "💸", title: "'킹달러' 현상 이해하기", description: "미국의 강한 경제와 높은 금리가 달러 가치를 끌어올려, 증시가 좋아도 환율이 함께 오르는 주된 원인입니다." }
        ]
    ]
}

export const OilGraphs: Graph_Option[] = [
    { value: "oil", label: "Oil", src: "/gu/usd_krw/usdkrw_oil_relationship.html" }
];

export const OilDatas: InsightsDatas = {
    menus: ["Comment", "투자자 Action Point"],
    contents: [
        [
            { type: "Comment", icon: "🛢️", title: "기름값이 오르면, 달러 값도 따라 오른다!", description: "대한민국은 원유 수입 의존도가 높아, 유가 상승 시 달러 수요가 늘면서 환율도 함께 오르는 경향이 있습니다." }
        ],
        [
            { type: "투자자 Action Point", icon: "💲", title: "생활 물가 바로미터", description: "유가 상승은 주유비, 공공요금 인상으로 이어져 가계 부담을 키우는 첫 신호입니다." },
            { type: "투자자 Action Point", icon: "🧑‍💼", title: "국내 증시와의 관계", description: "고유가는 기업의 생산 비용을 증가시켜, 국내 증시(KOSPI)에는 부담으로 작용할 수 있습니다." }
        ]
    ]
};

export const IEGraphs: Graph_Option[] = [
    { value: "import/export", label: "Import/Export", src: "/hong/expimp/expimp_predictions.html" }
];

export const IEDatas: InsightsDatas = {
    menus: ["Comment"],
    contents: [
        [
            { type: "Comment", icon: "🔼", title: "USD (높은 상관성)", description: "물가 상승 시 USD 환율도 상승" },
            { type: "Comment", icon: "🆖", title: "EUR (낮은 상관성)", description: "상관성 활용 실패" },
            { type: "Comment", icon: "🔽", title: "JPY (부분 상관성)", description: "물가 상승 시 JPY는 하락" },
            { type: "Comment", icon: "🔼", title: "CNY (높은 상관성)", description: "물가지수와 CNY 환율이 거의 동일한 패턴" },
        ]
    ]
};

export const InterestRateGraphs: Graph_Option[] = [
    { value: "interest", label: "Interest", src: "/hong/interest/currency_rate.html" }
];

export const InterestRateDatas: InsightsDatas = {
    menus: ["Comment"],
    contents: [
        [
            { type: "Comment", icon: "🔼", title: "양(+)의 상관관계", description: `USD (0.776), EUR (0.605), CNY (0.615)\n한국 금리가 오르면 원화 대비 상대 통화들이 강세` },
            { type: "Comment", icon: "🔽", title: "음(-)의 상관관계", description: `JPY (-0.808)\n한국 금리와 엔화는 반대 방향으로 움직임` },
        ]
    ]
};

export const GoldGraphs: Graph_Option[] = [
    { value: "gold_LSTM", label: "gold_LSTM", src: "/kim/gold/predictions_timeline.html" },
    { value: "gold_timeseries", label: "gold_timeseries", src: "/gold_timeseries_visualization.png", useBase: false }
];

export const GoldDatas: InsightsDatas = {
    menus: ["Comment", "투자자 Action Point", "Model"],
    contents: [
        [
            { type: "Comment", icon: "🥇", title: "달러가 오르면, 금도 오른다!", description: "경제 불확실성이 커질수록 투자자들은 금과 달러 같은 안전자산으로 동시에 몰린다는 패턴이 확인됩니다." },
        ],
        [
            { type: "투자자 Action Point", icon: "☢️", title: "위기 국면 주의", description: "환율 급등(달러 강세) 시, 금값도 함께 오르는 경향이 뚜렷합니다." },
            { type: "투자자 Action Point", icon: "🛟", title: "안전자산 분산 투자", description: "금과 달러는 동조화되는 안전자산이므로, 위험자산 하락기에 방어 포트폴리오로 고려할 만합니다." },
            { type: "투자자 Action Point", icon: "🥈", title: "은(Silver)과 차별화", description: "은은 금에 비해 환율과의 상관성이 낮아, 단기 방어자산보다는 산업 수요 중심 자산으로 분류됩니다." },

        ],
        [
            {
                type: "Model", 
                icon: "🤖",
                title: "LSTM, 금값의 흐름을 가장 정확하게 읽어낸 예측 모델!",
                description: `
                    비선형적·시간 의존적 패턴을 학습해 시장 급변 구간에서도 안정적인 예측력을 보여줍니다. \n 
                    - 예측 신뢰도 확보: 금 가격 예측의 86%를 설명하며, 단기 시장 변동에도 흔들리지 않는 안정적 모델입니다. \n
                    - 리스크 관리 활용: 금·환율 변동 시점 예측에 적용 가능해 포트폴리오 헤지 전략 수립에 유용합니다.
                `
            },

        ]
    ]
};

export const NewsGraphs: Graph_Option[] = [
    { value: "Correlation", label: "Correlation", src: "/newssentiment.png", useBase: false },
];

export const NewsDatas: InsightsDatas = {
    menus: ["Comment", "투자자 Action Point"],
    contents: [
        [
            { type: "Comment", icon: "📰", title: "뉴스 분위기(심리)는 환율에 직접적인 영향을 주지 않는다.", description: "시장 심리가 부정적으로 변해도 환율 변동과의 직접적 상관관계는 매우 약한 수준입니다." },
        ],
        [
            { type: "투자자 Action Point", icon: "⏸️", title: "단기 뉴스 영향 제한적", description: "뉴스심리지수는 USD/KRW와도 약한 음의 상관(0.18)에 불과해, 단기 환율 변동 예측엔 한계가 있습니다." },
            { type: "투자자 Action Point", icon: "▶️", title: "거시지표 중심 접근", description: "환율은 심리보다 금리, 무역수지, 경기전망 등 실물 요인에 더 큰 영향을 받습니다." },
            { type: "투자자 Action Point", icon: "❤️‍🔥", title: "심리 분석의 보조 활용", description: "뉴스 데이터는 시장 방향성 탐지의 참고지표로만 활용하는 것이 적절합니다." },

        ],
    ]
};