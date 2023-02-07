import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import useProduct from "../../common/hooks/useProduct";
import { addProductToCart, fetchCart } from "../../common/redux/actions/cart";
import { fetchProducts } from "../../common/redux/actions/product";
import { Image, IProduct } from "../../common/types/types";
import GallerySlider from "./GallerySlider";
import { ImagePreview } from "./Shop";

const SingleProduct = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<any>()
  const searchQuery = searchParams.get("id");
  const product = useProduct(searchQuery!)
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOriginal, setOriginal] = useState(true);
  const [chosenSize, setChosenSize] = useState("");
  const [noSizeAlert, setNoSizeAlert] = useState<boolean>(false);
  const [cartData, setCartData] = useState<any>(JSON.parse(localStorage.getItem("blackbellcart") as string));
  const isOneSizeAvailable: boolean = product && product.arrayOfCopySizes === 1
  const productImages = product?.itemImages?.sort((a: Image, b: IProduct) =>
    a._id === b.primaryImage ? -1 : 1
  );

  function changeOriginOfData(source: string) {
    if (source === "copy") {
      setOriginal(false);
    } else {
      setOriginal(true);
    }
    setChosenSize("");
    setNoSizeAlert(false)
  }

  
  const [downloadedImg, setDownloadedImg] = useState<ImagePreview>({
    isOpen: false,
    thumbnail: "",
    fullHD: "",
    isLoading: false,
  });
  function downloadImage() {
    const primaryImage = product?.itemImages?.find((image: Image) => product?.primaryImage === image._id)
    const storage = getStorage();
    setDownloadedImg({
      ...downloadedImg,
      thumbnail: primaryImage?.thumbnail,
      isLoading: true,
      isOpen: true,
    });
    const imageRef = ref(storage, `images/${primaryImage?.imageName}`);
    getDownloadURL(imageRef).then((url) => {
      setDownloadedImg({
        ...downloadedImg,
        fullHD: url,
        thumbnail: "primary loaded",
        isLoading: false,
        isOpen: true,
      });
    });
  }
  function returnSize(){
    if (!isOneSizeAvailable) {
      return chosenSize
    }else{
      return "Brak rozmiaru do wyboru"
    }
  }

  function addToCart(){
    if(!chosenSize && !isOneSizeAvailable){
      setNoSizeAlert(true)
    }

    const req = {
      productID: product?._id,
      size: `${isOriginal ? "oryginał" : returnSize() }`,
      isOriginal: isOriginal,
      cartID: `${cartData ? cartData.cart._id : ""}`,
      quantity: 1
    }
    if (!isOriginal && !isOneSizeAvailable && !chosenSize) {
      return
    }else{
      dispatch(addProductToCart(req))
      dispatch(fetchCart( { cartID: cartData?.cart?._id }))
    }
  }
  useEffect(() => {
    product && downloadImage()
    !product && dispatch(fetchProducts())
    cartData && dispatch(fetchCart({cartID: cartData?.cart?._id} ))
  },[])

  return (
    <>
      <div className="singleProduct">
        <div className="singleProduct__content">
            <>
              <div className="thumbnails">
                {productImages?.map((image: Image, idx: number) => (
                  <div
                    onClick={() => setActiveIndex(idx)}
                    key={idx}
                    className="thumbnail"
                    style={idx === 0 ? { marginTop: "0px" } : {}}
                  >
                    <img
                      className={activeIndex === idx ? "active" : ""}
                      src={image.thumbnail}
                      alt=""
                    />
                  </div>
                ))}
              </div>
              <GallerySlider
                isImageLoading={downloadedImg.isLoading}
                images={productImages}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
              <div className="productInfo">
                <div className="productInfo__content">
                  <div className="productInfo__content-menu">
                    <button
                      style={{
                        backgroundColor: isOriginal
                          ? "rgb(203, 203, 203)"
                          : "gray",
                      }}
                      onClick={() => changeOriginOfData("original")}
                      className="item"
                    >
                      Oryginał
                    </button>
                    <button
                      onClick={() => changeOriginOfData("copy")}
                      className="item"
                      style={{
                        backgroundColor: isOriginal
                          ? "gray"
                          : "rgb(203, 203, 203)",
                      }}
                    >
                      Druk
                    </button>
                    <div
                      style={{ width: "100%" }}
                      className="productInfo__content-menu"
                    >
                      <div
                        style={{
                          opacity: isOriginal ? "1" : "0",
                        }}
                        className="productInfo__content-marginElement"
                      />
                      <div
                        style={{
                          opacity: !isOriginal ? "1" : "0",
                        }}
                        className="productInfo__content-marginElement"
                      />
                    </div>
                    <div className="productInfo__content-underMenu">
                      <h2> <strong> {product?.itemName} </strong> </h2>
                      <h4>{product?.aboutMaterials}</h4>
                      <h3>{isOriginal || isOneSizeAvailable ? "Rozmiar:" : "Dostępne rozmiary:"}</h3>
                      <div className="sizes">
                        {isOriginal ? (<div style={{border: '2px solid transparent', cursor: "inherit"}} className="sizes-size">{product?.sizeOfOriginal}</div> 
                        ) : (
                        <>
                          <div>{product?.arrayOfCopySizes.map((size: any, idx: number) => (
                            <button
                            key={idx}
                            onClick={isOneSizeAvailable ? undefined : () => setChosenSize(size.sizeOfCopy)}
                            style={{
                              marginLeft: `${idx === 0 ? "0px" : "15px"}`,
                              border: `${
                                chosenSize === size.sizeOfCopy
                                  ? "2px solid black"
                                  : "2px solid transparent"
                              }`,
                              cursor: `${isOneSizeAvailable ? "inherit" : "pointer"}`
                            }}
                            className="sizes-size"
                          >
                            {size.sizeOfCopy}
                          </button>
                        ))}
                      </div>
                      </>
                       )}
                        </div>
                       <div>{noSizeAlert && !isOriginal && !chosenSize && <h4 style={{color:'red'}}>Wybierz rozmiar</h4> }</div>
                      <div className="productInfo__content-underMenu-price">
                        <div className="productInfo__content-underMenu-price-priceValue">
                          <strong className="priceStrong">{isOriginal ? `${product?.itemPrice}zł` : `${product?.copyPrice}zł`}</strong>
                        </div>
                        <div className="productInfo__content-underMenu-price-orderBtn">
                          <button onClick={() => addToCart()}>Zamów z dostawą</button>
                        </div>
                        <div className="productInfo__content-underMenu-price-descriptions">
                          <div className="desc">
                            <h3>{isOriginal ? "Darmowa wysyłka" : "Wysyłka już od 15zł" }</h3>
                          </div>
                          <div className="desc">
                            <h3>Bezpieczne pakowanie</h3>
                          </div>
                        </div>
                      </div>
                      <h3>{product?.isOriginalAvailable && isOriginal ? "Oryginał dostępny." : `Pozostała ilość: ${product?.itemQuantity}`}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </>
        </div>
      
        <div className="itemDesc">
          <h1>Opis</h1>
          <div className="hr"></div>
          <h2 className="itemDesc-description">{product?.itemDescription}</h2>
          <h1>Rozmiary</h1>
          <div className="hr"></div>
          <div className="sizesDesc">
          <div className="sizesDesc-original">
            <h2 className="sizesDesc-headline">Oryginał</h2>
          <h3 style={{paddingBottom:'15px'}} >{product?.sizeOfOriginalInCm}</h3>
          </div>
          <div className="sizesDesc-copy">
            <h2 className="sizesDesc-headline">Druki</h2>
            {product?.arrayOfCopySizesInCm?.map((size: any, idx: number) => (
              <h3 key={idx} style={{paddingBottom:'15px'}} >{size.sizeOfCopyInCm}</h3>
            ))}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
