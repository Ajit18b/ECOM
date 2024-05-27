import { ReturnProduct } from "./ReturnProduct";
import { useEffect, useState } from "react";
import ProductModel from "../../../models/ProductModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const Carousel = () => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const baseUrl: string = "http://192.168.7.20:8080/api/products";
            const url: string = `${baseUrl}?page=0&size=20`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong !");
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.products;
            const loadedProducts: ProductModel[] = [];
            for (const key in responseData) {
                loadedProducts.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    seller: responseData[key].seller,
                    description: responseData[key].description,
                    quantity: responseData[key].quantity,
                    quantityAvailable: responseData[key].quantityAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img
                })
            }
            setProducts(loadedProducts);
            setIsLoading(false);
        };
        fetchProducts().catch((error: any) => {
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
        <div className="container mt-5" style={{ height: 1000 }}>
            <div className="homepage-carousel-title">
                <h3>demo product</h3>
            </div>
            <div id="carouselExampleControls" className="carousel carousel-dark slid mt-5 d-none d-lg-block" data-bs-interval="false">
                {/*Desktop*/}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            {products.slice(0, 3).map(product => (
                                <ReturnProduct product={product} key={product.id} />
                            ))}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {products.slice(3, 6).map(product => (
                                <ReturnProduct product={product} key={product.id} />
                            ))}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {products.slice(6, 9).map(product => (
                                <ReturnProduct product={product} key={product.id} />
                            ))}
                        </div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button"
                    data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button"
                    data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div id="carouselExampleControls1" className="carousel carousel-dark slid mt-5 d-none d-lg-block" data-bs-interval="false">
                {/*Desktop*/}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            {products.slice(9, 12).map(product => (
                                <ReturnProduct product={product} key={product.id} />
                            ))}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {products.slice(12, 15).map(product => (
                                <ReturnProduct product={product} key={product.id} />
                            ))}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {products.slice(15, 18).map(product => (
                                <ReturnProduct product={product} key={product.id} />
                            ))}
                        </div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button"
                    data-bs-target="#carouselExampleControls1" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button"
                    data-bs-target="#carouselExampleControls1" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Mobile */}
            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <ReturnProduct product={products[1]} key={products[1].id} />
                </div>
            </div>
            <div className="homepage-carousel-title mt-3">
                <Link className="btn btn-outline-secondary btn-lg" to='/search'>View More</Link> {/* Add text and a valid href */}
            </div>
        </div>
    );
}
