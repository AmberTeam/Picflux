import { FC } from "react";
import styles from "./index.module.scss";
import Input from "../../components/Input";
import { TLoginButton, TLoginButtonSize, TUser } from "react-telegram-auth";
import LoaderMini from "../../components/LoaderMini";
import { Form, Link, useNavigation } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "../../icons/Arrow.svg";
import store from "../../store/store";
import { observer } from "mobx-react-lite";
import Images from "../../sass/utils/img/bg.jpg";

interface Props {
    type: "login" | "register",
    navigateTo: "/login" | "/registration"
}

const AuthPage: FC<Props> = ({ type, navigateTo }) => {
    const navigation = useNavigation();
    return (
        <div className={styles["auth-container"]}>
            <div className={styles["auth-form-container"]}>
                <Link to="/" className={styles["return-button"]}>
                    <ArrowIcon className={styles["arrow-icon"]} />
                    {store.lang.navbar.returner}
                </Link>
                <h1>
                    {store.lang.auth.title[type].fst}
                    <span className="a_col">{store.lang.auth.title[type].sec}</span>
                </h1>
                <TLoginButton
                    botName="cimber_auth_test_bot"
                    buttonSize={TLoginButtonSize.Large}
                    lang="en"
                    usePic={true}
                    cornerRadius={20}
                    onAuthCallback={(authdata: TUser) => store.handleTelegramAuth(authdata)}
                />
                <span className={styles.separator}>
                    <span className={styles["separator-line"]}></span>
                    <span className={styles["separator-text"]}>or</span>
                    <span className={styles["separator-line"]}></span>
                </span>
                <Form
                    method="post"
                    className={styles["auth-form"]}
                >
                    <Input
                        type="text"
                        placeholder={store.lang.g.UI.input.placeholder.email}
                        name="email"
                    />
                    <Input
                        type="password"
                        placeholder={store.lang.g.UI.input.placeholder.password}
                        name="password"
                    />
                    <button type="submit" className={styles["auth-button"]}>
                        {navigation.formAction && (navigation.state === "submitting" || navigation.state === "loading") ?
                            <div className={`${styles.loader}`}>
                                <LoaderMini />
                            </div>
                            :
                            <span className={`${styles["auth-button-text"]}`}>
                                {store.lang.auth.form.button[type]}
                            </span>
                        }
                    </button>
                </Form>
                <span className={styles.message}>
                    {store.lang.auth.prop[type].fst}
                    {" "}
                    <Link to={navigateTo} className={styles.link}>{store.lang.auth.prop[type].sec}</Link>
                </span>
            </div>
            <div className={styles["decoration-image-container"]}>
                <div className={styles["blurer"]} />
                <img className={styles["decoration-image"]} src={Images} draggable={false} />
            </div>
        </div>
    );
};

export default observer(AuthPage);