import { useState } from "react";

interface IFeedItem {
  data: any;
  setActionType: Function;
  deleteColor: Function;
  editProduct: Function;
  label: string;
  name: string;
  headline: string;
}

const ArrayColors = (props: IFeedItem) => {
  const [deleteInsurance, setDeleteInsurance] = useState<boolean>(false);
  const [colorToDelete, setColorToDelete] = useState<string>("");
  function deleteItem(id: string, color: string) {
    setDeleteInsurance(true);
    setColorToDelete(color);
    props.deleteColor(id);
  }

  return (
    <div className="feedItem">
      <div className="feedItem__headline">
        <h3>{props.headline}</h3>
        <button
          name={props.name}
          id={props.label}
          onClick={(e) => props.setActionType(e)}
        >
          {" "}
          (dodaj)
        </button>
      </div>
      <div>
        {!props?.data?.length ? (
          "Brak kolorów."
        ) : (
          <div className="map">
            {props?.data?.map((item: any, idx: number) => (
              <div  key={idx}>
                <div
                  onClick={() => deleteItem(item._id, item.color)}
                  style={{ backgroundColor: `${item.color}`,border:'1px solid rgb(99,99,99)' }}
                  className="map__color"
                ></div>
                {deleteInsurance && colorToDelete === item.color ? (
                  <>
                    {" "}
                    <button
                      onClick={() => props.editProduct()}
                      style={{ backgroundColor: "#f37b7b", border: "none" }}
                      className="btnCancel"
                    >
                      Usunąć kolor?
                    </button>
                    <button
                      onClick={() => setDeleteInsurance(false)}
                      className="btnSave"
                    >
                      Nie usuwaj
                    </button>{" "}
                  </>
                ) : null}
              </div>
            ))}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrayColors;
