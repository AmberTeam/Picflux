import styles from "./index.module.scss"
import BrickButton from "../BrickButton"
import { observer } from "mobx-react-lite"
import IButtonInformation from "../../interfaces/IButtonInformation"
import { useState } from "react"
import ButtonType from "../../enums/ButtonType"

interface Props<T> {
    buttonsInformation: IButtonInformation<T>[]
    selectSeveral: boolean
    canBeWithoutValue: boolean
    defaultValue: T[] | null
    isInput: boolean
    name?: string
    onSelect?: (argument: T) => void
    buttonType?: ButtonType
}
const BrickSelector = <T,>({ buttonsInformation, selectSeveral, canBeWithoutValue, defaultValue, isInput, name, onSelect, buttonType }: Props<T>) => {
    const [selectedButtons, setSelectedButtons] = useState<Set<T>>(new Set(defaultValue !== null ? defaultValue : null))
    const handleClick = (id: T, isSelected: boolean) => {
        if (isSelected) {
            if(canBeWithoutValue || (selectSeveral && selectedButtons.size > 1)) {
                const newState = new Set(selectedButtons)
                newState.delete(id)
                setSelectedButtons(newState)
            }
        }
        else {
            if(onSelect) {
                onSelect(id)
            }
            if(selectSeveral) {
                const newState = new Set(selectedButtons)
                newState.add(id)
                setSelectedButtons(newState)
            }
            else {
                setSelectedButtons(new Set([id]))
            }
        }
    }
    return (
        <div className={styles["brick-selector"]}>
            {isInput ? <input name={name} type="hidden" value={Array.from(selectedButtons).join(" ")} /> : null}
            {buttonsInformation.map(buttonInformation => (
                <BrickButton<T>
                    id={buttonInformation.id}
                    key={buttonInformation.text}
                    text={buttonInformation.text}
                    onButtonClick={handleClick}
                    isSelected={selectedButtons.has(buttonInformation.id)}
                    buttonType={buttonType}
                />
            ))}
        </div>
    )
}

export default observer(BrickSelector) 