type InputProps = {
    name: string
    label: string
    change: React.ChangeEventHandler<HTMLInputElement>
}

const Input = (props: InputProps) => {
    return(
        <>
            <div className="newProduct__content__inputs__text__input">
                <label htmlFor={props.name}>{props.label}</label>
                <input onChange={props.change} type="text" name={props.name} />
            </div>
        </>
    )
}

export default Input