import {Dispatch, FC, ReactNode, SetStateAction, useEffect, useState} from 'react'
import cl from './index.module.sass'

interface IBrickAction {
    content: string 
    value: string
    variant?: string
    addition_initvalue?: string
    handler?: (e: string) => void
    default_val?: string
}

interface IBSelectorProps {
    children: ReactNode
    actions: IBrickAction[]
    action_c: (arg: any) => void
    selectors_required: number
    deletable: boolean
    default?: number
    restoreConfig?: IBrickAction[]
    disabled?: boolean
    variant?: string
    additions?: IBrickAction[]
    dropdown?: boolean 
    exclude_value?: string
    default_additions?: number
    action_c_add?: (arg:any) => void
}

const BSelector: FC<IBSelectorProps> = ({...props}) => {
    
    const [selected, setSelected] = useState<IBrickAction[]>([])
    const [additionSelected, setAdditionSelected] = useState<IBrickAction[]>([])
    const [variant, setVariant] = useState<string>("")
    const [dropdownActive, setDropdownActive] = useState<boolean>(false)
    const [additionActive, setAdditionActive] = useState<boolean>(false)
    const [additionVal, setAdditionVal] = useState<string>("")

    const prepareAdditonInit = (addition_initvalue: string) => {
        setAdditionActive(true)
        setAdditionVal(addition_initvalue)
    }

    const arrIncObj = (arr:any[],obj:any,inc_prop:string): boolean => {
        var result=false
        arr.map((el:any, i:number) => {
            if(el[inc_prop] == obj[inc_prop]) result=true
        })
        return result
    }

    const selectHandler = (
        arr: IBrickAction[],
        updateArrCb: Dispatch<SetStateAction<IBrickAction[]>>,
        commitch_cb: (arg:any) => void,
        selector: IBrickAction, 
        dep_exclude: boolean = false, 
        init_addition: boolean = false, 
        add_initval: string | undefined = undefined,
        ) => {
            

        if(props.disabled) return 

        if(props.exclude_value && props.exclude_value == selector.value) {
            !dep_exclude && commitch_cb([selector])
            init_addition ? prepareAdditonInit(add_initval!) : setAdditionActive(false)
            return updateArrCb([selector])
        }

        if(props.selectors_required <= 2 && !props.deletable) {
            if(arr.length >= props.selectors_required) {
                !dep_exclude && commitch_cb([selector])
                init_addition ? prepareAdditonInit(add_initval!) : setAdditionActive(false)
                return updateArrCb([selector])
            }
        } else {
            if(arr.length == props.selectors_required && !arrIncObj(arr, selector,"value")) {
                const arr_sh = arr
                arr_sh.shift()
                commitch_cb([...arr_sh, selector])
                init_addition ? prepareAdditonInit(add_initval!) : setAdditionActive(false)
                return updateArrCb([...arr_sh, selector])
            }
        }

        if(arrIncObj(arr, selector, "value")) {
            if(props.exclude_value && selector.value !== props.exclude_value && arrIncObj(arr, {value: props.exclude_value}, "value")) {
                return updateArrCb(arr.filter((select: IBrickAction) => select.value !== props.exclude_value))
            }
            !dep_exclude && commitch_cb(arr.filter((select: IBrickAction) => select.content !== selector.content))
            init_addition ? prepareAdditonInit(add_initval!) : setAdditionActive(false)
            return updateArrCb(arr.filter((select: IBrickAction) => select.content !== selector.content))
        }

        if(props.exclude_value && selector.value !== props.exclude_value && arrIncObj(arr, {value: props.exclude_value}, "value")) {
            !dep_exclude && commitch_cb([...arr.filter((select: IBrickAction) => select.value !== props.exclude_value), selector])
            init_addition ? prepareAdditonInit(add_initval!) : setAdditionActive(false)
            return updateArrCb([...arr.filter((select: IBrickAction) => select.value !== props.exclude_value), selector])
        }

        !dep_exclude && commitch_cb([...arr, selector])
        init_addition ? prepareAdditonInit(add_initval!) : setAdditionActive(false)
        updateArrCb([...arr, selector])
    }

    useEffect(() => {
        if(props.restoreConfig) {
            setSelected([...props.restoreConfig])
        } else {
            setSelected((props.default !== null || props.default !== undefined) && props.actions[props.default as number] !== undefined ? [props.actions[props.default as number]] : [])
        }
    }, [props.restoreConfig])

    useEffect(() => {
        if(props.default_additions && props.additions) {
            setAdditionSelected([{...props.additions[props.default_additions - 1]}])
        }
    }, [props.default_additions])

    useEffect(() => {
        if(props.default !== undefined) setSelected([{...props.actions[props.default]}])
    }, [props.default])

    useEffect(() => {
        if(props.variant) switch(props.variant) {
            case 'input': 
                setVariant('input')
                break
            case 'select': 
                setVariant('select')
                break
            default:
                setVariant('default')
        }
    }, [])

    return (
        <div className={`${cl.BrickSelector} ${props.disabled ? cl.Disabled : cl.Enabled} ${props.dropdown && cl.Dropdown_type}`}>
            {/* <div className={cl.Selector_header} onClick={props.dropdown ? () => setDropdownActive(!dropdownActive) : () => null}>
                <span>
                    {props.children}
                </span>
                {props.dropdown && 
                <button className={`${props.dropdown && cl.Dropdown_caret} ${dropdownActive && cl.Active}`}>
                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/></svg>   
                </button>}
            </div> */}
            <div className={`${cl.Selector_body} ${props.dropdown && cl.Active}`}>
                <div className={cl.Body_content}>
                    {
                        props.actions.map((action: IBrickAction) => {
                            var d_flag = false
                            var last_flag = false
                            for(var i=0;i < selected.length;i++) {
                                if(selected[i].content == action.content) d_flag = true
                                if(selected.length == 1 && selected[0].content == action.content) last_flag = true
                            }
                            if(variant !== 'default' && action.variant == 'addition_init') {
                                if(d_flag && !additionActive) prepareAdditonInit(action.addition_initvalue!)
                                return <button
                                    key={action.content} 
                                    className={`${cl.Selector_action} ${d_flag ? props.selectors_required >= 1 ? last_flag ? cl.Selected_required_all : cl.Selected : cl.Selected_required_all : cl.Default}`} 
                                    onClick={() => {if(!last_flag) {
                                        selectHandler(selected, setSelected, props.action_c, action, true, true, action.addition_initvalue)
                                        if(variant === "input" && action.handler) action.handler(action.addition_initvalue!)
                                    }}}
                                >{action.content}</button>
                            }
                            return (
                                <button
                                    key={action.content} 
                                    className={`${cl.Selector_action} ${d_flag ? props.selectors_required >= 1  ? last_flag ? cl.Selected_required_all : cl.Selected : cl.Selected_required_all : cl.Default}`} 
                                    onClick={() => {if(!last_flag) {
                                        selectHandler(selected, setSelected, props.action_c, action)
                                        if(variant === "input" && action.handler) action.handler("any")
                                    }}}
                                >{action.content}</button>
                            )
                        })
                    }
                </div>
                <div className={cl.Body_addition}>
                    {variant === 'input' ?
                        additionActive && <input 
                            className={cl.Addition_input}
                            defaultValue={additionVal}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.action_c(e.target.value)}
                        />
                        :
                        additionActive && props.additions?.map((action: IBrickAction) => {
                            var d_flag = false
                            var last_flag = false
                            for(var i=0;i < additionSelected.length;i++) {
                                if(additionSelected[i].content == action.content) d_flag = true
                                if(additionSelected.length == 1 && additionSelected[0].content == action.content) last_flag = true
                            }
                            return (
                                <button
                                    key={action.content} 
                                    className={`${cl.Selector_action} ${d_flag ? props.selectors_required >= 1  ? last_flag ? cl.Selected_required_all : cl.Selected : cl.Selected_required_all : cl.Default}`} 
                                    onClick={() => {if(!last_flag) {
                                        selectHandler(additionSelected, setAdditionSelected, props.action_c_add!, action)
                                    }}}
                                >{action.content}</button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BSelector 