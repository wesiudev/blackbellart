import React from "react";
import {
  IProduct,
  ISubCategory,
} from "../../../../../../common/types/types";

type SubCategoriesEditor = {
  subCategories: any;
  item: IProduct;
  attributeToChange: string;
  currentInputValue: string;
  subCategoryToAdd: string;
  setSubCategoryToAdd: Function;
  createSubcategory: Function;
  handleSubcategorySelection: Function;
};

const EditSubCategories = (props: SubCategoriesEditor) => {
  const array = props?.subCategories?.data?.filter(
    (subCategory: ISubCategory) =>
      subCategory?.relatedCategoryName === props?.item?.itemCategoryName
  );

  return (
    <div className="modal">
      {props.attributeToChange === "subCategory" && (
        <div className="modal__subCategory">
          Podkategorie
          <hr />
          {array?.length ? (
            <div className="modal__subCategory__items">
              {array?.map((item: ISubCategory, idx: number) => (
                <div
                  style={
                    props.currentInputValue === item.subCategoryName
                      ? { backgroundColor: "#cfcfcf" }
                      : {}
                  }
                  key={idx}
                  className="modal__subCategory__items__item"
                  onClick={() =>
                    props.handleSubcategorySelection(item.subCategoryName)
                  }
                >
                  {item.subCategoryName}{" "}
                  {props?.item?.subCategory === item.subCategoryName ? (
                    <div style={{ color: "green", opacity: ".75" }}>
                      {"(aktywna)"}
                    </div>
                  ) : (
                    <div style={{ color: "grey", opacity: ".75" }}>
                      {"(nieaktywna)"}
                    </div>
                  )}
                </div>
              ))}
              <hr />
            </div>
          ) : (
            <div className="noData">
              <h2>Brak podkategorii.</h2>
            </div>
          )}
          <div className="inputRow">
            <input
              autoFocus
              onChange={(e) => props.setSubCategoryToAdd(e.target.value)}
              type="text"
              placeholder="Nazwa podkategorii"
              value={props.subCategoryToAdd}
            />
            <button
              onClick={() => props.createSubcategory()}
              className="btnSave"
            >
              Dodaj
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditSubCategories;
