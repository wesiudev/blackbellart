import { useState } from "react";
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage"

type PreviewProps = {
  deleteHandler: Function;
  quitInput: Function;
  currentImage: string;
  realImageSource: string
  setRealImageSource: Function
};

const ImagePreview = (props: PreviewProps) => {
  const [deleteInsurance, setDeleteInsurance] = useState(false);

  const storage = getStorage();

    function deleteImage() {
      props.deleteHandler()
      // Create a reference to the file to delete
      const imageToDelete = ref(storage, `images/${props.realImageSource}`);
      // Delete the file
      deleteObject(imageToDelete)
    }
  return (
    <div className="imagePreview">
      <div className="imagePreview__content">
        <div className="image">
          <img src={props.currentImage} alt="" />
        </div>
        <div className="buttons">
          {!deleteInsurance ? (
            <button
              onClick={() => setDeleteInsurance(true)}
              style={{ backgroundColor: "#f37b7b", border: "none" }}
              className="btnCancel"
            >
              Usuń zdjęcie
            </button>
          ) : (
            <button
              onClick={() => deleteImage()}
              style={{ backgroundColor: "#f37b7b", border: "none" }}
              className="btnCancel"
            >
              Usunąć?
            </button>
          )}
          <button onClick={() => props.quitInput()} className="btnCancel">
            Wyjście
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
