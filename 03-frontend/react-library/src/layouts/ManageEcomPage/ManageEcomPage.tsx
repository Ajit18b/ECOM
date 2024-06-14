import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { Redirect } from "react-router";
import { AdminMessage } from "./Components/AdminMessage";
import { ChangeQuantityOfProduct } from "./Components/ChangeQuantityOfProduct";
import { ChangeQuantityOfProducts } from "./Components/ChangeQuantityOfProducts";
import { AdminMessages } from "./Components/AdminMessages";
import { AddNewProduct } from "./Components/AddNewProduct";
import { MerchantApplications } from "./Components/MerchantApplications";

export const ManageEcomPage = () => {
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
    function merchantApplicationClick() {

    }
    if (authState?.accessToken?.claims.userType === undefined) {
        return <Redirect to="/home" />
    }
    return (
        <div className="container">
            <div className="mt-5">
                {/* <h3>Manage Products</h3> */}
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button onClick={addProductClickFunction} className="nav-link active" id="nav-add-product-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-add-product" type="button" role="tab" aria-controls="nav-add-product"
                            aria-selected="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="25" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                            </svg>
                            Add new Product
                        </button>
                        <button onClick={changeQuantityOfProductsClickFunction} className="nav-link" id="nav-quantity-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-quantity" type="button" role="tab" aria-controls="nav-quantity"
                            aria-selected="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="25" fill="currentColor" className="bi bi-card-checklist" viewBox="0 0 16 16">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                            </svg>
                            Manage All Products
                        </button>
                        <button onClick={querriesClickFunction} className="nav-link" id="nav-querries-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-querries" type="button" role="tab" aria-controls="nav-querries"
                            aria-selected="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="25" fill="currentColor" className="bi bi-chat-left-text" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                            </svg>
                            Querries
                        </button>
                        <button onClick={merchantApplicationClick} className="nav-link" id="nav-querries-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-merchant-application" type="button" role="tab" aria-controls="nav-querries"
                            aria-selected="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="25" fill="currentColor" className="bi bi-envelope-paper" viewBox="0 0 16 16">
                                <path d="M4 0a2 2 0 0 0-2 2v1.133l-.941.502A2 2 0 0 0 0 5.4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.4a2 2 0 0 0-1.059-1.765L14 3.133V2a2 2 0 0 0-2-2zm10 4.267.47.25A1 1 0 0 1 15 5.4v.817l-1 .6zm-1 3.15-3.75 2.25L8 8.917l-1.25.75L3 7.417V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1zm-11-.6-1-.6V5.4a1 1 0 0 1 .53-.882L2 4.267zm13 .566v5.734l-4.778-2.867zm-.035 6.88A1 1 0 0 1 14 15H2a1 1 0 0 1-.965-.738L8 10.083zM1 13.116V7.383l4.778 2.867L1 13.117Z" />
                            </svg>
                            Merchant Applications
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-add-product" role="tabpanel"
                        aria-labelledby="nav-add-product-tab">
                        <AddNewProduct />
                    </div>
                    <div className="tab-pane fade" id="nav-quantity" role="tabpanel"
                        aria-labelledby="nav-quantity-tab">
                        {changeQuantityOfProductsClick ? <ChangeQuantityOfProducts /> : <></>}
                    </div>
                    <div className="tab-pane fade" id="nav-querries" role="tabpanel"
                        aria-labelledby="nav-querries-tab">
                        {querriesClick ? <AdminMessages /> : <></>}
                    </div>
                    <div className="tab-pane fade" id="nav-merchant-application" role="tabpanel"
                        aria-labelledby="nav-querries-tab">
                        {/* <MerchantApplications /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}