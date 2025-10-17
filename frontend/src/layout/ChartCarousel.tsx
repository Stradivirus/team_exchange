import React, { useEffect, useMemo, useState } from "react";
import styles from "../styles/ChartCarousel.module.scss";

type Props = {
    children: React.ReactNode[];
    intervalMs?: number;
    initialIndex?: number;
    loop?: boolean;
    onIndexChange?: (index: number) => void;
    className?: string;
    style?: React.CSSProperties;
    paused?: boolean; // ✅ 추가
};


const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(n, max));

export default function ChartCarousel({
    children,
    intervalMs = 4000,
    initialIndex = 0,
    loop = true,
    onIndexChange,
    className,
    style,
    paused = false
}: Props) {
    const slides = useMemo(() => React.Children.toArray(children), [children]);
    const count = slides.length;

    const [index, setIndex] = useState(() =>
        clamp(initialIndex, 0, Math.max(0, count - 1))
    );

    const goto = (next: number | ((prev: number) => number)) => {
        setIndex(prev => {
            const target = typeof next === "function" ? next(prev) : next;
            let idx = target;
            if (loop) {
                idx = (target + count) % count;
            } else {
                idx = clamp(target, 0, count - 1);
            }
            onIndexChange?.(idx);
            return idx;
        });
    };

    useEffect(() => {
        if (!intervalMs || count <= 1 || paused) return; 

        const timer = window.setInterval(() => {
            goto((prev) => prev + 1);
        }, intervalMs);

        return () => clearInterval(timer);
    }, [intervalMs, count, loop, paused]);


    return (
        <div
            className={`${styles.carousel} ${className ?? ""}`}
            style={style}
            aria-roledescription="carousel"
        >
            <div className={styles.viewport}>
                {slides.map((node, i) => (
                    <div
                        key={i}
                        className={`${styles.slide} ${i === index ? styles.active : ""}`}
                        aria-hidden={i === index ? "false" : "true"}
                    >
                        {node}
                    </div>
                ))}
            </div>

            {count > 1 && (
                <div className={styles.pagination}>
                    {Array.from({ length: count }).map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Go to slide ${i + 1}`}
                            className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                            onClick={() => goto(i)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
