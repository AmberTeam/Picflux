import {FC, ReactNode} from 'react'
import cl from './index.module.sass'
type props = {
    children: ReactNode,
    active: boolean,
    title?: string,
    exec: () => void
}

const ContentModal: FC<props> = ({children, title, active, exec}) => { 

    
    
    return (
        <div className={`${cl.ContentModal_container} ${active ? cl.Active : cl.Inactive}`}>
            <div className={cl.Modal_inner}>
                { 
                    title 
                        ? 
                        <div className={cl.Modal_header}> 
                            <span className={cl.Title}>{title}</span>
                            <button className={cl.Exec} onClick={() => exec()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                </svg>
                            </button>
                        </div> 
                        : 
                        ""
                }
                <div className={cl.Modal_content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ContentModal