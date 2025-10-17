// src/components/layout/Header.tsx
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react"; // 아이콘 라이브러리 (lucide-react)

import styles from "../styles/Header.module.scss";

type Props = {
    title?: string;
};

function Header(props: Props) {
    const { title } = props;
    const [dateStr, setDateStr] = useState("");

    useEffect(() => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "short",
        };
        setDateStr(now.toLocaleDateString("en-US", options));
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.dateRow}>
                <Calendar className={styles.icon} size={18} />
                <span>{dateStr}</span>
            </div>
            <h1 className={styles.title}>{title ? title : "Dashboard"}</h1>
        </header>
    );
}

export default Header;
