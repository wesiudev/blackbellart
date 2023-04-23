import React, { useState } from "react";
import { Input } from "./Input";
import truck from "../../../../../common/images/truck.png";
import { SelectInput } from "./SelectInput";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../../../../common/redux/actions/actionTypes";
import { motion } from "framer-motion";
import getUser from "../../../../../common/hooks/getUser";
import useWindowDimensions from "../../../../../common/hooks/useWindowDimensions";

interface ComponentProps {
  setContinueWithoutLogin: (...arg: any) => void;
}

export const Form: React.FC<ComponentProps> = ({ setContinueWithoutLogin }) => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch<any>();
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    city: "",
    zipCode: "",
    country: "Polska",
    street: "",
    streetNumber: "",
    emailAdress: "",
    phoneNumber: "",
    clientType: "privatePerson", // ### clientType: "privatePerson" | "company" ###
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };
  const handleSelectChange = (value: string) => {
    setShippingInfo({
      ...shippingInfo,
      country: value,
    });
  };
  const [isHovered, setHovered] = useState<string>("");
  const checkboxVariants = {
    hover: {
      backgroundColor: "rgba(255,255,255, 1)",
      border: "5px solid black",
      borderRadius: "50%",
      transition: {
        duration: 0.2,
      },
      scale: [1, 1.2, 1],
    },
    initial: {
      backgroundColor: "rgba(255,255,255, 0)",
      border: "2px solid black",
      borderRadius: "50%",
      transition: {
        duration: 0.2,
      },
      scale: [1, 0.8, 1],
    },
    alreadyAnimated: {
      backgroundColor: "rgba(255,255,255, 1)",
      border: "5px solid black",
      borderRadius: "50%",
    },
  };
  const handleRadioHoverEffect = (hovering: string) => {
    let shouldEffect = shippingInfo.clientType === hovering;
    if (!shouldEffect) {
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
  const user = getUser();
  const userCreds = user?.userName?.split(" ");
  return (
    <div className="cartWrapper__content__payment__group">
      <div className="authRow">
        <h1>Dane do wysyłki</h1>
        <div className="line"></div>
        <div className="shippingForm">
          <div className="orderAs">Zamawiasz jako</div>
          <div
            style={{ justifyContent: "flex-start", marginTop: "15px" }}
            className="shippingForm-row"
          >
            <div className="radioWrapper">
              <motion.div
                onClick={() =>
                  setShippingInfo({
                    ...shippingInfo,
                    clientType: "privatePerson",
                  })
                }
                className="radioCheckbox"
                variants={checkboxVariants}
                whileTap={{ scale: 0.85 }}
                whileHover={handleRadioHoverEffect("privatePerson")}
                onHoverStart={() => setHovered("privatePerson")}
                onHoverEnd={() => setHovered("")}
                animate={
                  isHovered === "privatePerson" ||
                  shippingInfo.clientType === "privatePerson"
                    ? "hover"
                    : "initial"
                }
              />
            </div>
            <motion.div
              onHoverStart={() => setHovered("privatePerson")}
              onHoverEnd={() => setHovered("")}
            >
              <div
                onClick={() =>
                  setShippingInfo({
                    ...shippingInfo,
                    clientType: "privatePerson",
                  })
                }
                className="radioText"
              >
                Osoba prywatna
              </div>
            </motion.div>
            <div className="radioWrapper">
              <motion.div
                style={{ marginLeft: "10px" }}
                onClick={() =>
                  setShippingInfo({
                    ...shippingInfo,
                    clientType: "company",
                  })
                }
                className="radioCheckbox"
                variants={checkboxVariants}
                whileTap={{ scale: 0.85 }}
                whileHover={handleRadioHoverEffect("company")}
                onHoverStart={() => setHovered("company")}
                onHoverEnd={() => setHovered("")}
                animate={
                  isHovered === "company" ||
                  shippingInfo.clientType === "company"
                    ? "hover"
                    : "initial"
                }
              />
            </div>
            <motion.div
              onHoverStart={() => setHovered("company")}
              onHoverEnd={() => setHovered("")}
            >
              <div
                onClick={() =>
                  setShippingInfo({
                    ...shippingInfo,
                    clientType: "company",
                  })
                }
                className="radioText"
              >
                Firma
              </div>
            </motion.div>
          </div>
          <div className="shippingForm-row">
            <Input
              value={shippingInfo.firstName}
              label="Imię"
              width="48%"
              inputName="firstName"
              onChange={handleChange}
            />
            <Input
              value={shippingInfo.lastName}
              label="Nazwisko"
              width="48%"
              inputName="lastName"
              onChange={handleChange}
            />
          </div>
          {width <= 1024 && width > 600 ? (
            <div className="shippingForm-row">
              <Input
                value={shippingInfo.phoneNumber}
                label="Numer telefonu"
                width="48%"
                inputName="phoneNumber"
                onChange={handleChange}
              />
              <Input
                value={shippingInfo.emailAdress}
                label="Adres e-mail"
                width="48%"
                inputName="emailAdress"
                onChange={handleChange}
              />
            </div>
          ) : (
            <>
              {" "}
              <Input
                value={shippingInfo.emailAdress}
                label="Adres e-mail"
                width="100%"
                inputName="emailAdress"
                onChange={handleChange}
              />
              <Input
                value={shippingInfo.phoneNumber}
                label="Numer telefonu"
                width="100%"
                inputName="phoneNumber"
                onChange={handleChange}
              />
            </>
          )}

          <div className="shippingForm-annotation">
            <img src={truck} alt="" style={{ height: "20px" }} />
            <strong>Numer telefonu może przydać się kurierowi</strong>
          </div>
          <div className="shippingForm-row">
            <SelectInput
              handleSelectChange={handleSelectChange}
              value={shippingInfo.country}
            />
          </div>
          <div className="shippingForm-row">
            <Input
              value={shippingInfo.city}
              label="Miejscowość"
              width="48%"
              inputName="city"
              onChange={handleChange}
            />
            <Input
              value={shippingInfo.zipCode}
              label="Kod pocztowy"
              width="48%"
              inputName="zipCode"
              onChange={handleChange}
            />
          </div>
          <div className="shippingForm-row">
            <Input
              value={shippingInfo.street}
              label="Ulica"
              width="48%"
              inputName="street"
              onChange={handleChange}
            />
            <Input
              value={shippingInfo.streetNumber}
              label="Nr domu"
              width="48%"
              inputName="streetNumber"
              onChange={handleChange}
            />
          </div>
          <div className="buttons">
            <button className="buttons-next">Dalej</button>
            {!user && (
              <button
                className="buttons-back"
                onClick={() => {
                  setContinueWithoutLogin(false);
                }}
              >
                Powrót
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
