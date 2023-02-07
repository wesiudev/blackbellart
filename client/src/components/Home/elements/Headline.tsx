type headline = {
    text: string
    height?:string
}

export const Headline = (props: headline) => {
    return(
        <div style={{height:props.height}} className="headline">
            <h1>
                {props.text}
            </h1>
            <hr />
        </div>
    )
}