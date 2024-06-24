import React, { useEffect, useState } from 'react';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { Pagination } from '../../Utils/Pagination';
import ProductModel from "../../../models/ProductModel";
import { ChangeQuantityOfProduct } from "./ChangeQuantityOfProduct";

export const ChangeQuantityOfProducts = () => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);
    const [totalAmountOfProducts, setTotalAmountOfProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [productDelete, setProductDelete] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState('All');
    const [sortOption, setSortOption] = useState('title');

    const sellers = ['All', 'Seller1', 'Seller2', 'Seller3']; // Add your sellers here
    const sortOptions = ['title', 'quantity', 'category']; // Add sorting options here

    useEffect(() => {
        const fetchProducts = async () => {
            const baseUrl = `http://localhost:8080/api/products?page=${currentPage - 1}&size=${productsPerPage}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.products;

            setTotalAmountOfProducts(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedProducts = responseData.map((product: any) => ({
                id: product.id,
                title: product.title,
                seller: product.seller,
                description: product.description,
                quantity: product.quantity,
                quantityAvailable: product.quantityAvailable,
                category: product.category,
                img: product.img,
            }));

            setProducts(loadedProducts);
            setIsLoading(false);
        };

        fetchProducts().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, [currentPage, productDelete]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const lastItem = productsPerPage * currentPage <= totalAmountOfProducts ?
        productsPerPage * currentPage : totalAmountOfProducts;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const deleteProduct = () => setProductDelete(!productDelete);

    if (isLoading) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }

    const filteredProducts = products
        .filter(product => selectedSeller === 'All' || product.seller === selectedSeller)
        .sort((a, b) => {
            if (sortOption === 'title') {
                return a.title?.localeCompare(b.title) ?? 0;
            } else if (sortOption === 'quantity') {
                return (b.quantity ?? 0) - (a.quantity ?? 0);
            } else if (sortOption === 'category') {
                const categoryA = a.category ?? '';
                const categoryB = b.category ?? '';
                return categoryA.localeCompare(categoryB);
            }
            return 0;
        });

    return (
        <div className='container mt-5'>
            <div className='dropdown-container'>
                <label htmlFor="seller">Filter by Seller:</label>
                <select id="seller" value={selectedSeller} onChange={(e) => setSelectedSeller(e.target.value)}>
                    {sellers.map((seller, index) => (
                        <option key={index} value={seller}>{seller}</option>
                    ))}
                </select>

                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    {sortOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            {totalAmountOfProducts > 0 ?
                <>
                    {/* <div className='mt-3'>
                        <h3>Number of results: ({totalAmountOfProducts})</h3>
                    </div> */}
                    {/* <p>
                        {indexOfFirstProduct + 1} to {lastItem} of {totalAmountOfProducts} items:
                    </p> */}
                    {filteredProducts.map(product => (
                        <ChangeQuantityOfProduct product={product} key={product.id} deleteProduct={deleteProduct} />
                    ))}
                </>
                :
                <h5>Add a product before changing quantity</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    );
};
