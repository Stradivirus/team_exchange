import { useEffect } from "react";

const BASE_URL = import.meta.env.VITE_IMAGE_SERVER_URL;

export default function HtmlFrame({
    className,
    src,
    useBase = true, // 기본값 true
}: { className?: string; src: string; useBase?: boolean | undefined }) {
    useEffect(() => {
    const iframe = document.getElementById("myframe") as HTMLIFrameElement | null;
    const prframe = document.getElementById("prframe") as HTMLElement
    if (!iframe) return;

    iframe.onload = () => {
      try {
        const doc = iframe.contentWindow?.document;
        if (!doc) return;

        // 내부 문서 높이 계산
        const height = doc.body.scrollHeight;
        iframe.style.height = height + "px";
        prframe.style.height = height + "px";
      } catch (e) {
        console.warn("iframe resize failed", e);
      }
    };
  }, []);
    const fullSrc =
        useBase
            ? `${BASE_URL}${src}`
            : src;
    if (useBase) {
        return (
            <div id="prframe" style={{width: "100%", height: "inherit"}}>
                <iframe
                    id="myframe"
                    className={className}
                    src={fullSrc}
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        borderRadius: "8px",
                        objectFit: "contain",
                        display: "block",
                        overflowX: "auto",
                        overflow: "auto",
                    }}
                    sandbox="allow-scripts allow-same-origin"
                />
            </div>
        );
    }

    return (
        <img
            src={fullSrc}
            className={className}
            style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                objectFit: "contain", 
                display: "block",
                maxHeight: "100%", 
            }}
            alt="chart"
        />
    );

}
