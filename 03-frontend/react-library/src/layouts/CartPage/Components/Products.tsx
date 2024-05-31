import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import CartCurrentProducts from "../../../models/CartCurrentProducts";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const Products = () => {
    const { authState } = useOktaAuth();
    const [httpError, setHttpError] = useState(null);

    const [cartCurrentProducts, setCartCurrentProducts] = useState<CartCurrentProducts[]>([]);
    const [isLoadingUserProducts, setIsLoadingUserProducts] = useState(true);
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
            setIsLoadingUserProducts(false);
        };
        fetchUserCurrentProducts().catch((error: any) => {
            setIsLoadingUserProducts(false);
            setHttpError(error.message);
        });
        window.scrollTo(0, 0);
    }, [authState]);

    if (isLoadingUserProducts) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>
                    {httpError}
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Desktop view */}
            <div className="d-none d-lg-block mt-2">
                {cartCurrentProducts.length > 0 ?
                    <>
                        <h5>Current Added Products</h5>
                        {cartCurrentProducts.map(cartCurrentProduct => (
                            <div key={cartCurrentProduct.product.id}>
                                <div className="row mt-3 mb-3">
                                    <div className="col-4 col-md-4 container">
                                        {cartCurrentProduct.product?.img ?
                                            <img src={cartCurrentProduct.product?.img} width="226" height="349" alt="Product" />
                                            :
                                            <img src={require("./../../../Images/productDemo.png")} width="226" height="349" alt="Product" />
                                        }
                                    </div>
                                    <div className="card col-3 col-md-3 container d-flex">
                                        <div className="card-body">
                                            <div className="mt-3">
                                                <h4>Order Now</h4>
                                            </div>
                                            <div className="list-group mt-3">
                                                <button className="list-group-item list-group-item-action"
                                                    aria-current="true" data-bs-toggle="modal"
                                                    data-bs-target={`#modal${cartCurrentProduct.product.id}`}>
                                                    Manage Product
                                                </button>
                                                <Link to={"search"} className="list-group-item list-group-item-action">
                                                    Search more product
                                                </Link>
                                            </div>
                                        </div>
                                        <hr />
                                        <p className="mt-3">
                                            review this product
                                        </p>
                                        <Link className="btn btn-primary" to={`/checkout/${cartCurrentProduct.product.id}`}>
                                            Leave a review
                                        </Link>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        ))}
                    </> :
                    <>
                        <h3 className="mt-3">
                            No products added yet
                        </h3>
                        <Link className="btn btn-primary" to={"search"}>
                            Get something added to your cart
                        </Link>
                    </>
                }
            </div>
            {/* End Desktop view */}
        </div>
    );
};
