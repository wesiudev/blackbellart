import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useCart from "../../../common/hooks/useCart";
import useWindowDimensions from "../../../common/hooks/useWindowDimensions";
import { deleteProductFromCart } from "../../../common/redux/actions/cart";
import { useState } from "react";
import NewCustomer from "./elements/newCustomer";
import getUser from "../../../common/hooks/getUser";
import { Form } from "./elements/ShippingDetails/Form";
import { RegisterForm } from "./elements/ShippingDetails/RegisterForm";

export const CartPage = () => {
  const dispatch = useDispatch<any>();
  const { width } = useWindowDimensions();
  const cart = useCart();
  //utils
  const createPriceFromNumber = (a: number) => {
    return a.toFixed(2).toString().replace(/\./g, ",");
  };
  //cart interactions
  const removeFromCart = (orderID: string) => {
    const req = {
      cartID: cart?.cart?._id,
      orderID: orderID,
    };
    dispatch(deleteProductFromCart(req));
  };
  //cart infos
  const cartSummary = cart?.cart?.products
    ?.map((product: any) =>
      product.isOriginal
        ? product?.product.itemPrice
        : product?.product.copyPrice
    )
    .reduce((a: any, b: any) => a + b, 0);
  const isFreeShipping = cartSummary > 250;
  //user session
  const [continueWithoutLogin, setContinueWithoutLogin] =
    useState<boolean>(false);
  const [isManualRegister, setManualRegister] = useState<boolean>(false);
  const user = getUser();
  return (
    <>
      <div className="cartHeadline responsiveWidth">
        <div className="cartHeadline__title">
          <strong>Twój koszyk</strong>
        </div>
        <div className="cartHeadline__backBtn">
          <Link to="/shop">
            <motion.div
              className="cartHeadline__backBtn__btn"
              whileTap={{ scale: 1 }}
              whileHover={{
                position: "relative",
                zIndex: 1,
                scale: [1, 0.8, 1.1],
                backgroundColor: "rgb(255, 175, 0)",
                borderRadius: "10px",
                transition: {
                  duration: 0.2,
                },
              }}
            >
              {width < 600 ? "Powrót" : "Kontynuuj zakupy"}
            </motion.div>
          </Link>
        </div>
      </div>
      <div className="cartWrapper responsiveWidth">
        <div className="cartWrapper__content">
          <div className="cartWrapper__content__items">
            {cart?.cart?.products?.map((product: any, idx: number) => (
              <div
                key={idx}
                className={`cartWrapper__content__items__item ${
                  idx === 0 && "radius5px"
                }`}
              >
                <button>
                  <Link to={`/shop/product?id=${product?.product._id}`}>
                    <div className="cartWrapper__content__items__item__thumbnail">
                      <img
                        src={product?.product.itemImages[0].thumbnail}
                        alt=""
                      />
                    </div>
                  </Link>
                </button>
                <div className="cartWrapper__content__items__item__details">
                  <div className="row">
                    <div>
                      <Link to={`/shop/product?id=${product?.product._id}`}>
                        <b className="pointer">
                          {product?.product.itemName}
                          {!product?.isOriginal ? ` (druk) ` : ` (oryginał) `}
                        </b>
                      </Link>
                    </div>
                    <div>
                      <b>
                        {product?.isOriginal
                          ? `${product?.product.itemPrice}zł`
                          : `${product?.product.copyPrice}zł`}
                      </b>
                    </div>
                  </div>
                  <div className="row">
                    <b className="gray-font16">
                      {product.isOriginal
                        ? product?.product.sizeOfOriginal
                        : product?.product.arrayOfCopySizes.length === 1
                        ? product?.product.arrayOfCopySizes[0].sizeOfCopy
                        : product?.size}
                    </b>
                  </div>
                  <div className="row bottom">
                    <div className="quantity">Ilość: 1</div>
                    <div className="btnRemove">
                      <button
                        className="pointer"
                        onClick={() => removeFromCart(product?.orderID)}
                      >
                        Usuń
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="cartWrapper__content__items__summary">
              <div className="row">
                <b>Produkty</b>
                <b>{createPriceFromNumber(cartSummary * 0.77)}zł</b>
              </div>
              <div className="row">
                <b>Dostawa</b>
                <b>{isFreeShipping ? "0,00" : "15,50"}zł</b>
              </div>
              <div className="row">
                <b>VAT</b>
                <b>
                  {isFreeShipping
                    ? createPriceFromNumber(cartSummary * 0.23)
                    : createPriceFromNumber(cartSummary * 0.23 + 15.5 * 0.23)}
                  zł
                </b>
              </div>
            </div>
            <div
              style={{ borderTop: "1px solid black" }}
              className="cartWrapper__content__items__summary gray20-border"
            >
              <div className="row">
                <b>Podsumowanie</b>
                <b>
                  {isFreeShipping
                    ? createPriceFromNumber(cartSummary)
                    : createPriceFromNumber(cartSummary + 15.5)}
                  zł
                </b>
              </div>
            </div>
          </div>
          <div className="cartWrapper__content__payment">
            {!user && !continueWithoutLogin && !isManualRegister && (
              // ### user auth for the checkout page
              <NewCustomer
                setContinueWithoutLogin={setContinueWithoutLogin}
                setManualRegister={setManualRegister}
              />
            )}
            {(user || continueWithoutLogin) && ( // ### shipping details form
              <Form setContinueWithoutLogin={setContinueWithoutLogin} />
            )}
            {!user &&
              isManualRegister && ( // ### register form
                <RegisterForm setManualRegister={setManualRegister} />
              )}
          </div>
        </div>
      </div>
    </>
  );
};
