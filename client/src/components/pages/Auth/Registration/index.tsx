import React, {FC, useContext, useState} from 'react'
import {Context} from "../../../../index"
import {observer} from "mobx-react-lite"
import cl from '../auth.module.sass'
import Input from  "../../../UI/Input"
import { useTranslation } from '../../../../hooks/translator.hook'

const RegistrationPage: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    const {translate} = useTranslation()

    return (
        <div className={cl.Auth_layout__container}>
            <div className={cl.Layout_content__container}>
                <h1>{translate("auth.title.register.fst")}<span className="a_col">{translate("auth.title.register.sec")}</span></h1>
                <form style={{width: "100%"}} onSubmit={e => {
                    e.preventDefault() 
                    store.registration(email, password)
                }}>
                    <Input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        placeholder={translate("g.UI.input.placeholder.email")}
                        default={true}
                    />
                    <Input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder={translate("g.UI.input.placeholder.password")}
                        default={true}
                    />
                    <button className="button" type="submit">
                    {translate("auth.form.button.register")}
                    </button>
                </form>
                <span className={cl.Act}>
                    {translate("auth.prop.register.fst")} <a href="/login"> {translate("auth.prop.register.sec")} </a>
                </span>
            </div>
            <div className={cl.Layout_promo__container}>

                <span className={cl.blurer}>
                </span>
            </div>
        </div>
    )
}

export default observer(RegistrationPage)
