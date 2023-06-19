import { ReactNode, FC, ButtonHTMLAttributes } from "react";
import styles from "./index.module.scss";
import ButtonVariant from "../../enums/ButtonVariant";
interface Props {
  variant: ButtonVariant
  children: ReactNode
}

const Button: FC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = ({ variant, children, className, ...buttonProps }) => {
    return (
        <button 
            className={`${styles["button"]} ${variant === ButtonVariant.Empty ? styles["empty-button"] : variant === ButtonVariant.Filled ? styles["filled-button"] : ""} ${className ?? ""}`}
            {...buttonProps}
        >
            {children}
        </button>
    );
};

export default Button;