// src/components/ScrollRouter.tsx
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ROUTE_ORDER = ["/", "/dashboard"] as const;

const SCROLL_THRESHOLD = 30;   // 휠 감도
const COOLDOWN_MS = 800;       // 연속 이동 방지(디바운스)

export default function ScrollRouter({ children }: { children: React.ReactNode }) {
    const nav = useNavigate();
    const { pathname } = useLocation();
    const lastTs = useRef(0);
    const touchStartY = useRef<number | null>(null);

    const go = (dir: 1 | -1) => {
        const now = Date.now();
        if (now - lastTs.current < COOLDOWN_MS) return;
        lastTs.current = now;

        const idx = ROUTE_ORDER.indexOf(pathname as any);
        if (idx === -1) return;

        const nextIdx = Math.min(Math.max(idx + dir, 0), ROUTE_ORDER.length - 1);
        if (nextIdx !== idx) nav(ROUTE_ORDER[nextIdx], { replace: false });
    };

    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            const currentIsFullPage = ROUTE_ORDER.includes(pathname as any);
            if (!currentIsFullPage) return; // ✅ 일반 페이지에서는 스크롤 막지 않음

            if (Math.abs(e.deltaY) < SCROLL_THRESHOLD) return;
            e.preventDefault();
            go(e.deltaY > 0 ? 1 : -1);
        };

        const onTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
        };
        const onTouchMove = (e: TouchEvent) => {
            if (touchStartY.current == null) return;
            const dy = touchStartY.current - e.touches[0].clientY;
            if (Math.abs(dy) < 40) return;
            e.preventDefault();
            go(dy > 0 ? 1 : -1);
            touchStartY.current = null;
        };

        // 캡처 단계로 등록 + passive:false (preventDefault 가능)
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: false });

        return () => {
            window.removeEventListener("wheel", onWheel as any);
            window.removeEventListener("touchstart", onTouchStart as any);
            window.removeEventListener("touchmove", onTouchMove as any);
        };
    }, [pathname]);

    return <>{children}</>;
}

