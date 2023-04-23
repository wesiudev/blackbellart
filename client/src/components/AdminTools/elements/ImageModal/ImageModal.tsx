import React, { useRef, useState } from "react";
import FileBase from "react-file-base64";

interface ChosenImg {
  name: string;
  size: number;
  src: string;
}
const ImageModal = () => {
  //ref to img
  const imageRef = useRef<HTMLImageElement>(null);
  const imagePreviewRef = useRef<HTMLImageElement>(null);
  //base64
  const fileBaseRef = useRef<HTMLInputElement>(null);
  //local img
  const [chosenImg, setChosenImg] = useState<ChosenImg>({
    name: "",
    size: 0,
    src: "",
  });
  //image translateX limits
  const [imagePreviewLimits, setImagePreviewLimits] = useState<{
    maxLeft: number | undefined;
    maxRight: number | undefined;
  }>({ maxLeft: 0, maxRight: 0 });
  //store user input
  const [imageTransform, setImageTransform] = useState<number>(0);
  //editor visiblitiy
  const [isEditorVisible, setEditorVisibility] = useState<boolean>(false);
  //### FUNCTIONS ###
  function moveImage(e: React.MouseEvent<HTMLDivElement, MouseEvent> | any) {
    //get X on the first click
    const startPosition = { x: e.pageX };
    //user moves a mouse
    function onMouseMove(mouseMoveEvent: MouseEvent) {
      if (imagePreviewLimits.maxLeft && imagePreviewLimits.maxRight) {
        if (
          //if image didn't break the limits
          mouseMoveEvent.pageX - startPosition.x > imagePreviewLimits.maxLeft &&
          mouseMoveEvent.pageX - startPosition.x < -imagePreviewLimits.maxRight
        ) {
          //set image movement to the local store and prepare for the database onboarding
          const currentTranslateX = mouseMoveEvent.pageX - startPosition.x;
          setImageTransform(currentTranslateX);
        } else {
          return;
        }
      } else {
        return;
      }
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
    }
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  }

  function handleImageUpload(base64: any) {
    setChosenImg({
      name: base64.name,
      size: base64.file.size,
      src: base64.base64,
    });
    setTimeout(() => {
      setImagePreviewLimits({
        maxLeft: imagePreviewRef?.current?.offsetLeft,
        maxRight: imagePreviewRef?.current?.offsetLeft,
      });
    }, 200);
    setEditorVisibility(true);
  }
  function handleEditorClose() {
    setEditorVisibility(false);
    setChosenImg({ ...chosenImg, src: "" });
  }
  function handleSubmit() {
    alert(
      `user input was img name: ${chosenImg.name}, move: ${imageTransform}`
    );
    setEditorVisibility(false);
  }

  const imgPreviewStyle = {
    transform: `translateX(${imageTransform}px)`,
  };
  return (
    <>
      <div style={{ width: "100%", height: "100px", margin: "25px" }}>
        <FileBase
          ref={fileBaseRef}
          type="file"
          multiple={false}
          onDone={(base64: any) => handleImageUpload(base64)}
        />
      </div>
      {isEditorVisible ? (
        <div className="editor">
          <div className="editor__content">
            <div className="editor__content__wrapper">
              <div
                onMouseDown={(e) => moveImage(e)}
                className="editor__content__wrapper__image"
              >
                <img
                  style={imgPreviewStyle}
                  ref={imagePreviewRef}
                  src={chosenImg.src}
                  alt=""
                />
              </div>
            </div>
            <div className="editor__content__tools">
              <div className="info">
                {chosenImg ? chosenImg.name : "Nie wybrano obrazu"}
              </div>
              <div className="editor__content__tools__menager">
                <div className="tools"></div>
                <div className="buttons">
                  <button onClick={handleEditorClose} className="btnCancel">
                    ANULUJ
                  </button>
                  <button onClick={() => handleSubmit()}>ZAPISZ</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ImageModal;
