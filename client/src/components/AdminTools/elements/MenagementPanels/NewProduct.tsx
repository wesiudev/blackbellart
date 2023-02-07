import { useState, useEffect } from "react";
import Select from "../SelectInput/select";
import { getCategories } from "../../../../common/redux/actions/categories";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../../common/redux/actions/product";
import Resizer from "react-image-file-resizer";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import MiniLoader from "../productEditor/elements/itemLoader/miniLoader";

type imageObject = {
  thumbnail: string;
  imageName: string;
  imageUrl: string
};
type imageNames = {
  name: string;
  firebaseName: string;
};

type sizeOfCopyInCm = { sizeOfCopyInCm: string };
type sizeOfCopy = { sizeOfCopy: string };
type color = { color: string };

type Product = {
  itemName: string | undefined;
  itemPrice: number | null;
  itemDescription: string | undefined;
  itemQuantity: number | null;
  isOriginalAvailable: boolean;
  sizeOfOriginal: string | undefined;
  sizeOfOriginalInCm: string | undefined;
  arrayOfCopySizes:sizeOfCopy[];
  arrayOfCopySizesInCm: sizeOfCopyInCm[];
  copyPrice: number | null;
  aboutMaterials: string | undefined;
  itemColor: color[] | undefined;
  
};

export const NewProduct = () => {
  const dispatch: any = useDispatch();
  //firebase
  const storage = getStorage();
  const [itemImages, setImageItems] = useState<imageObject[]>([]);
  const [imageNames, setImageNames] = useState<imageNames[]>([]);
  const [category, setCategory] = useState<string>("");
  const [currentlyLoadingImage, setCurrentlyLoadingImage] =
    useState<string>("");
  const [copySizeInput, setCopySizeInput] = useState<sizeOfCopy>({ sizeOfCopy: "" });
  const [sizeInCmInput, setSizeInCmInput] = useState<sizeOfCopyInCm>({ sizeOfCopyInCm: "" });
  const [LocalArrayOfCopySizes, setLocalArrayOfCopySizes] = useState<sizeOfCopy[]>([]);
  const [LocalArrayOfCopySizesInCm, setLocalArrayOfCopySizesInCm] = useState<sizeOfCopyInCm[]>([]);
  const [colorInput, setColorInput] = useState<color>({ color: "#ffffff" });
  const [arrayOfColors, setArrayOfColors] = useState<color[]>([]);
  const { categories } = useSelector((state: any) => state.categories);

  const [
    { itemName, itemPrice, itemDescription, itemQuantity, isOriginalAvailable, sizeOfOriginal,sizeOfOriginalInCm, arrayOfCopySizes, arrayOfCopySizesInCm, copyPrice,aboutMaterials, itemColor },
    setProductData,
  ] = useState<Product>({
    itemName: "",
    itemPrice: 0,
    itemDescription: "",
    itemQuantity: 0,
    isOriginalAvailable: true,
    sizeOfOriginal: "",
    sizeOfOriginalInCm:"",
    arrayOfCopySizes: [],
    arrayOfCopySizesInCm: [],
    copyPrice: 0,
    aboutMaterials: "",
    itemColor: [],
  });

  function createProduct() {
    const req = {
      category,
      itemName,
      itemPrice,
      itemDescription,
      itemQuantity,
      isOriginalAvailable,
      sizeOfOriginal: sizeOfOriginal,
      sizeOfOriginalInCm: sizeOfOriginalInCm,
      arrayOfCopySizes: LocalArrayOfCopySizes,
      arrayOfCopySizesInCm: LocalArrayOfCopySizesInCm,
      itemColor: arrayOfColors,
      copyPrice,
      aboutMaterials,
      itemImages,
    };
    dispatch(addProduct(req));
    dispatch(getCategories());
    setProductData({
      itemName: "",
      itemPrice: 0,
      itemDescription: "",
      itemQuantity: 0,
      isOriginalAvailable,
      aboutMaterials: "",
      copyPrice: 0,
      arrayOfCopySizes: [],
      arrayOfCopySizesInCm: [],
      sizeOfOriginal: "",
      sizeOfOriginalInCm: "",
      itemColor: [],
    });
    setArrayOfColors([]);
    setColorInput({ color: "#ffffff" });
    setLocalArrayOfCopySizes([]);
    setLocalArrayOfCopySizesInCm([]);
    setImageItems([]);
    setImageNames([]);
    setCategory("");
  }

  const resizeImageForFirebase = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1000,
        1000,
        "png",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const resizeImageForMongo = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        400,
        "png",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const addImageToUserInput = async (e: any) => {
    try {
      if (!e.target.files[0]) return;
      const fireBaseImage: any = await resizeImageForFirebase(
        e.target.files[0]
      );
      const mongoImage: any = await resizeImageForMongo(e.target.files[0]);
      //in pseudo randomness we trust 🙏
      const pseudoRandomName = Math.floor(
        Math.random() * 9999 * 100
      ).toString();
      setImageNames((imageNames) => [
        ...imageNames,
        { name: fireBaseImage.name, firebaseName: pseudoRandomName },
      ]);
      const imageRef = ref(storage, `images/image-${pseudoRandomName}`);
      setCurrentlyLoadingImage(pseudoRandomName);

      uploadBytes(imageRef, fireBaseImage).then(() =>
        getDownloadURL(imageRef).then((url) => {
          setImageItems((itemImages) => [
            ...itemImages,
            {
              thumbnail: mongoImage,
              imageName: `image-${pseudoRandomName}`,
              imageUrl: url
            },
          ]);
          setCurrentlyLoadingImage("");
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleTextInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setProductData({
      itemName,
      itemPrice,
      itemDescription,
      itemQuantity,
      isOriginalAvailable,
      arrayOfCopySizes,
      sizeOfOriginal,
      sizeOfOriginalInCm,
      arrayOfCopySizesInCm,
      aboutMaterials,
      copyPrice,
      itemColor,
      [e.target.name]: e.target.value,
    });
  };

  const categoryOptions = categories?.data?.map((itemName: any, i: number) => ({
    itemName: itemName.categoryName,
    itemId: `${i + 1}`,
  }));

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  function deleteImage(name: string) {
    console.log(name);
    // Create a reference to the file to delete
    const imageToDelete = ref(storage, `images/image-${name}`);
    // Delete the file
    let newArrayOfNames = imageNames.filter(
      (image) => image.firebaseName !== name
    );
    setImageNames(newArrayOfNames);
    deleteObject(imageToDelete);
  }

  function addSizeToArray(e: any, array: string /* possible arrays: cm (for centimeters used in product desc) or copy (e.g. 30x40) */) {
    e.preventDefault();
    if(array === "copy"){
    setLocalArrayOfCopySizes((LocalArrayOfCopySizes) => [
      ...LocalArrayOfCopySizes,
      { sizeOfCopy: copySizeInput.sizeOfCopy },
    ]);
    setCopySizeInput({ sizeOfCopy: "" });
    }else if(array === "cm") {
      setLocalArrayOfCopySizesInCm((LocalArrayOfCopyInCm) => [
        ...LocalArrayOfCopyInCm,
        { sizeOfCopyInCm: sizeInCmInput.sizeOfCopyInCm },
      ]);
      setSizeInCmInput({ sizeOfCopyInCm: "" });
    }
  }

  function deleteSize(size: string, array: string /* possible arrays: cm (for centimeters used in product desc) or copy (e.g. 30x40) */) {
    if(array === "copy"){
      let newArrayOfSizes = LocalArrayOfCopySizes.filter((item) => item.sizeOfCopy !== size);
      setLocalArrayOfCopySizes(newArrayOfSizes);
    }else if (array === "cm"){
      let newArrayOfSizes = LocalArrayOfCopySizesInCm.filter((item) => item.sizeOfCopyInCm !== size);
      setLocalArrayOfCopySizesInCm(newArrayOfSizes);
    }
  }

  function addColorToArray(e: any) {
    e.preventDefault();
    setArrayOfColors((arrayOfColors) => [
      ...arrayOfColors,
      { color: colorInput.color },
    ]);
    setColorInput({ color: "#ffffff" });
  }

  function deleteColor(size: string) {
    let newArrayOfColors = arrayOfColors.filter((item) => item.color !== size);
    setArrayOfColors(newArrayOfColors);
  }

  return (
    <div className="newProduct">
      <div className="newProduct__content">
        <div className="newProduct__content__row">
          <Select options={categoryOptions} onSelect={setCategory} />
          <input
            type="file"
            multiple={false}
            onChange={(e: any) => addImageToUserInput(e)}
          />
          <div>
            {imageNames?.length > 0 && <h3>Wybrane zdjęcia:</h3>}
            <ol>
              {imageNames.map((item: any, idx: number) => (
                <li key={idx}>
                  {idx + 1 + ". "}
                  {item.name && item.name.length > 32
                    ? item.name.substring(0, 33) + "..."
                    : item.name}
                  {currentlyLoadingImage === item.firebaseName ? (
                    <MiniLoader />
                  ) : (
                    <div
                      onClick={() => deleteImage(item.firebaseName)}
                      className="btnRemove"
                    >
                      X
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="newProduct__content__inputs">
          <div className="newProduct__content__inputs__text">
            <div className="newProduct__content__inputs__text__input">
              <label htmlFor="itemName">Nazwa</label>
              <input
                value={itemName}
                onChange={handleTextInput}
                type="text"
                name="itemName"
              />
            </div>
            <div className="newProduct__content__inputs__text__input">
              <label htmlFor="itemPrice">Cena (bez waluty)</label>
              <input
                value={itemPrice!}
                onChange={handleTextInput}
                type="text"
                name="itemPrice"
              />
            </div>
            <div className="newProduct__content__inputs__text__input">
              <label htmlFor="copyPrice">Cena za kopię (bez waluty)</label>
              <input
                value={copyPrice!}
                onChange={handleTextInput}
                type="text"
                name="copyPrice"
              />
            </div>
            <div className="newProduct__content__inputs__text__input">
              <label htmlFor="itemQuantity">Ilość produktu</label>
              <input
                value={itemQuantity!}
                onChange={handleTextInput}
                type="text"
                name="itemQuantity"
              />
            </div>
            <div className="newProduct__content__inputs__text__input">
              <label htmlFor={itemDescription}>Opis</label>
              <input
                value={itemDescription}
                onChange={handleTextInput}
                type="text"
                name="itemDescription"
              />
            </div>
            <div className="newProduct__content__inputs__text__input">
              <label htmlFor={aboutMaterials}>O materiale i farbach</label>
              <input
                value={aboutMaterials}
                onChange={handleTextInput}
                type="text"
                name="aboutMaterials"
              />
            </div>
            <div className="newProduct__content__inputs__text__input">
              <label htmlFor={sizeOfOriginal}>Rozmiar oryginału (wzór: 20 x 30)</label>
              <input
                value={sizeOfOriginal}
                onChange={handleTextInput}
                type="text"
                name="sizeOfOriginal"
              />
            </div>
            <div className="newProduct__content__inputs__text__input">
              <label style={{maxWidth:"200px"}} htmlFor={sizeOfOriginalInCm}>Rozmiar oryginału (szerokość 20cm wysokość 30cm)</label>
              <input
                value={sizeOfOriginalInCm}
                onChange={handleTextInput}
                type="text"
                name="sizeOfOriginalInCm"
              />
            </div>
          </div>
          <div className="newProduct__content__inputs__arrays">
            <form onSubmit={(e) => addSizeToArray(e, "copy")}>
              <div>
                <label htmlFor="sizeInput">Rozmiary kopii (20 x 30)</label>
                <div className="row">
                  <input
                    value={copySizeInput.sizeOfCopy}
                    onChange={(e) => setCopySizeInput({ sizeOfCopy: e.target.value })}
                    type="text"
                    id="sizeInput"
                  />
                  <button className="buttonAdd">Dodaj</button>
                </div>
                <div className="col">
                  {LocalArrayOfCopySizes?.map((item: sizeOfCopy) => (
                    <div className="col__item">
                      {item.sizeOfCopy}{" "}
                      <div
                        onClick={() => deleteSize(item.sizeOfCopy, "copy")}
                        className="btnRemove"
                      >
                        X
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
            <form onSubmit={(e) => addSizeToArray(e, "cm")}>
              <div>
                <label style={{maxWidth:"200px"}} htmlFor="sizeOfCopyInput">Rozmiary kopii (szerokość 20cm wysokość 50cm) </label>
                <div className="row">
                  <input
                    value={sizeInCmInput.sizeOfCopyInCm}
                    onChange={(e) => setSizeInCmInput({ sizeOfCopyInCm: e.target.value })}
                    type="text"
                    id="sizeOfCopyInput"
                  />
                  <button className="buttonAdd">Dodaj</button>
                </div>
                <div className="col">
                  {LocalArrayOfCopySizesInCm?.map((item: sizeOfCopyInCm) => (
                    <div className="col__item">
                      {item.sizeOfCopyInCm}{" "}
                      <div
                        onClick={() => deleteSize(item.sizeOfCopyInCm, "cm")}
                        className="btnRemove"
                      >
                        X
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
            <form
              style={{ marginLeft: "45px" }}
              onSubmit={(e) => addColorToArray(e)}
            >
              <div>
                <label htmlFor="sizeInput">Kolory</label>
                <div className="row">
                  <input
                    value={colorInput.color}
                    onChange={(e) => setColorInput({ color: e.target.value })}
                    type="color"
                    id="sizeInput"
                  />
                  <button className="buttonAdd">Dodaj</button>
                </div>
                <div className="col">
                  {arrayOfColors.map((item: color) => (
                    <div className="col__item">
                      <div
                        style={{ backgroundColor: `${item.color}` }}
                        className="color"
                      ></div>{" "}
                      <div
                        onClick={() => deleteColor(item.color)}
                        className="btnRemove"
                      >
                        X
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
          <div className="newProduct__content__inputs__input">
            <div className="buttonAdd" onClick={createProduct}>
              Dodaj produkt
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};
