import { Image } from "../../../../../../common/types/types";

interface IFeedItem {
  data: any;
  setActionType: Function;
  label: string;
  name: string;
  headline: string;
  openImagePreview: Function;
  setImageUploadOpened: Function;
  setRealImageSource: Function
}

const ImagesItem = (props: IFeedItem) => {
  
  function openPreview(thumbnail: string, id: string, realPicture: string) {
    props.openImagePreview(thumbnail, id)
    props.setRealImageSource(realPicture)
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
          "Brak zdjęć produktu."
        ) : (
          <div className="map">
            {props?.data?.map((image: Image) => (
              <div
              key={image._id}
                onClick={() =>
                  openPreview(image.thumbnail, image._id, image.realPicture)
                }
                className="map__item"
              >
                <img src={image.thumbnail} alt="" />
              </div>
            ))}{" "}
            {props.name === "itemPrice" ? "PLN" : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagesItem;
