import {FC, ReactNode, useEffect, useState} from 'react'
import cl from './index.module.sass'

interface IBrickAction {
    content: string 
    value: string
    variant?: string
    handler?: (e: string) => void
    default_val?: string
}

interface IBSelectorProps {
    children: ReactNode
    actions: IBrickAction[]
    action_c: (arg: any) => void
    selectors_required: number
    default?: number
    restoreConfig?: IBrickAction[]
    disabled?: boolean
    variant?: string
}

const BSelector: FC<IBSelectorProps> = ({...props}) => {
    
    const [selected, setSelected] = useState<IBrickAction[]>([])
    const [variant, setVariant] = useState<string>("")

    const selectHandler = (selector: IBrickAction) => {
        if(props.disabled) return 

        if(props.selectors_required <= 2) {
            if(selected.length >= props.selectors_required && props.selectors_required <= 2) {
                props.action_c([selector])
                return setSelected([selector])
            }
        } else {
            if(selected.length == props.selectors_required && !selected.includes(selector)) {
                const selected_sh = selected
                selected_sh.shift()
                props.action_c([...selected_sh, selector])
                return setSelected([...selected_sh, selector])
            }
        }
        
        for(var i=0;i < selected.length;i++) {
            if(selected[i].content == selector.content) {
                props.action_c(selected.filter((select: IBrickAction) => select.content !== selector.content))
                return setSelected(selected.filter((select: IBrickAction) => select.content !== selector.content))
            }
        }
        props.action_c([...selected, selector])
        setSelected([...selected, selector])
    }

    useEffect(() => {
        if(props.restoreConfig) {
            setSelected([...props.restoreConfig])
        } else {
            setSelected((props.default !== null || props.default !== undefined) && props.actions[props.default as number] !== undefined ? [props.actions[props.default as number]] : [])
        }
    }, [props.restoreConfig])

    useEffect(() => {
        if(props.variant) switch(props.variant) {
            case 'input': 
                setVariant('input')
                break
            default:
                setVariant('default')
        }
    }, [])

    return (
        <div className={`${cl.BrickSelector} ${props.disabled ? cl.Disabled : cl.Enabled}`}>
            <div className={cl.Selector_header}>
                {props.children}
            </div>
            <div className={cl.Selector_body}>
                {
                    props.actions.map((action: IBrickAction) => {
                        var d_flag = false
                        var last_flag = false
                        for(var i=0;i < selected.length;i++) {
                            if(selected[i].content == action.content) d_flag = true
                            if(selected.length == 1 && selected[0].content == action.content) last_flag = true
                        }
                        if(variant == 'input' && action.variant == 'input') return <input 
                            key={action.content} className={`${cl.Selector_action} ${cl.Input_type} ${d_flag ? props.selectors_required > 2 ? last_flag ? cl.Selected_required_all : cl.Selected : cl.Selected_required_all : cl.Default}`}
                            onClick={() => {if(!last_flag) {
                                selectHandler(action)
                                if(action.handler) action.handler(localStorage.getItem("_datesrt") as string)
                            }}}
                            defaultValue={action.default_val ? action.default_val : ""}
                            placeholder="Введите дату выпуска"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => action.handler && action.handler(e.target.value)}
                        />
                        return (
                            <button
                                key={action.content} 
                                className={`${cl.Selector_action} ${d_flag ? props.selectors_required > 2 ? last_flag ? cl.Selected_required_all : cl.Selected : cl.Selected_required_all : cl.Default}`} 
                                onClick={() => {if(!last_flag) {
                                    selectHandler(action)
                                    if(variant === "input" && action.handler) action.handler("any")
                                }}}
                            >{action.content}</button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BSelector 