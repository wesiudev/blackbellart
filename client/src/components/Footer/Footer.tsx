import logo from '../../common/images/logobbwWhite.png'
const Footer = () => {
    return(
        <div className="footer">
            <div className="footer__content">
                <div className="footer__content__section">
                <h1>ZAOBSERWUJ MNIE</h1>
                <ul>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>YouTube</li>
                </ul>
                </div>
                <div className="footer__content__section">
                <h1>KONTAKT</h1>
                <ul>
                    <li>blackbell.art@gmail.com</li>
                    <li>+48 {" "}574740974</li>
                </ul>
                </div>
                <div className="footer__content__logo">
                    <img src={logo} alt="" />
                </div>
            </div>
            <hr />
            <div className="footer__dev">
               <h4>&#174; Wszelkie prawa zastrzeżone Blackbellart.com</h4>
               <h4>dev: wesiudev</h4>
            </div>
        </div>
    )
}

export default Footer