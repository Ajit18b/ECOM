import { useEffect, useState } from "react";
import ProductModel from "../../models/ProductModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarReview } from "../Utils/StarReview";
import { CheckoutAndReview } from "./CheckoutAndReview";
import { LatestReview } from "./LatestReview";
import ReviewModel from "../../models/ReviewModel";
import { useOktaAuth } from "@okta/okta-react";
import { error } from "console";
import ReviewRequestModel from "../../models/ReviewRequestModel";

export const ProductCheckoutPage = () => {
    const { authState } = useOktaAuth();
    const [product, setProduct] = useState<ProductModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);
    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

    const [currentCount, setCurrentCount] = useState(0);
    const [isLoadingCurrentCount, setIsLoadingCurrentCount] = useState(true);

    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [isLoadingProductCheckedOut, setIsLoadingProductCheckedOut] = useState(true);

    const productId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchProduct = async () => {
            const baseUrl: string = `http://localhost:8080/api/products/${productId}`;
            const url: string = `${baseUrl}?page=0&size=20`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong 1!");
            }

            const responseJson = await response.json();
            const loadedProduct: ProductModel = {
                id: responseJson.id,
                title: responseJson.title,
                seller: responseJson.seller,
                description: responseJson.description,
                quantity: responseJson.quantity,
                quantityAvailable: responseJson.quantityAvailable,
                category: responseJson.category,
                img: responseJson.img
            };
            setProduct(loadedProduct);
            setIsLoading(false);
        };
        fetchProduct().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [isCheckedOut]);
    useEffect(() => {
        const fetchProductReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByProductId?productId=${productId}`;
            const responseReviews = await fetch(reviewUrl);
            if (!responseReviews.ok) {
                throw new Error("Something went wrong 2!");
            }
            const responseJsonReviews = await responseReviews.json();
            const responseData = responseJsonReviews._embedded.reviews;
            const loadedReviews: ReviewModel[] = [];
            let weightedStarReviews: number = 0;
            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    product_id: responseData[key].productId,
                    reviewDescription: responseData[key].reviewDescription,
                });
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }
            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }
            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };
        fetchProductReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    }, [isReviewLeft]);

    useEffect(() => {
        const fetchUserReviewProduct = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/reviews/secure/user/product/?productId=${productId}`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        "Content-Type": "application/json"
                    }
                };
                const userReview = await fetch(url, requestOptions);
                if (!userReview.ok) {
                    throw new Error("Something went wrong ");
                }
                const userReviewResponseJson = await userReview.json();
                setIsReviewLeft(userReviewResponseJson);
            }
            setIsLoadingUserReview(false);
        }
        fetchUserReviewProduct().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    })

    useEffect(() => {
        const fetchUserCurrentCount = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/products/secure/currentcounts/count`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        "Content-Type": "appliaction/json"
                    }
                };
                const currentCountResponse = await fetch(url, requestOptions);
                if (!currentCountResponse.ok) {
                    throw new Error("Something went wrong 12!");
                }
                const currentCountResponseJson = await currentCountResponse.json();
                setCurrentCount(currentCountResponseJson);
            }
            setIsLoadingCurrentCount(false);
        }
        fetchUserCurrentCount().catch((error: any) => {
            setIsLoadingCurrentCount(false);
            setHttpError(error.message);
        })
    }, [authState, isCheckedOut]);
    useEffect(() => {
        const fetchUserCheckedOutProduct = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/products/secure/ischeckedout/byuser/?productId=${productId}`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        "Content-Type": "application/json"
                    }
                };
                const productCheckedOut = await fetch(url, requestOptions);
                if (!productCheckedOut.ok) {
                    throw new Error("Something went wrong 3");
                }
                const productCheckedOutResponseJson = await productCheckedOut.json();
                setIsCheckedOut(productCheckedOutResponseJson);
            }
            setIsLoadingProductCheckedOut(false);
        }
        fetchUserCheckedOutProduct().catch((error: any) => {
            setIsLoadingProductCheckedOut(false);
            setHttpError(error.message);
        })
    }, [authState, isCheckedOut]);
    if (isLoading || isLoadingReview || isLoadingCurrentCount || isLoadingProductCheckedOut || isLoadingUserReview) {
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
    async function checkoutProduct() {
        const url = `http://localhost:8080/api/products/secure/checkout/?productId=${product?.id}`;
        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-Type": "application/json"
            }
        };
        const checkoutResponse = await fetch(url, requestOptions);
        if (!checkoutResponse.ok) {
            throw new Error("Something went wrong!");
        }
        setIsCheckedOut(true);
    };
    async function submitReview(starInput: number, reviewDescription: string) {
        let productId: number = 0;
        if (product?.id) {
            productId = product.id;
        }
        const reviewRequestModel = new ReviewRequestModel(starInput, productId, reviewDescription);
        const url = `http://localhost:8080/api/reviews/secure`;
        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewRequestModel)
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse) {
            throw new Error("Something went wrong !");
        }
        setIsReviewLeft(true);
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
                            <StarReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReview product={product} mobile={false} currentCount={currentCount}
                        isAuthenticated={authState?.isAuthenticated} isCheckedout={isCheckedOut}
                        checkoutProduct={checkoutProduct} isReviewLeft={isReviewLeft} submitReview={submitReview} />
                </div>
                <hr />
                <LatestReview reviews={reviews} productId={product?.id} mobile={false} />
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
                        <StarReview rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckoutAndReview product={product} mobile={true} currentCount={currentCount}
                    isAuthenticated={authState?.isAuthenticated} isCheckedout={isCheckedOut}
                    checkoutProduct={checkoutProduct} isReviewLeft={isReviewLeft} submitReview={submitReview} />
                <hr />
                <LatestReview reviews={reviews} productId={product?.id} mobile={true} />
            </div>
        </div >
    );
}