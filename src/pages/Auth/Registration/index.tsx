import { FC } from "react";
import { observer } from "mobx-react-lite";
import { redirect } from "react-router-dom";
import store from "../../../store/store";
import AuthPage from "../index";
import LogModal from "../../../components/LogModal";
import Footer from "../../../components/Footer";

export async function registrationAction({ request }: { request: Request }) {
    const credentials = Object.fromEntries(await request.formData());
    const wasSuccessful = await store.registration(credentials.email as string, credentials.password as string);
    if (wasSuccessful) {
        return redirect("/");
    }
    return { wasSuccessful };
}
const RegistrationPage: FC = () => {
    return (
        <>
            <LogModal />
            <AuthPage type="register" navigateTo="/login" />
            <Footer />
        </>
    );
};

export default observer(RegistrationPage);
