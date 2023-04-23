import React from "react";

type Loader = {
  loaderStyle: string;
  backgroundColor?: string;
};

const ItemLoader = (props: Loader) => {
  return (
    <div
      className="itemloader"
      style={
        props.loaderStyle === "small"
          ? {
              backgroundColor: props.backgroundColor
                ? props.backgroundColor
                : "white",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              height: "250px",
              alignItems: "center",
            }
          : {}
      }
    >
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default ItemLoader;
