import React, { useState } from "react";
import "../styles/InsightCard.scss";

export interface InsightItem {
    type: string;
    icon: string;
    title: string;
    description: string;
}

interface Props {
    title?: string;
    tabMenus?: string[]
    menuContents?: InsightItem[][]
    className?: string;
}

const InsightCard: React.FC<Props> = ({
    title = "Insight",
    tabMenus = ["Comment", "투자자 Action Point"],
    menuContents = [],
    className = ""
}) => {
    const [activeTab, setActiveTab] = useState<string>(tabMenus[0]);
    console.log(activeTab)

    return (
        <div className={`card insightCard ${className}`} role="region" aria-label={title}>
            <div className="cardHeader">
                <h3>{title}</h3>
            </div>

            <div className="cardBody">
                <div className="tabs">
                    {tabMenus.map((menu => (
                        <button
                            className={`tab ${activeTab === menu ? 'active' : ''}`}
                            onClick={() => setActiveTab(menu)}
                        >
                            {menu}
                        </button>
                    )
                    ))}
                    {/* <button
                        className={`tab ${activeTab === 'comment' ? 'active' : ''}`}
                        onClick={() => setActiveTab('comment')}
                    >
                        Comment
                    </button>
                    <button
                        className={`tab ${activeTab === 'action' ? 'active' : ''}`}
                        onClick={() => setActiveTab('action')}
                    >
                        투자자 Action Point
                    </button> */}
                </div>

                {
                    tabMenus.map((menu, tabIndex) => (
                        <div
                            key={tabIndex}  
                            className={`insightContent ${activeTab === menu ? "active" : ""}`}
                        >
                            {menuContents[tabIndex]?.length === 0 ? (  
                                <div className="empty">데이터가 없습니다</div>
                            ) : (
                                menuContents[tabIndex]?.map((content, contentIndex) => (  
                                    <div key={contentIndex} className="insightItem"> 
                                        <div className="insightIcon">{content.icon}</div>
                                        <div className="insightText">
                                            <strong>{content.title}</strong>
                                            <div className="desc">{content.description}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ))
                }
                {/* <div className={`insightContent ${activeTab === 'comment' ? 'active' : ''}`}>
                    {insights.length === 0 ? (
                        <div className="empty">인사이트가 없습니다</div>
                    ) : (
                        insights.map((insight, index) => (
                            <div key={index} className="insightItem">
                                <div className="insightIcon">{insight.icon}</div>
                                <div className="insightText">
                                    <strong>{insight.title}</strong>
                                    {insight.description}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className={`insightContent ${activeTab === 'action' ? 'active' : ''}`}>
                    {actions.length === 0 ? (
                        <div className="empty">액션 포인트가 없습니다</div>
                    ) : (
                        actions.map((action, index) => (
                            <div key={index} className="insightItem">
                                <div className="insightIcon">{action.icon}</div>
                                <div className="insightText">
                                    <strong>{action.title}</strong>
                                    {action.description}
                                </div>
                            </div>
                        ))
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default InsightCard;