import cl from './index.module.sass'

const UndefinedRoutePage = () => {
    return (
        <div className={`section_cls ${cl.UndefinedRoute_container}`}>
            <div className={cl.Icon}>
                
            </div>
            <span className={cl.Title}>Page not found or you don't have access to it</span>
        </div>
    )
}

export default UndefinedRoutePage