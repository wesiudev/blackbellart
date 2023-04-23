import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../common/redux/actions/categories";
import { fetchProducts } from "../../common/redux/actions/product";
import { getSubCategories } from "../../common/redux/actions/subCategories";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import backImg from "../../common/images/arrow.png";
import {
  ICategory,
  Image,
  IProduct,
  ISubCategory,
} from "../../common/types/types";
import ListAll from "./ListAll";
import ListSingleCategory from "./ListSingleCategory";
import Nav from "./Nav";
import NavLoading from "./NavLoading";
import ShopLoading from "./ShopLoading";
import ItemLoader from "../AdminTools/elements/productEditor/elements/itemLoader/itemLoader";
import FullHDPreview from "./FullHDPreview";

export interface ImagePreview {
  isOpen: boolean;
  thumbnail: string;
  fullHD: string;
  isLoading: boolean;
}

const Shop = () => {
  //data display / modification
  const dispatch: any = useDispatch();

  const [currentCategory, setCurrentCategory] = useState<string>("listAll");
  const { categories } = useSelector((state: any) => state.categories);
  const { subCategories } = useSelector((state: any) => state.subCategories);
  const { products } = useSelector((state: any) => state.products);
  const isFetching = useSelector((state: any) => state.products.fetching);

  const shopData = {
    content: categories?.data?.map((category: ICategory) => ({
      categoryName: category.categoryName,
      categoryId: category._id,
      products: products?.data?.filter(
        (product: IProduct) =>
          product.itemCategoryName === category.categoryName
      ),
      subCategories: category.subCategories.map(
        (subCategory: ISubCategory) => ({
          subCategoryName: subCategory.subCategoryName,
          subCategoryId: subCategory._id,
          products: products?.data?.filter(
            (product: IProduct) =>
              product.subCategory === subCategory.subCategoryName
          ),
        })
      ),
    })),
  };
  const navMenuContent = shopData?.content?.map((array: any) => ({
    category: array?.categoryName,
    categoryLength: array?.products?.length,
    subCategories: array?.subCategories?.map((item: any) => ({
      subCategoryItems: item,
      subCategoryLength: item?.products?.length,
    })),
  }));

  useEffect(() => {
    !categories?.data?.length && dispatch(getCategories());
    !subCategories?.data?.length && dispatch(getSubCategories());
    !products?.data?.length && dispatch(fetchProducts());
  }, []);

  //query
  const navigate = useNavigate();
  function setQuery(id: string) {
    navigate({
      pathname: "product",
      search: `?${createSearchParams({
        id: id,
      })}`,
    });
  }
  //design
  const feedOffsetLeft = useRef<HTMLDivElement>(null);

  const [navOffsetRight, setNavOffsetRight] = useState<any>();
  const [downloadedImg, setDownloadedImg] = useState<ImagePreview>({
    isOpen: false,
    thumbnail: "",
    fullHD: "",
    isLoading: false,
  });
  function downloadImage(source: Image) {
    const storage = getStorage();
    setDownloadedImg({
      ...downloadedImg,
      thumbnail: source.thumbnail,
      isLoading: true,
      isOpen: true,
    });
    const imageRef = ref(storage, `images/${source.imageName}`);
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
  window.addEventListener("resize", () => {
    setNavOffsetRight(feedOffsetLeft?.current?.offsetLeft!);
  });

  useEffect(() => {
    setNavOffsetRight(feedOffsetLeft?.current?.offsetLeft!);
  }, []);
  return (
    <>
      <div className="shopNav responsiveWidth">
        <Link to="/" className="buttonBack">
          {" "}
          <img src={backImg} alt="" />{" "}
          <div className="buttonBack__text"> Strona główna</div>
        </Link>
      </div>
      <div className="shop">
        {downloadedImg?.isOpen && (
          <>
            <div className="fullHDPreview">
              {downloadedImg.isLoading && <ItemLoader loaderStyle="fixed" />}
              <FullHDPreview
                previewSrc={
                  downloadedImg.fullHD
                    ? downloadedImg.fullHD
                    : downloadedImg.thumbnail
                }
                setDownloadedImg={setDownloadedImg}
              />
            </div>
          </>
        )}

        <div ref={feedOffsetLeft} className="shop__feed">
          {isFetching ? (
            <ShopLoading />
          ) : (
            <>
              {currentCategory === "listAll" ? (
                <ListAll
                  products={products?.data}
                  downloadImage={downloadImage}
                  setQuery={setQuery}
                />
              ) : (
                <div>
                  <ListSingleCategory
                    shopData={shopData?.content}
                    currentCategory={currentCategory}
                    downloadImage={downloadImage}
                    setQuery={setQuery}
                  />
                </div>
              )}
            </>
          )}
        </div>
        {isFetching ? (
          <NavLoading />
        ) : (
          <Nav
            navOffsetRight={navOffsetRight ? navOffsetRight : null}
            navMenuContent={navMenuContent}
            itemCount={products?.data?.length}
            setCurrentCategory={setCurrentCategory}
            currentCategory={currentCategory}
          />
        )}
      </div>
    </>
  );
};

export default Shop;
