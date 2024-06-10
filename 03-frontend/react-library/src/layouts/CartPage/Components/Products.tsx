import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import CartCurrentProducts from "../../../models/CartCurrentProducts";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";
import { ProductsModel } from "./ProductsModel";

export const Products = () => {
    const { authState } = useOktaAuth();
    const [httpError, setHttpError] = useState(null);

    const [cartCurrentProducts, setCartCurrentProducts] = useState<CartCurrentProducts[]>([]);
    const [isLoadingUserProducts, setIsLoadingUserProducts] = useState(true);
    const [checkout, setCheckout] = useState(false);
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
    }, [authState, checkout]);

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
    async function orderProduct(productId: number) {
        const url = `http://localhost:8080/api/products/secure/order/?productId=${productId}`;
        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-type": "application/json"
            }
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error("Something went wrong ");
        }
        setCheckout(!checkout);
    }
    async function removeProduct(productId: number) {
        const url = `http://localhost:8080/api/products/secure/remove/?productId=${productId}`;
        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-type": "application/json"
            }
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error("Something went wrong ");
        }
        setCheckout(!checkout);
    }
    return (
        <div className="container">
            {/* Desktop view */}
            <div className="d-none d-lg-block mt-2">
                {cartCurrentProducts.length > 0 ? (
                    <>
                        <h5>Current Added Products</h5>
                        <div className="row">
                            {cartCurrentProducts.map((cartCurrentProduct) => (
                                <div key={cartCurrentProduct.product.id} className="col-12 col-md-6 mb-4">
                                    <div className="card h-100">
                                        <div className="row g-0">
                                            <div className="col-4">
                                                {cartCurrentProduct.product?.img ? (
                                                    <img
                                                        src={cartCurrentProduct.product?.img}
                                                        className="img-fluid rounded-start"
                                                        alt="Product"
                                                    />
                                                ) : (
                                                    <img
                                                        src={require("./../../../Images/productDemo.png")}
                                                        className="img-fluid rounded-start"
                                                        alt="Product"
                                                    />
                                                )}
                                            </div>
                                            <div className="col-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">
                                                        <button
                                                            className="list-group-item list-group-item-action"
                                                            aria-current="true"
                                                            data-bs-toggle="modal"
                                                            data-bs-target={`#modal${cartCurrentProduct.product.id}`}
                                                        >
                                                            Order Now
                                                        </button>
                                                    </h5>
                                                    <div className="list-group mt-3">
                                                        <button
                                                            className="list-group-item list-group-item-action"
                                                            aria-current="true"
                                                            data-bs-toggle="modal"
                                                            data-bs-target={`#modal${cartCurrentProduct.product.id}`}
                                                        >
                                                            Manage Product
                                                        </button>
                                                        <Link to={"search"} className="list-group-item list-group-item-action">
                                                            Search more products
                                                        </Link>
                                                    </div>
                                                    <hr />
                                                    <p className="mt-3">Review this product</p>
                                                    <Link className="btn btn-primary" to={`/checkout/${cartCurrentProduct.product.id}`}>
                                                        Leave a review
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ProductsModel cartCurrentProduct={cartCurrentProduct} mobile={false} orderProduct={orderProduct} removeProduct={removeProduct} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <h3 className="mt-3">No products added yet</h3>
                        <Link className="btn btn-primary" to={"search"}>
                            Get something added to your cart
                        </Link>
                    </div>
                )}
            </div>
            {/* End Desktop view */}

            {/* Mobile view */}
            <div className="d-lg-none mt-2">
                {cartCurrentProducts.length > 0 ? (
                    <>
                        <h5>Current Added Products</h5>
                        {cartCurrentProducts.map((cartCurrentProduct) => (
                            <div key={cartCurrentProduct.product.id} className="mb-4">
                                <div className="card">
                                    <div className="row g-0">
                                        <div className="col-4 text-center">
                                            {cartCurrentProduct.product?.img ? (
                                                <img
                                                    src={cartCurrentProduct.product?.img}
                                                    className="img-fluid rounded-start"
                                                    alt="Product"
                                                />
                                            ) : (
                                                <img
                                                    src={require("./../../../Images/productDemo.png")}
                                                    className="img-fluid rounded-start"
                                                    alt="Product"
                                                />
                                            )}
                                        </div>
                                        <div className="col-8">
                                            <div className="card-body">
                                                <h5 className="card-title text-center">Order Now</h5>
                                                <div className="list-group mt-3">
                                                    <button
                                                        className="list-group-item list-group-item-action"
                                                        aria-current="true"
                                                        data-bs-toggle="modal"
                                                        data-bs-target={`#modal${cartCurrentProduct.product.id}`}
                                                    >
                                                        Manage Product
                                                    </button>
                                                    <Link to={"search"} className="list-group-item list-group-item-action">
                                                        Search more products
                                                    </Link>
                                                </div>
                                                <hr />
                                                <p className="mt-3 text-center">Review this product</p>
                                                <Link className="btn btn-primary d-block mx-auto" to={`/checkout/${cartCurrentProduct.product.id}`}>
                                                    Leave a review
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ProductsModel cartCurrentProduct={cartCurrentProduct} mobile={true} orderProduct={orderProduct} removeProduct={removeProduct} />
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="text-center">
                        <h3 className="mt-3">No products added yet</h3>
                        <Link className="btn btn-primary d-block mx-auto" to={"search"}>
                            Get something added to your cart
                        </Link>
                    </div>
                )}
            </div>
            {/* End Mobile view */}
        </div>
    );

};