import { useRef, useState, useEffect } from "react";

interface INav {
  navOffsetRight:any
  setCurrentCategory: (arg: string) => void;
  itemCount: string;
  navMenuContent: any[];
  currentCategory: string;
}

const Nav = (props: INav) => {
  const { setCurrentCategory, itemCount, navMenuContent, currentCategory, navOffsetRight } =
    props;

  const navContentWidth = useRef<any>();
  const [navWidth, setNavWidth] = useState<number>(0);
    useEffect(() => {
      setNavWidth(navContentWidth?.current?.offsetWidth)
    }, [])
     return (
      <div
      style={navContentWidth ? { width:`${navWidth}px` } : {}}
      className="shop__nav"
    >
      <div style={{right:`${navOffsetRight}px`, position:'fixed'}} ref={navContentWidth} className="shop__nav__content">
        <div className="shop__nav__content__list">
          <div className="shop__nav__content__list__categories">
            <h3>Kategorie</h3>
          </div>
          <div
            onClick={() => setCurrentCategory("listAll")}
            className="shop__nav__content__list__item"
          >
            <h3
              style={
                currentCategory === "listAll"
                  ? { textDecoration: "underline" }
                  : {}
              }
            >
              Wszystkie produkty
            </h3>
            <b>{`(${itemCount})`}</b>
          </div>
          {navMenuContent?.map((item: any, idx: number) => (
            <div
              key={idx}
              className="shop__nav__content__list__item"
              onClick={() => setCurrentCategory(item.category)}
            >
              <h3
                style={
                  currentCategory === item.category
                    ? { textDecoration: "underline" }
                    : {}
                }
              >
                {item.category}
              </h3>
              <b>({item.categoryLength})</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nav;
