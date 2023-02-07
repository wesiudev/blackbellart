import send from '../../../common/images/send.png'
import {Link} from 'react-router-dom'
type button = {
    text: string
}

export const Button = (props: button) => {
    return(
        <>
            <Link style={{marginBottom: "150px"}} to="/contact">
                <div className="box">
                <button className="actionBtn">{props.text} <img src={send} alt="" /> 
                </button>
                    <span className="right"></span>
                    <span className="bottom"></span>
                </div>
            </Link> 
        </>
    )
}

export default Button