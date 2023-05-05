import {FC, ReactNode, useEffect, useState} from 'react'
import cl from './index.module.sass'

interface IDropdownProps {
    children: ReactNode
    childs: any[]
    default?: number
    callback?: (arg: any) => void
}

const Dropdown: FC<IDropdownProps> = ({...props}) => {
    const [currChild, setCurrChild] = useState<any>()

    const [childsAvail, setChildsAvail] = useState<any[]>(props.childs)

    const [active, setActive] = useState<boolean>(false)

    const handleClick = (child: any) => {
        setCurrChild(child)
        if(props.callback) props.callback(child.value)
        setActive(false)
    }

    useEffect(() => {
        const indof = props.childs.map(child => child.content).indexOf(currChild?.content)
        setChildsAvail(props.childs.filter(children => children.content !== props.childs[indof]?.content))
    }, [currChild])

    useEffect(() => {
        if(props.default) {
            setCurrChild(props.childs[props.default - 1])
        } else {
            setCurrChild(props.childs[0])
        }
    }, [])


    return (
        <div className={cl.Dropdown_container} onMouseLeave={() => setActive(false)}>
            <button className={cl.Dropdown_header} onClick={() => setActive(active ? false : true)}>
                <span>{props.children}</span>
                <span>{currChild?.content}</span>
            </button>
            <div className={`${cl.Dropdown_action} ${active ? cl.Active : cl.Inactive}`}>
                    {childsAvail.map((child: any) => {
                        return (
                            <button className={cl.Dropdown_child} key={child.content} onClick={() => handleClick(child)}>
                                {child.content}
                            </button>
                        )
                    })}
            </div>
        </div>
    )
}

export default Dropdown