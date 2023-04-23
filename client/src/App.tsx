import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Contact from "./components/Contact/Contact";
import Shop from "./components/Shop/Shop";
import Gallery from "./components/Gallery/Gallery";
import Admin from "./components/Admin/Admin";
import { ParallaxProvider } from "react-scroll-parallax";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "./components/Loader/Loader";
import "./styles/index.css";
import Footer from "./components/Footer/Footer";
import DisplayProduct from "./components/Shop/DisplayProduct";
import { CartPage } from "./components/Cart/CartPage/CartPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import i18n from "./common/translation/translation";
import { I18nextProvider } from "react-i18next";
import NoMatch from "./NoMatch";
export default function App() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  setTimeout(() => {
    setIsFirstLoad(false);
  }, 2800);
  return (
    <I18nextProvider i18n={i18n}>
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
        <ParallaxProvider>
          <BrowserRouter>
            <Wrapper>
              <Header />
              {/* {isFirstLoad ? (
              <Loader visible={true} />
            ) : (
              <Loader visible={false} />
            )} */}
              <Routes>
                <Route path="/" element={Home(isFirstLoad)} />
                <Route path="/gallery" element={Gallery()} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/shop/:id" element={<DisplayProduct />} />
                <Route path="*" element={<NoMatch />} />
              </Routes>
            </Wrapper>
          </BrowserRouter>
          <Footer />
        </ParallaxProvider>
      </GoogleOAuthProvider>
    </I18nextProvider>
  );
}

const Wrapper = ({ children }: any) => {
  const location = useLocation();
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};
