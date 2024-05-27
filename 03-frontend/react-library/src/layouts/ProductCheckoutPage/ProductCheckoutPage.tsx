import { useEffect, useState } from "react";
import ProductModel from "../../models/ProductModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarReview } from "../Utils/StarReview";
import { CheckoutAndReview } from "./CheckoutAndReview";

export const ProductCheckoutPage = () => {
    const [product, setProduct] = useState<ProductModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const productId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchProduct = async () => {
            const baseUrl: string = `http://192.168.7.20:8080/api/products/${productId}`;
            const url: string = `${baseUrl}?page=0&size=20`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong !");
            }

            const responseJson = await response.json();
            const loadedProducts: ProductModel = {
                id: responseJson.id,
                title: responseJson.title,
                seller: responseJson.seller,
                description: responseJson.description,
                quantity: responseJson.quantity,
                quantityAvailable: responseJson.quantityAvailable,
                category: responseJson.category,
                img: responseJson.img
            };
            setProduct(loadedProducts);
            setIsLoading(false);
        };
        fetchProduct().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);
    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }
    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }
    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {
                            product?.img ?
                                <img src={product?.img} width="226" height="349" alt="Product" />
                                :
                                <img src={require("./../../Images/productDemo1.png")} width="226" height="349" alt="Product" />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{product?.title}</h2>
                            <h5 className="text-primary">{product?.seller}</h5>
                            <p className="lead">{product?.description}</p>
                            <StarReview rating={4.5} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReview product={product} mobile={false} />
                </div>
                <hr />
            </div>
            <div className="container d-lg-none mt-5 ">
                <div className="d-flex justify-content-center align-items-center">
                    {
                        product?.img ?
                            <img src={product?.img} width="226" height="349" alt="Product" />
                            :
                            <img src={require("./../../Images/productDemo1.png")} width="226" height="349" alt="Product" />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{product?.title}</h2>
                        <h5 className="text-primary">{product?.seller}</h5>
                        <p className="lead">{product?.description}</p>
                        <StarReview rating={4.5} size={32} />
                    </div>
                </div>
                <CheckoutAndReview product={product} mobile={true} />
                <hr />
            </div>
        </div >
    );
}