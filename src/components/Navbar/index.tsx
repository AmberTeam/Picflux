import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
import styles from "./index.module.scss"
import ic from "../../img/Icon_nav.png"
import { useScrollDirection } from "../../hooks/sd.hook"
import { ScrollDirection } from "../../hooks/sd.hook"
import amber_down from "../../img/amber_png_down_cropped.png"
import Offcanvas from "../Offcanvas"
import { ReactComponent as HamburgerMenuIcon } from "../../icons/HamburgerMenu.svg"
import { Link } from "react-router-dom"
import store from "../../store/store"
const Navbar: FC = () => {
    const scrollDirection = useScrollDirection()
    const [navigatorActive, setNavigatorActive] = useState<boolean>(false)

    return (
        <>
            <header className={`container ${styles.navbar} ${scrollDirection === ScrollDirection.down ? styles.down : styles.up}`}>
                <div className={styles.amber}>
                    <img className={styles.icon} src={ic} width="32" />
                    <span className={styles.name}>imber</span>
                </div>
                <div className={styles.opts}>
                    <Link to='/' title={store.lang.navbar.opts.home}>
                        <img className={styles["amber-logo"]} src={amber_down} />
                    </Link>
                </div>
                <div className={styles["hamburger-menu-container"]}>
                    <button className={styles["hamburger-menu-button"]} onClick={() => setNavigatorActive(state => !state)}>
                        <HamburgerMenuIcon className={styles["hamburger-menu-icon"]}/>
                    </button>
                </div>
            </header>
            <Offcanvas isActive={navigatorActive} close={() => setNavigatorActive(false)} />
        </>
    )
}

export default observer(Navbar)