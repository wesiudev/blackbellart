import { NewProduct } from './NewProduct'
import { MenageProducts } from './Products'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../../common/redux/actions/categories";
import { fetchProducts } from "../../../../common/redux/actions/product";
import { getSubCategories } from '../../../../common/redux/actions/subCategories';
type MenuProps = {
    isMenuOpened: boolean
    menuName: string
    editProduct: Function | any
}

const Menu = (props: MenuProps) => {
    
    const dispatch: any = useDispatch();
    const { categories } = useSelector((state: any) => state.categories);
    const { subCategories } = useSelector((state: any) => state.subCategories);
    const { products } = useSelector((state: any) => state.products);

    useEffect(() => {
      dispatch(getCategories());
    }, []);
    useEffect(() => {
      dispatch(fetchProducts());
    }, []);
    useEffect(() => {
        dispatch(getSubCategories());
    }, []);

    

    return(
        <div className={props.isMenuOpened ? "panel__menu height" : "panel__menu"}>
            <div className={props.isMenuOpened ? "panel__menu__content opened" : "panel__menu__content"}>
                {props.menuName === 'newProduct' ? (
                    <>
                        <NewProduct/>
                    </>
                ) : (
                    null
                )}
                {props.menuName === 'categories' ? (
                    <>
                        <MenageProducts categories={categories.data} products={products.data} subCategories={subCategories.data} editProduct={props.editProduct}/>
                    </>
                ) : (
                    null
                )}
            </div>
        </div>
    )
}

export default Menu