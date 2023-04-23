import React, { useState } from "react";
import defaultImage from "../../../common/images/defaultImage.png";
import { motion } from "framer-motion";
import classNames from "classnames";
import useWindowDimensions from "../../../common/hooks/useWindowDimensions";
import getUser from "../../../common/hooks/getUser";
import { LOGOUT } from "../../../common/redux/actions/actionTypes";
import { useDispatch } from "react-redux";

interface Props {
  setCurrentTab: (...arg: any) => void;
  currentTab: string;
}

export const UserMenu: React.FC<Props> = ({ currentTab, setCurrentTab }) => {
  const user = getUser();
  const dispatch = useDispatch<any>();

  const [isUserMenuOpen, setUserMenuOpen] = useState<boolean>(false);

  const { width, height } = useWindowDimensions();
  const getCurrentAnimationName = () => {
    if (isUserMenuOpen) {
      return "animate";
    }
    if (!isUserMenuOpen) {
      return "initial";
    }
  };

  const getResponsiveWidth = () => {
    if (width <= 1366 && width >= 1024) {
      return width * 0.89;
    }
    if (width < 1024) {
      return width * 0.94;
    }
    if (width > 1366) {
      return width * 0.695;
    }
  };

  const menuVariants = {
    animate: {
      width: getResponsiveWidth(),
      height: height * 0.8,
      marginTop: width < 1024 ? -40 : 100,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    initial: {
      opacity: 0,
      display: "none",
      transition: {
        duration: 0.25,
      },
    },
  };
  const menuClassName = classNames({
    userMenu: true,
    positionReset: isUserMenuOpen,
  });

  const imageVariants = {
    animate: {
      scale: [1, 0.8, 2],
      marginTop: width < 1024 ? 10 : 150,
      marginRight: width < 1024 ? 20 : 0,
      border: "3px solid rgb(0,0,0)",
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
    initial: {
      scale: [2, 0.8, 1],
      marginTop: width < 1024 ? -25 : 0,
      marginRight: width < 1024 ? 0 : 0,
      border: "0px solid transparent",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };
  const menuVisibilityHandler = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };
  return (
    <div className={menuClassName}>
      <motion.button
        className={classNames({
          "userMenu-image": true,
        })}
        onClick={menuVisibilityHandler}
        variants={imageVariants}
        animate={getCurrentAnimationName()}
      >
        <img
          src={user.userPictureUrl ? user.userPictureUrl : defaultImage}
          alt=""
        />
      </motion.button>
      <motion.div
        variants={menuVariants}
        animate={getCurrentAnimationName()}
        className="userMenu-menu"
      >
        <div className="userMenu-menu-content">
          <div className="userName">
            {user?.userName ? user?.userName : user?.userEmail}
          </div>

          {!isUserMenuOpen && (
            <div
              style={{ marginTop: "25px" }}
              className="userMenu-menu-content-dot"
            />
          )}
          <div className="list">
            <button
              style={{ marginLeft: "0px" }}
              onClick={() => setCurrentTab("orders")}
            >
              {width < 480 ? "Zamówienia" : "Moje zamówienia"}
            </button>
            <button onClick={() => setCurrentTab("settings")}>
              Ustawienia
            </button>
            <button onClick={() => dispatch({ type: LOGOUT })}>Wyloguj</button>
          </div>
          {isUserMenuOpen && (
            <div className="userEditorWrapper">
              {currentTab === "orders" && (
                <div className="orders">
                  <h1>Moje zamówienia</h1>
                  {user?.orders?.length ? (
                    <div className="orders-list">
                      <div className="order"></div>
                      <div className="order"></div>
                      <div className="order"></div>
                      <div className="order"></div>
                    </div>
                  ) : (
                    <div className="emptyText">
                      <div className="text">
                        Tutaj znajdziesz swoje zamówienia oraz faktury.
                      </div>
                    </div>
                  )}
                </div>
              )}
              {currentTab === "settings" && (
                <div className="settings">
                  <h1>Ustawienia</h1>
                  <div className="settings-table">
                    <div
                      style={{ marginLeft: "0px" }}
                      className="settings-table-item"
                    >
                      Email
                    </div>
                    <div className="settings-table-item">Hasło</div>
                    <div className="settings-table-item">Usuń konto</div>
                  </div>
                </div>
              )}
            </div>
          )}
          {!isUserMenuOpen && (
            <div
              style={{ marginTop: "25px", marginBottom: "25px" }}
              className="userMenu-menu-content-dot"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};
