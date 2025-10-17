import React from "react";
import styles from "../styles/Block.module.scss";

type Props = {
    children?: React.ReactNode;
    /** 내부 여백 (px, rem 등) */
    padding?: number | string;
    /** 바깥 여백 (px, rem 등) */
    margin?: number | string;
    /** 모서리 라운드 (기본 10) */
    radius?: number | string;
    /** flex 방향/정렬 옵션 */
    direction?: "row" | "column";
    align?: React.CSSProperties["alignItems"];
    justify?: React.CSSProperties["justifyContent"];
    gap?: number | string;
    className?: string;
    style?: React.CSSProperties;
};

const Block: React.FC<Props> = ({
    children,
    padding = 12,
    margin = 0,
    radius = 10,
    direction = "row",
    align = "stretch",
    justify = "flex-start",
    gap = 8,
    className,
    style,
    ...rest
}) => {
    return (
        <div
            className={`${styles.block} ${className ?? ""}`}
            style={{
                padding,
                margin,
                borderRadius: typeof radius === "number" ? `${radius}px` : radius,
                flexDirection: direction,
                alignItems: align,
                justifyContent: justify,
                gap,
                ...style,
            }}
            {...rest}
        >
            {children}
        </div>
    );
};

export default Block;
