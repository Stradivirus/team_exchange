import styles from "../styles/Main.module.scss";

export default function Main() {
    return (
        <div className={styles.snapContainer}>
            <section className={styles.snapsection}>
                <div className={styles.content}>
                    <div
                        style={{
                            height: "100vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "#000",
                            color: "#fff",
                            fontFamily: "Pretendard, sans-serif",
                        }}
                    >
                        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>404</h1>
                        <p style={{ fontSize: "1.2rem", opacity: 0.8 }}>요청하신 페이지를 찾을 수 없습니다.</p>
                        <a
                            href="/dashboard"
                            style={{
                                marginTop: "2rem",
                                padding: "10px 20px",
                                border: "1px solid #fff",
                                borderRadius: "8px",
                                color: "#fff",
                                textDecoration: "none",
                                transition: "all 0.2s ease",
                                fontSize: "15px"
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#fff")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                            홈으로 돌아가기
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}