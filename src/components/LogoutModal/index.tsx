import { FC, useState } from "react"
import styles from "./index.module.scss"
import Modal from "../Modal"
import { observer } from "mobx-react-lite"
import store from "../../store/store"
const LogoutModal: FC = () => {
    const [deleteData, setDeleteData] = useState<boolean>(false)
    return (
        <Modal
            isActive={store.logoutModalActive}
            close={() => store.setLogoutModal(false)}
            className={styles.modal}
        >
            <h2> {store.lang.modal.header.title}</h2>
            <div className={styles["modal-action"]}>
                <div className={styles["form"]}>
                    <div className={styles["field"]}>
                        <input onChange={(() => setDeleteData(false))} id="yes" type="radio" name="question" checked />
                        <label htmlFor="yes">{store.lang.modal.action.save}</label>
                    </div>
                    <div className={styles["field"]}>
                        <input onChange={() => setDeleteData(true)} id="no" type="radio" name="question" />
                        <label htmlFor="no">{store.lang.modal.action.delete}</label>
                    </div>
                </div>
                <div className={styles["buttons"]}>
                    <button className="button" onClick={() => {
                        store.logout(deleteData)
                        store.setLogoutModal(false)
                    }}>
                        {store.lang.modal.action.sure}
                    </button>
                    <button className="button" onClick={() => {
                        store.setLogoutModal(deleteData)
                        store.setLogoutModal(false)
                    }}>
                        {store.lang.modal.action.exit}
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default observer(LogoutModal)