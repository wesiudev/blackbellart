import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { cleanProduct, fetchProduct, fetchProducts } from '../../common/redux/actions/product';
import { IProduct } from '../../common/types/types';
import Headline from './elements/headline';
import Menu from './elements/MenagementPanels/DisplayPanels';
import ProductEditor from './elements/productEditor/productEditor';

const AdminTools = () => {

    const dispatch = useDispatch<any>();
    const serverFeedback = useSelector((state: any) => state.serverFeedback);
    const product = useSelector((state: any) => state.products.product);

    const [isCategoryMenuOpened, setCategoryMenuOpened] = useState<boolean>(false);
    
    const [isNewProductOpened, setNewProductOpened] = useState<boolean>(false);
    const [isProductEditorOpened, setProductEditorOpened] = useState<boolean>(false);
    const [currentlyEditingItem, setCurrentlyEditingItem] = useState<IProduct>();
    const [changesWereCommitted, setChangesWereCommitted] = useState<boolean>(false)

    function editProduct(product: IProduct) {
            dispatch(fetchProduct({productId: product._id}))
            setProductEditorOpened(true)
            setCurrentlyEditingItem(product)
    }
    function setMessageStyles(){
        if (serverFeedback.id === "ERROR") {
            return "#e76c6c"
        }else if (serverFeedback.id === "SUCCESS") {
            return "#67c867"
        }
    }
    function closeEditor() {
        changesWereCommitted && dispatch(fetchProducts())
        setChangesWereCommitted(false)
        setProductEditorOpened(false)
        dispatch(cleanProduct())
    }
    const messageStyles = {
        backgroundColor: setMessageStyles()
    }
    return(
        <div className="admin_panel">
            {serverFeedback.text ? (
                <div className="admin_panel__alert">
                    <div style={messageStyles} className="admin_panel__alert__message">
                        {serverFeedback.text}
                    </div>
                </div>
            ) : (
                null
            )}
            
            <div className="panel">
                {isProductEditorOpened ? <ProductEditor changesWereCommitted={changesWereCommitted} setChangesWereCommitted={setChangesWereCommitted} closeEditor={closeEditor} item={product ? product : currentlyEditingItem}/> : null}
                <Headline text='Panel administracyjny' isMenuOpened={null} openMenu={null} />
                <div className="hr"></div>
                <Headline text='Zarządzaj produktami' isMenuOpened={isCategoryMenuOpened} openMenu={setCategoryMenuOpened}/>
                <div className="hr"></div>
                <Menu isMenuOpened={isCategoryMenuOpened} editProduct={editProduct} menuName='categories'/>
                <Headline text='Dodaj produkt' isMenuOpened={isNewProductOpened} openMenu={setNewProductOpened} />
                <Menu isMenuOpened={isNewProductOpened} menuName='newProduct' editProduct={""}/>
            </div>
            
        </div>
    )
}

export default AdminTools