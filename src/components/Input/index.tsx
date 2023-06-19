
import { FC, useState, ChangeEvent, InputHTMLAttributes } from "react";
import styles from "./index.module.scss";
import store from "../../store/store";
import { observer } from "mobx-react-lite";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ onChange, placeholder, type: defaultType, ...inputProps}) => {
    const [content, setContent] = useState<string | null>(null);
    const [type, setType] = useState<string>(defaultType ?? "text");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
        onChange?.(e);
    };
    return (
        <div className={styles["input-container"]}>
            <div className={`${styles["input-label-container"]} ${content ? styles.active : ""}`}>
                <label className={styles.label}>{placeholder}</label>
                <input
                    onChange={handleChange}
                    className={styles.input}
                    type={type}
                    {...inputProps}
                />
            </div>
            {
                defaultType === "password" && content
                &&
                <button className={styles["toggle-type-button"]} type="button" onClick={() => setType(type === "password" ? "text" : "password")}>
                    {
                        type === "password"
                            ?
                            store.lang.g.UI.input.viewer.show
                            :
                            store.lang.g.UI.input.viewer.hide
                    }
                </button>
            }
        </div>
    );
};

export default observer(Input);