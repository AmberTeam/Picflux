import { Form } from "react-router-dom"
import styles from "./index.module.scss"
import { ReactComponent as SendIcon } from "../../icons/Send.svg"
import store from "../../store/store"
import Comments from "../Comments"
const CommentsSection = () => {
    return (
        <section className={styles["comments-section"]}>
            <Form
                className={styles["upload-comment-container"]}
                method="post"
                action="comment"
            >
                <input
                    type="text"
                    className={styles["upload-comment-input"]}
                    placeholder={store.lang.film.comments.placeholder.ec}
                />
                <button type="submit" className={styles["upload-button"]}>
                    <SendIcon className={styles["upload-icon"]} />
                </button>
            </Form>
            <Comments comments={[]}/>
        </section>
    )
}

export default CommentsSection