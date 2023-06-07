import { FC } from "react"
import { observer } from "mobx-react-lite"
import { redirect } from "react-router-dom"
import store from "../../../store/store"
import AuthPage from "../index"

export async function registrationAction({ request }: { request: Request }) {
    const credentials = Object.fromEntries(await request.formData())
    const wasSuccessful = await store.registration(credentials.email as string, credentials.password as string)
    if (wasSuccessful) {
        return redirect("/")
    }
    return { wasSuccessful }
}
const RegistrationPage: FC = () => {
    return (
        <AuthPage type="register" navigateTo="/login" />
    )
}

export default observer(RegistrationPage)
