import { ChangeEvent, FC, useState } from "react"
import styles from "./index.module.scss"
import { ReactComponent as CloseIcon } from "../../icons/Close.svg"
import store from "../../store/store"
import Modal from "../Modal"
import { ReactComponent as UploadIcon } from "../../icons/Upload.svg"
import { Form, redirect, useNavigate } from "react-router-dom"
import UserService from "../../services/UserService"
import { observer } from "mobx-react-lite"

export async function editProfileModalAction({ request } : { request: Request }) {
    const newUserInformation = Object.fromEntries(await request.formData())
    const response = await UserService.update(newUserInformation)
    if(response.status === 200){
        return redirect("..")
    }
    return { response }
}

const EditProfileModal: FC = () => {
    const navigate = useNavigate()
    const [avatarUrl, setAvatarUrl] = useState(store.user.avatar)
    const close = () => {
        navigate(-1)
    }
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target
        if(files?.length) {
            if(!files[0].type.includes("image/")) {
                console.log("The file must be an image")
            }
            else {
                const newAvatarUrl = URL.createObjectURL(files[0])
                setAvatarUrl(newAvatarUrl)
            }
        }
    }
    return (
        <Modal
            isActive={true}
            close={close}
            className={styles.modal}
        >
            <div className={styles["modal-header"]}>
                <button className={styles["close-icon-container"]} onClick={close}>
                    <CloseIcon className={styles["close-icon"]} />
                </button>
                <span className={styles.title}>{store.lang.profile.edit.title}</span>
            </div>
            <Form
                className={styles["modal-form"]}
                encType="multipart/form-data"
                method="patch"
            >
                <div className={styles["avatar-field"]}>
                    <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    <label htmlFor="avatar" className={styles["avatar-input"]}>
                        <div className={styles["upload-avatar-icon-container"]}>
                            <UploadIcon className={styles["upload-avatar-icon"]}/>
                        </div>
                        <img className={styles.avatar} src={avatarUrl} />
                    </label>
                </div>
                <div className={styles["inputs-container"]}>
                    <div className={styles.field}>
                        <label
                            className={styles["field-label"]}
                            htmlFor="username"
                        >
                            {store.lang.profile.edit.usn}
                        </label>
                        <input
                            className={`${styles["field-input"]}`}
                            placeholder={store.lang.profile.edit.usn_e}
                            defaultValue={store.user.username}
                            name="username"
                            id="username"
                        />
                    </div>
                    <div className={styles.field}>
                        <label
                            className={styles["field-label"]}
                            htmlFor="biography"
                        >
                            {store.lang.profile.edit.bio}
                        </label>
                        <textarea
                            className={styles["field-input"]}
                            placeholder={store.lang.profile.edit.bio_ex}
                            defaultValue={store.user.biography}
                            name="biography"
                            id="biography"
                        />
                    </div>
                </div>
                <button
                    className={`${styles["submit-button"]}`}
                    type="submit"
                >
                    {store.lang.profile.edit.submit}
                </button>
            </Form>
        </Modal>
    )
}
export default observer(EditProfileModal)