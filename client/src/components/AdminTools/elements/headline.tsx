type HeadlineProps = {
    text: string
    isMenuOpened: boolean | any
    openMenu: Function | any
}

const Headline = (props: HeadlineProps) => {

    return(
        <div className="panel__headline">
            <div className="panel__headline__content">

                <h1>{props.text}</h1>
                {props.text === "Panel administracyjny" ? (null
                    ) : (
                <button 
                    onClick={() => props.openMenu(!props.isMenuOpened)}
                    className={props.isMenuOpened ? 'rotate' : ''}
                ></button>)}

            </div>
        </div>
    )
}

export default Headline