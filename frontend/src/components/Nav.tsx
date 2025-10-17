// src/components/layout/Nav.tsx
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Rocket } from "lucide-react";
import styles from "../styles/Nav.module.scss";
import { useState } from "react";

const Nav = () => {
    const location = useLocation();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const menus = [
        { 
            label: "Dashboard", 
            path: "/dashboard",
        },
        { 
            label: "DataSet", 
            path: "/databoard",
        },
        { 
            label: "Visualization", 
            path: "/visualizationboard",
            dropdown: [
                { label: "S&P500", path: "/visualizationboard/S&P500" },
                { label: "Oil", path: "/visualizationboard/Oil" },
                { label: "Import/Export Price Index", path: "/visualizationboard/ieprice" },
                { label: "Interest Rate", path: "/visualizationboard/interestrate" },
                { label: "Gold", path: "/visualizationboard/gold" },
                { label: "News Sentiment", path: "/visualizationboard/newssentiment" },
            ]
        },
    ];

    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <Rocket 
                    className={styles.logo} 
                    size={20} 
                    onClick={() => window.location.href="/dashboard"} 
                />
            </div>

            <ul className={styles.menu}>
                {menus.map((menu) => (
                    <li 
                        key={menu.path} 
                        className={styles.menuItem}
                        onMouseEnter={() => menu.dropdown && setActiveDropdown(menu.label)}
                        onMouseLeave={() => menu.dropdown && setActiveDropdown(null)}
                    >
                        <div className={styles.menuWrapper}>
                            <Link
                                to={menu.path}
                                className={`${styles.link} ${location.pathname === menu.path ? styles.active : ""}`}
                            >
                                {menu.label}
                                {menu.dropdown && (
                                    <ChevronDown 
                                        className={`${styles.chevron} ${activeDropdown === menu.label ? styles.chevronUp : ''}`}
                                        size={16}
                                    />
                                )}
                            </Link>

                            {menu.dropdown && (
                                <div className={`${styles.dropdown} ${activeDropdown === menu.label ? styles.dropdownOpen : ''}`}>
                                    {menu.dropdown.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`${styles.dropdownItem} ${location.pathname === item.path ? styles.dropdownItemActive : ''}`}
                                            onClick={() => setActiveDropdown(null)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
