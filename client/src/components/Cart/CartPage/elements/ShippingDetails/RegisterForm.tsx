import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../../../../common/redux/actions/actionTypes";
import { signup } from "../../../../../common/redux/actions/user";
import { Input } from "./Input";

type UserInfo = {
  method: string;
  userPictureUrl: string;
  userEmail: string;
  password: string;
  repeatPassword: string;
  userName: string;
};

interface ComponentProps {
  setManualRegister: (...arg: any) => void;
}

export const RegisterForm: React.FC<ComponentProps> = ({
  setManualRegister,
}) => {
  const dispatch = useDispatch<any>();
  const [userInput, setUserInput] = useState<UserInfo>({
    method: "manual",
    userPictureUrl: "defaultImage",
    userEmail: "",
    password: "",
    repeatPassword: "",
    userName: "",
  });

  const [isTermsAgreementChecked, setTermsAgreementChecked] =
    useState<boolean>(false);

  const [isHovered, setHovered] = useState<boolean>(false);
  const checkboxVariants = {
    hover: {
      backgroundColor: "rgba(255,255,255, 1)",
      border: "5px solid black",
      borderRadius: "12px",
      transition: {
        duration: 0.35,
      },
      scale: [1, 1.2, 1],
      rotate: 180,
    },
    initial: {
      backgroundColor: "rgba(255,255,255, 0)",
      border: "2px solid black",
      borderRadius: "5px",
      transition: {
        duration: 0.2,
      },
      scale: [1, 0.8, 1],
    },
    alreadyAnimated: {
      backgroundColor: "rgba(255,255,255, 1)",
      border: "5px solid black",
    },
  };
  const handleRadioHoverEffect = () => {
    if (!isHovered) {
      return {
        backgroundColor: "rgb(255,255,255, 1)",
        border: "5px solid black",
        transition: {
          duration: 0.1,
        },
      };
    } else {
      return "alreadyAnimated";
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };
  const RegisterUser = () => {
    dispatch(signup(userInput));
  };

  return (
    <div className="cartWrapper__content__payment__group">
      <div className="authRow">
        <h1>Zarejestruj się</h1>
        <div className="line"></div>
        <div className="shippingForm">
          <Input
            value={userInput.userEmail}
            label="Adres e-mail"
            width="100%"
            inputName="userEmail"
            onChange={handleChange}
          />
          <div className="shippingForm-row">
            <Input
              value={userInput.password}
              label="Hasło"
              width="48%"
              inputName="password"
              onChange={handleChange}
              type="password"
            />
            <Input
              value={userInput.repeatPassword}
              label="Powtórz hasło"
              width="48%"
              inputName="repeatPassword"
              onChange={handleChange}
              type="password"
            />
          </div>
          <div
            className="shippingForm-row"
            style={{ justifyContent: "flex-start", marginTop: "17px" }}
          >
            <div className="radioWrapper">
              <motion.button
                onClick={() =>
                  setTermsAgreementChecked(!isTermsAgreementChecked)
                }
                className="radioCheckbox"
                variants={checkboxVariants}
                whileTap={{ scale: 0.85 }}
                whileHover={handleRadioHoverEffect()}
                animate={
                  isHovered || isTermsAgreementChecked ? "hover" : "initial"
                }
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                onBlur={() => setHovered(false)}
                onFocus={() => setHovered(true)}
              />
            </div>
            <motion.div
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
            >
              <div
                onClick={() =>
                  setTermsAgreementChecked(!isTermsAgreementChecked)
                }
                className="radioText"
              >
                Rejestrując się akceptuję regulamin serwisu.
              </div>
            </motion.div>
          </div>
          <div className="buttons">
            <button className="buttons-next" onClick={RegisterUser}>
              Dalej
            </button>
            <button
              className="buttons-back"
              onClick={() => {
                dispatch({ type: LOGOUT });
                setManualRegister(false);
              }}
            >
              Powrót
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
