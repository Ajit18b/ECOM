import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { Redirect } from "react-router";
import { MerchantAddNewProduct } from "./Components/MerchantAddNewProduct";
import { ManageListedProducts } from "./Components/ManageListedProducts";

export const ManageMerchantProduct = () => {
    const { authState } = useOktaAuth();
    const [changeQuantityOfProductsClick, setChangeQuantityOfProductsClick] = useState(false);
    const [querriesClick, setQuerriesClick] = useState(false);
    function addProductClickFunction() {
        setChangeQuantityOfProductsClick(false);
        setQuerriesClick(false);
    }
    function changeQuantityOfProductsClickFunction() {
        setChangeQuantityOfProductsClick(true);
        setQuerriesClick(false);
    }
    function querriesClickFunction() {
        setChangeQuantityOfProductsClick(false);
        setQuerriesClick(true);
    }
    if (authState?.accessToken?.claims.userType === "merchant") {
        return (
            <div className="container">
                <div className="mt-5">
                    <h3>Manage Products</h3>
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button onClick={addProductClickFunction} className="nav-link active" id="nav-add-product-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-add-product" type="button" role="tab" aria-controls="nav-add-product"
                                aria-selected="false">
                                Add new Product
                            </button>
                            <button onClick={changeQuantityOfProductsClickFunction} className="nav-link" id="nav-quantity-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-quantity" type="button" role="tab" aria-controls="nav-quantity"
                                aria-selected="true">
                                Listed Products
                            </button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-add-product" role="tabpanel"
                            aria-labelledby="nav-add-product-tab">
                            <MerchantAddNewProduct />
                        </div>
                        <div className="tab-pane fade" id="nav-quantity" role="tabpanel"
                            aria-labelledby="nav-quantity-tab">
                            {changeQuantityOfProductsClick ? <ManageListedProducts /> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (<></>);

}