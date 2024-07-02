import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { NavLink } from "react-router-dom";
import "./../../../../src/App.css";
import CartCurrentProducts from "../../../models/CartCurrentProducts";

const Cart = () => {
    const { authState } = useOktaAuth();
    const [cartCurrentProducts, setCartCurrentProducts] = useState<CartCurrentProducts[]>([]);

    useEffect(() => {
        const fetchUserCurrentProducts = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/products/secure/currentorders`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        "Content-Type": "application/json"
                    }
                };
                const cartCurrentProductsResponse = await fetch(url, requestOptions);
                if (!cartCurrentProductsResponse.ok) {
                    throw new Error("Something went wrong 12");
                }
                const cartCurrentProductsResponseJson = await cartCurrentProductsResponse.json();
                setCartCurrentProducts(cartCurrentProductsResponseJson);
            }

        };
        fetchUserCurrentProducts().catch((error: any) => {

            setHttpError(error.message);
        });
        window.scrollTo(0, 0);
    }, [authState]);
    return (
        <NavLink className="nav-link" to={"/cart"}>
            <div className="cart-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-cart2" viewBox="0 0 16 16">
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                </svg>
                {cartCurrentProducts.length > 0 ? (
                    <span className="cart-count">
                        {cartCurrentProducts.length}
                    </span>
                ) : null}

            </div>
        </NavLink>
    );
};

export default Cart;
function setHttpError(message: any) {
    throw new Error("Function not implemented.");
}

