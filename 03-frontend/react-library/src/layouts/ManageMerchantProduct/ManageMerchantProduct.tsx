import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { Redirect } from "react-router";
import { MerchantAddNewProduct } from "./Components/MerchantAddNewProduct";
import { ManageListedProducts } from "./Components/ManageListedProducts";
import { MessagesPage } from "../MessagesPage/MessagesPage";

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
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="25" fill="currentColor" className="bi bi-bag-plus-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z" />
                                </svg>
                                Add new Product
                            </button>
                            <button onClick={changeQuantityOfProductsClickFunction} className="nav-link" id="nav-quantity-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-quantity" type="button" role="tab" aria-controls="nav-quantity"
                                aria-selected="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="25" fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
                                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                    <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                                </svg>
                                Listed Products
                            </button>
                            <button onClick={querriesClickFunction} className="nav-link" id="nav-quantity-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-quantity" type="button" role="tab" aria-controls="nav-quantity"
                                aria-selected="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="25" fill="currentColor" className="bi bi-chat-left-dots" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                    <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                </svg>
                                Contact Support
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
                        <div className="tab-pane fade show active" id="nav-add-product" role="tabpanel"
                            aria-labelledby="nav-add-product-tab">
                            <MessagesPage />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (<></>);

}