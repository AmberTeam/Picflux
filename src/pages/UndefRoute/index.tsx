import { useRouteError } from "react-router-dom"
import styles from "./index.module.scss"

const UndefinedRoutePage = () => {
    const error = useRouteError()
    console.log(error)
    return (
        <div className={`section_cls ${styles["undefined-route-container"]}`}>
            <div className={styles.icon}>
                
            </div>
            <span className={styles.title}>Page not found or you don&apos;t have access to it</span>
        </div>
    )
}

export default UndefinedRoutePage