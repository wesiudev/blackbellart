import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../redux/actions/cart';

export default function useCart() {
        const dispatch = useDispatch<any>()
        const { cart } = useSelector((state: any) => state.cart);
        const [localCartData, setLocalCartData] = useState<any>(JSON.parse(localStorage.getItem("blackbellcart") as string));

        useEffect(() => {
            localCartData && dispatch(fetchCart({ cartID: localCartData?.cart?._id }))
        },[])

        return cart
}