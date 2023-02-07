import { useState } from "react";

interface IFeedItem {
  data: any;
  setActionType: Function;
  deleteSize: Function;
  editProduct: Function;
  label: string;
  name: string;
  headline: string;
}

const ArraySizes = (props: IFeedItem) => {
  const [deleteInsurance, setDeleteInsurance] = useState<boolean>(false);
  const [sizeToDelete, setSizeToDelete] = useState<string>("");
  function deleteItem(id: string, size: string) {
    setDeleteInsurance(true);
    setSizeToDelete(size);
    props.deleteSize(id);
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
          "Brak rozmiarów."
        ) : (
          <div className="map">
            {props?.data?.map((item: any) => (
              <div key={item._id} style={{alignItems: 'center'}}>
                <div
                style={{height:'25px',borderRadius:'5px',backgroundColor:'rgb(99,99,99)', color:'white',textAlign:'center',padding:'0 5px', cursor:'pointer'}}
                  onClick={() => deleteItem(item._id, item.size)}
                  className="map__item"
                >{item.size}</div>
                {deleteInsurance && sizeToDelete === item.size ? (
                  <>
                    {" "}
                    <button
                      onClick={() => props.editProduct()}
                      style={{ height:'25px', backgroundColor: "#f37b7b", border: "none" }}
                      className="btnCancel"
                    >
                      Usunąć?
                    </button>
                    <button
                    style={{height:'25px', }}
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

export default ArraySizes;
