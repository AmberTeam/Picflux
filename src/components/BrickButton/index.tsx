import ButtonType from "../../enums/ButtonType";
import styles from "./index.module.scss";
import { observer } from "mobx-react-lite";

interface Props<T> {
  text: string
  onButtonClick: (id: T, isSelected: boolean) => void
  id: T
  isSelected: boolean
  buttonType?: ButtonType
}

const BrickButton = <T,>({ text, onButtonClick, id, isSelected, buttonType }: Props<T>) => {
    return (
        <button 
            className={`${styles["brick-button"]} ${isSelected ? styles.selected : ""}`}
            onClick={() => onButtonClick(id, isSelected)}
            type={buttonType}
        >
            {text}
        </button>
    );
};

export default observer(BrickButton);