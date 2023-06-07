import { FC, useEffect, useState } from "react"
import styles from "./footer.module.scss"
import { observer } from "mobx-react-lite"
import { Link, useLocation } from "react-router-dom"
import amber_down from "../../img/amber_png_down.png"
import store from "../../store/store"

const Footer: FC = () => {
    const [primary, setPrimary] = useState<boolean>(false)
    const location = useLocation()
    useEffect(() => {
        if (location.pathname.includes("film") || location.pathname.includes("login") || location.pathname.includes("registration") || location.pathname.includes("inbox"))
            setPrimary(true)
        else
            setPrimary(false)
    }, [location])

    return (
        <footer className={`${styles["footer-container"]} ${primary ? styles.primary : ""}`}>
            <div className={styles["footer-header"]}>
                <div />
                <div className={styles["logo-container"]}>
                    <img src={amber_down} className={styles.logo} />
                </div>
                <div className={styles.online}>
                    <span className={styles["online-light"]} />
                    <span className={styles["users-online"]}>{store.online.length}</span>
                </div>
            </div>
            <div className={styles["footer-links"]}>
                <Link className={styles["footer-link"]} to="/FAQ">{store.lang.footer.inner[1].FAQ}</Link>
                <Link className={styles["footer-link"]} to="/MC">{store.lang.footer.inner[1].MC}</Link>
                <Link className={styles["footer-link"]} to="/AU">{store.lang.footer.inner[2].AU}</Link>
                <Link className={styles["footer-link"]} to="/CP">{store.lang.footer.inner[3].CP}</Link>
                <Link className={styles["footer-link"]} to="/account">{store.lang.footer.inner[3].account}</Link>
                <Link className={styles["footer-link"]} to="/privacy">{store.lang.footer.inner[3].privacy}</Link>
            </div>
            <div className={styles["footer-bottom"]}>
                <span>Amber Team 2023.</span>
                <span>Cimber v1.0.3</span>
            </div>
        </footer>
    )
}

export default observer(Footer)