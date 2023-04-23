import { useSelector } from 'react-redux';
import { IProduct } from '../types/types';

export const useProduct = (productID: string) => {
    const products = useSelector((state: any) => state.products.products);
    const product = products && products?.data?.find((product: IProduct) => product._id === productID)
    return product
}