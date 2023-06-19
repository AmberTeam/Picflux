import { ChangeEvent, FC, useState } from "react";
import styles from "./index.module.scss";
import { ReactComponent as CloseIcon } from "../../icons/Close.svg";
import store from "../../store/store";
import Modal from "../Modal";
import { ReactComponent as UploadIcon } from "../../icons/Upload.svg";
import { useFetcher } from "react-router-dom";
import UserService from "../../services/UserService";
import { observer } from "mobx-react-lite";

interface Props {
    isActive: boolean
    setIsActive: (isActive: boolean) => void
}

export async function editProfileModalAction({ request } : { request: Request }) {
    const newUserInformation = Object.fromEntries(await request.formData());
    const response = await UserService.update(newUserInformation);
    return { response };
}

const EditProfileModal: FC<Props> = ({ isActive, setIsActive }) => {
    const [avatarUrl, setAvatarUrl] = useState(store.user.avatar);
    const fetcher = useFetcher();
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if(files?.length) {
            if(!files[0].type.includes("image/")) {
                console.log("The file must be an image");
            }
            else {
                const newAvatarUrl = URL.createObjectURL(files[0]);
                setAvatarUrl(newAvatarUrl);
            }
        }
    };
    return (
        <Modal
            isActive={isActive}
            close={() => setIsActive(false)}
            className={styles.modal}
        >
            <div className={styles["modal-header"]}>
                <button className={styles["close-icon-container"]} onClick={() => setIsActive(false)}>
                    <CloseIcon className={styles["close-icon"]} />
                </button>
                <span className={styles.title}>{store.lang.profile.edit.title}</span>
            </div>
            <fetcher.Form
                className={styles["modal-form"]}
                encType="multipart/form-data"
                method="patch"
                action="edit"
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
                            placeholder={store.lang.profile.edit.bio_e}
                            defaultValue={store.user.biography}
                            name="biography"
                            id="biography"
                        />
                    </div>
                </div>
                <button
                    className={`${styles["submit-button"]}`}
                    type="submit"
                    onClick={() => setIsActive(false)}
                >
                    {store.lang.profile.edit.submit}
                </button>
            </fetcher.Form>
        </Modal>
    );
};
export default observer(EditProfileModal);