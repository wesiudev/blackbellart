import React from "react";
import { Image, IProduct } from "../../common/types/types";
import cart from "../../common/images/cart.png";
import preview from "../../common/images/hd.png";

interface ISingleCategory {
  shopData: any[];
  currentCategory: string;
  downloadImage: Function;
  setQuery: Function;
}

const ListSingleCategory = (props: ISingleCategory) => {
  const { shopData, currentCategory, downloadImage, setQuery } = props;

  return (
    <>
      {shopData?.map((category: any, idx: number) => (
        <div key={idx} className="category">
          <>
            {category.categoryName === currentCategory && (
              <>
                <div className="category__title">
                  <h1>{category.categoryName}</h1>
                </div>
                <div className="category__items">
                  {category?.products?.map((item: IProduct, idx: number) => (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuery(item._id);
                      }}
                      key={idx}
                      className="category__items__item"
                    >
                      {item.itemImages.map((image: any, idx: number) => (
                        <div key={idx}>
                          {image._id === item.primaryImage ? (
                            <div className="image">
                              <div className="image__open">
                                <div
                                  className="image__open__tool"
                                  style={{ marginRight: "0px" }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    downloadImage(
                                      item?.itemImages.find(
                                        (image: Image) =>
                                          image._id === item.primaryImage
                                      )
                                    );
                                  }}
                                >
                                  <img id="cart" src={preview} alt="" />
                                </div>
                                <div className="image__open__tool">
                                  <img id="cart" src={cart} alt="" />
                                </div>
                              </div>
                              <img
                                id="thumbnail"
                                src={image.thumbnail}
                                alt=""
                              />
                            </div>
                          ) : null}
                        </div>
                      ))}
                      <div className="underImage">
                        <div className="topSide">
                          <span>{item.itemName}</span>
                          <span>{item.itemPrice}zł</span>
                        </div>
                        <div className="desc">{item.itemDescription}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        </div>
      ))}
    </>
  );
};

export default ListSingleCategory;
