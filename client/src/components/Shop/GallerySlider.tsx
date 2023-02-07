import { Image } from "../../common/types/types";

interface IGallery {
  images: Image[];
  activeIndex: number;
  setActiveIndex: Function;
  isImageLoading: boolean;
}

const GallerySlider = (props: IGallery) => {
  const { images, activeIndex, setActiveIndex, isImageLoading } = props;

  return (
    <>
      <div
        className="gallery"
      >
        {images?.map((image: Image, idx: number) => (
          <div
            key={idx}
            className="item"
            style={{
              visibility: `${activeIndex === idx ? "visible" : "hidden"}`,
              display: `${activeIndex === idx ? "block" : "none"}`,
            }}
          >
            <img
              src={isImageLoading ? image.thumbnail : image.imageUrl}
              alt=""
            />
          </div>
        ))}
        <div
          className="thumbnails-mobile"
        >
          {images?.map((image: Image, idx: number) => (
            <div
              onClick={() => setActiveIndex(idx)}
              key={idx}
              className="thumbnails-mobile-thumbnail"
              style={idx === 0 ? { marginTop: "0px", marginLeft: "0px" } : {}}
            >
              <img
                className={activeIndex === idx ? "active" : ""}
                src={image.thumbnail}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GallerySlider;
