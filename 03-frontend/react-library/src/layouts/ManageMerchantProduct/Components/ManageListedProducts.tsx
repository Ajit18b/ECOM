import React from "react";
import { useEffect, useState } from "react";
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { Pagination } from '../../Utils/Pagination';
import ProductModel from "../../../models/ProductModel";
import { ManageListedProduct } from "./ManageListedProduct";
import { useOktaAuth } from "@okta/okta-react";


export const ManageListedProducts = () => {
    const { authState } = useOktaAuth();
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [totalAmountOfProducts, setTotalAmountOfProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [productDelete, setProductDelete] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            const baseUrl: string = `http://localhost:8080/api/products/search/findProductByMerchantEmail/?merchantEmail=${authState?.accessToken?.claims.sub}&page=${currentPage - 1}&size=${productsPerPage}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.products;

            setTotalAmountOfProducts(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

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
                    merchantEmail: responseData[key].category,
                    img: responseData[key].img,
                });
            }

            setProducts(loadedProducts);
            setIsLoading(false);
        };
        fetchProducts().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [currentPage, productDelete]);

    const indexOfLastProduct: number = currentPage * productsPerPage;
    const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
    let lastItem = productsPerPage * currentPage <= totalAmountOfProducts ?
        productsPerPage * currentPage : totalAmountOfProducts;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const deleteProduct = () => setProductDelete(!productDelete);

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

    return (
        <div className='container mt-5'>
            {totalAmountOfProducts > 0 ?
                <>
                    <div className='mt-3'>
                        <h3>Number of results: ({totalAmountOfProducts})</h3>
                    </div>
                    <p>
                        {indexOfFirstProduct + 1} to {lastItem} of {totalAmountOfProducts} items:
                    </p>
                    {products.map(product => (
                        <ManageListedProduct product={product} key={product.id} deleteProduct={deleteProduct} />
                    ))}
                </>
                :
                <h5>Add a product before changing quantity</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    );
}