import { useState } from "react";
import FacebookSDK from "./Authentications/facebookSDK";
import GoogleSDK from "./Authentications/googleSDK";

interface ComponentProps {
  setContinueWithoutLogin: (...arg: any) => void;
  setManualRegister: (...arg: any) => void;
}

const NewCustomer: React.FC<ComponentProps> = ({
  setContinueWithoutLogin,
  setManualRegister,
}) => {
  return (
    <div className="cartWrapper__content__payment__group">
      <div className="authRow">
        <h1>Nowy klient</h1>
        <div className="line"></div>
        <p className="customerInfo">
          Jeśli jeszcze nie zamawiałeś ze sklepu blackbellart możesz się
          zarejestrować lub kontynuować płatność bez logowania.
        </p>
        <div className="checkout-buttons">
          <button
            onClick={() => setManualRegister(true)}
            className="registerBtn"
          >
            Zarejestruj się i zamów
          </button>
          <div className="decoration">
            <div className="line2"></div>
            <div>
              <h1 style={{ fontSize: "16px" }}>lub</h1>
            </div>
            <div className="line2"></div>
          </div>
          <button
            className="proceedBtn"
            onClick={() => setContinueWithoutLogin(true)}
          >
            Kontynuuj bez logowania
          </button>
        </div>
      </div>
      <div style={{ marginTop: "40px" }} className="authRow">
        <h1>Logowanie</h1>
        <div className="line"></div>
        <FacebookSDK />
        <GoogleSDK />
      </div>
    </div>
  );
};

export default NewCustomer;
