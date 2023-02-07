type copySize = {
  sizeOfCopy: String
}
export interface IProduct {
    itemName: string | undefined;
    itemPrice: number | null;
    copyPrice: number
    itemDescription: string | undefined;
    itemQuantity: number | null;
    isOriginalAvailable: boolean;
    sizeOfOriginal: string | undefined;
    sizeOfOriginalInCm: string | undefined;
    arrayOfCopySizes: copySize[]
    arrayOfCopySizesInCm: any[]
    aboutMaterials: string
    itemColor: string | undefined;
    itemImages: Image[] | any[]
    itemCategoryName: string
    subCategory: string
    primaryImage: string
    _id: string 
  };
  export type Image = {
    realPicture: string,
    thumbnail: string
    imageName:string
    imageUrl: string
    _id: string
  }
  export interface ISubCategory {
    subCategoryName: string
    relatedCategoryName: string
    _id: string
  }
  export interface ICategory {
    categoryName: string 
    _id: string 
    subCategories: ISubCategory[]
  }

  export type MenuProps = {
    categories: ICategory[]
    products: IProduct[]
    subCategories: ISubCategory[]
  }

  export interface ImagePreview {
    isOpen: boolean;
    thumbnail: string;
    fullHD: string;
    isLoading: boolean;
  }

