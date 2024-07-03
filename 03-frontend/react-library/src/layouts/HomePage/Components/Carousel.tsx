import { ReturnProduct } from "./ReturnProduct";
import { useEffect, useState } from "react";
import ProductModel from "../../../models/ProductModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";
import { EComServices } from "./EComServices";


export const Carousel = () => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);
    const [carouselCount, setCarouselCount] = useState(3); // State to keep track of the number of carousels displayed

    useEffect(() => {
        const fetchProducts = async () => {
            const baseUrl: string = "http://localhost:8080/api/products";
            const url: string = `${baseUrl}?page=0&size=108`;
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
                });
            }
            setProducts(loadedProducts);
            setIsLoading(false);
        };
        fetchProducts().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    const loadMoreCarousels = () => {
        setCarouselCount(prevCount => prevCount + 1);
    };
    useEffect(() => {
        // Scroll to the bottom when the carousel count changes
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }, [carouselCount]);

    if (isLoading) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }

    const renderCarousels = () => {
        const carousels = [];
        for (let i = 0; i < carouselCount; i++) {
            const startIndex = i * 18;
            const endIndex = startIndex + 18;
            carousels.push(
                <div id={`carouselExampleControls${i}`} className="carousel carousel-dark slide mt-5 " data-bs-interval="false" key={i}>

                    <div className="carousel-indicators">
                        <button type="button" data-bs-target={`#carouselExampleControls${i}`} data-bs-slide-to="0" className="active" aria-current="true" aria-label={`Slide 1`}></button>
                        <button type="button" data-bs-target={`#carouselExampleControls${i}`} data-bs-slide-to="1" aria-label={`Slide 2`}></button>
                        <button type="button" data-bs-target={`#carouselExampleControls${i}`} data-bs-slide-to="2" aria-label={`Slide 3`}></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active ">
                            <div className="row d-flex justify-content-center align-items-center custom-carousel-height">
                                {products.slice(startIndex, startIndex + 6).map(product => (
                                    <ReturnProduct product={product} key={product.id} />
                                ))}
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row d-flex justify-content-center align-items-center custom-carousel-height">
                                {products.slice(startIndex + 6, startIndex + 12).map(product => (
                                    <ReturnProduct product={product} key={product.id} />
                                ))}
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row d-flex justify-content-center align-items-center custom-carousel-height">
                                {products.slice(startIndex + 12, endIndex).map(product => (
                                    <ReturnProduct product={product} key={product.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev custom-carousel-control" type="button"
                        data-bs-target={`#carouselExampleControls${i}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next custom-carousel-control" type="button"
                        data-bs-target={`#carouselExampleControls${i}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            );
        }
        return carousels;
    };

    return (
        <div className="container mt-5" style={{ minHeight: '1000px', marginBottom: '50px' }}>
            <div className="homepage-carousel-title">
                <h3>Explore Displayed Products</h3>
            </div>
            {renderCarousels()}
            {/* Mobile */}
            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <ReturnProduct product={products[1]} key={products[1].id} />
                </div>
            </div>
            {products.length > carouselCount * 18 ? (
                <div className="homepage-carousel-title mt-3">
                    <button className="btn btn-outline-secondary btn-lg" onClick={loadMoreCarousels} >View More</button>
                </div>
            ) : (
                <div className="homepage-carousel-title mt-3">
                    <Link className="btn main-color btn-outline-light" to={`search`}>
                        Explore More Products
                    </Link>
                </div>
            )}
        </div>
    );
}
