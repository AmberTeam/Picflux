import { FC } from "react"
import { observer } from "mobx-react-lite"
import store from "../../../store/store"
import AuthPage from "../index"
import { redirect } from "react-router-dom"

export async function loginAction({ request }: { request: Request }) {
    const credentials = Object.fromEntries(await request.formData())
    const wasSuccessful = await store.login(credentials.email as string, credentials.password as string)
    if(wasSuccessful) {
        return redirect("/")
    }
    return { wasSuccessful }
}

const LoginPage: FC = () => {
    return <AuthPage type="login" navigateTo="/registration" />
}

export default observer(LoginPage)
