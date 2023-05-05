
import {FC, useState} from 'react'
import { useTranslation } from '../../../hooks/translator.hook'
import cl from './index.module.sass'
 
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    default?: boolean
}

const Input: FC<InputProps> = (props: InputProps) => {

    const [content, setContent] = useState<string | null>(null)
    const [type, setType] = useState<string>(props.type!)

    const preChange = (e: any) => {
        setContent(e.target.value)
        props.onChange?.(e)
    }

    const {translate} = useTranslation()
    
    return (
        <div className={`${cl.Input_container} ${props.default ? cl.Default : cl.Margin}`}>
            <div className={cl.Padding_inner}>
                <label className={`${cl.Label} ${content ? cl.Active : ""}`}>
                    <span className={cl.Span}>{props.placeholder}</span> 
                    <input 
                        onChange={preChange} 
                        className={cl.Input}
                        type={type}
                    />
                </label>
                <span className={cl.Spacer}>
                    {
                        props.type === 'password' && content
                            &&
                            <span>
                                <button className={cl.Spacer_viewer} type="button" onClick={() => setType(type === 'password' ? 'text' : 'password')}>
                                    {
                                        type === 'password'
                                            ?
                                            translate("g.UI.input.viewer.show")
                                            :
                                            translate("g.UI.input.viewer.hide")
                                    }
                                </button>
                            </span>
                    }
                </span>
            </div>
        </div>
    )
}

export default Input