import expand from "../../common/images/expand.png";
import compress from "../../common/images/compress.png";
import close from "../../common/images/close.png";
import { useState } from "react";
interface IPreview {
  previewSrc: string;
  setDownloadedImg: Function;
}

const FullHDPreview = (props: IPreview) => {
  const { previewSrc, setDownloadedImg } = props;
  const [isPreviewExpanded, setPreviewExpanded] = useState<boolean>(false);
  const fullScreen = {
    height: "200%",
  };
  return (
    <div
      style={isPreviewExpanded ? fullScreen : {}}
      className="fullHDPreview__content"
    >
      <div className="preview">
        <img src={previewSrc} alt="" />
        <div
          style={
            isPreviewExpanded
              ? { position: "fixed", opacity: "1", right: "35px" }
              : {}
          }
          className="HDTools"
        >
          <div
            onClick={() => setPreviewExpanded(!isPreviewExpanded)}
            className="HDTools__item"
          >
            <img src={isPreviewExpanded ? compress : expand} alt="" />
          </div>
          <div
            onClick={() => setDownloadedImg({ isOpen: false })}
            className="HDTools__item"
          >
            <img src={close} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullHDPreview;
