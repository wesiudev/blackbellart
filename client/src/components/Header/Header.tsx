import logo from "../../common/images/logobbw.png";
import facebookIcon from "../../common/images/facebook.png";
import instagramIcon from "../../common/images/instagram.png";
import youtubeIcon from "../../common/images/youtube.png";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import getUser from "../../common/hooks/getUser";
import { UserMenu } from "./elements/userMenu";
import cartImg from "../../common/images/cart.png";
import useWindowDimensions from "../../common/hooks/useWindowDimensions";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getLocale } from "../../common/redux/actions/locale";
import i18n from "../../common/translation/translation";
import useCart from "../../common/hooks/useCart";
import envelopeHeader from "../../common/images/envelopeHeader.png";
import shopHeader from "../../common/images/shopHeader.png";
import imageHeader from "../../common/images/imageHeader.png";
const Header = () => {
  const dispatch = useDispatch<any>();
  const { language } = useSelector((state: any) => state.locale);
  const [shouldFetchLanguage, setShouldFetchLanguage] = useState<boolean>(true);
  function languageSet() {
    setShouldFetchLanguage(false);
  }
  useEffect(() => {
    dispatch(getLocale());
  }, []);
  setTimeout(() => {
    shouldFetchLanguage && i18n.changeLanguage(language, languageSet);
  }, 500);
  const [currentTab, setCurrentTab] = useState<string>(""); //orders, settings
  const user = getUser();
  const serverFeedback = useSelector((state: any) => state.serverFeedback);
  const { width } = useWindowDimensions();
  const cartVariants = {
    initial: {
      height: "40px",
      transition: {
        duration: 0.2,
      },
    },
    animate: {
      height: "50px",
      marginBottom: 0,
      transition: {
        duration: 0.2,
      },
    },
  };
  const { t } = useTranslation();
  const cart = useCart();
  const cartLength = cart?.cart?.products?.length;
  return (
    <>
      <header>
        <div className="content">
          <NavLink className="logo" to="/">
            <img src={logo} alt="" />
            <span style={{ color: "black" }}>BlackBell</span>
          </NavLink>
          <>{serverFeedback && serverFeedback.message}</>
          <div className="nav">
            <div className="nav__items">
              {width <= 1024 && (
                <NavLink to="/cart">
                  <motion.div
                    variants={cartVariants}
                    whileHover="animate"
                    whileTap="animate"
                    className="cart"
                  >
                    <img src={cartImg} alt="" />
                    <div className="quantity">{cartLength}</div>
                  </motion.div>
                </NavLink>
              )}
              <NavLink to="/gallery" className="nav__items__item">
                <img className="headerimg" src={imageHeader} alt="" />{" "}
                {t("header_Gallery")}
              </NavLink>
              <NavLink to="/shop" className="nav__items__item">
                <img className="headerimg" src={shopHeader} alt="" />
                {t("header_Shop")}
              </NavLink>
              <NavLink to="/contact" className="nav__items__item">
                <img className="headerimg" src={envelopeHeader} alt="" />
                {t("header_Contact")}
              </NavLink>
            </div>
            <div className="nav__socials">
              <div className="nav__socials__items">
                <div className="nav__socials__items__item">
                  <img src={facebookIcon} alt="" />{" "}
                </div>
                <div className="nav__socials__items__item">
                  <img src={instagramIcon} alt="" />{" "}
                </div>
                <div className="nav__socials__items__item">
                  <img src={youtubeIcon} alt="" />{" "}
                </div>
              </div>
              {/* <button
                onClick={() => dispatch({ type: LOGOUT })}
                className="login-btn"
              >
                WYLOGUJ
              </button> */}
            </div>
            {user ? (
              <UserMenu setCurrentTab={setCurrentTab} currentTab={currentTab} />
            ) : (
              <button className="login-btn">{t("header_Login")}</button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
