import { useEffect, useState } from "react";
import { useOktaAuth } from '@okta/okta-react';
import ProductModel from "../../../models/ProductModel";

export const ChangeQuantityOfProduct: React.FC<{ product: ProductModel, deleteProduct: any }> = (props) => {

    const { authState } = useOktaAuth();
    const [quantity, setQuantity] = useState<number>(0);
    const [remaining, setRemaining] = useState<number>(0);

    useEffect(() => {
        const fetchProductInState = () => {
            setQuantity(props.product.quantity || 0);
            setRemaining(props.product.quantityAvailable || 0);
        };
        fetchProductInState();
    }, [props.product.quantity, props.product.quantityAvailable]);

    async function increaseQuantity() {
        const url = `http://localhost:8080/api/admin/secure/increase/product/quantity/?productId=${props.product?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if (!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity + 1);
        setRemaining(remaining + 1);
    }

    async function decreaseQuantity() {
        const url = `http://localhost:8080/api/admin/secure/decrease/product/quantity/?productId=${props.product?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if (!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity - 1);
        setRemaining(remaining - 1);
    }

    async function deleteProduct() {
        const url = `http://localhost:8080/api/admin/secure/delete/product/?productId=${props.product?.id}`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const updateResponse = await fetch(url, requestOptions);
        if (!updateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        props.deleteProduct();
    }

    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2 d-flex justify-content-center align-items-center'>
                    {props.product.img ?
                        <img src={props.product.img} width='200' height='200' alt='Product' />
                        :
                        <img src={require("./../../../Images/productDemo1.png")} width='123' height='196' alt='Product' />
                    }
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>{props.product.seller}</h5>
                        <h4>{props.product.title}</h4>
                        <p className='card-text'>{props.product.description}</p>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='d-flex flex-column justify-content-center align-items-center h-100'>
                        <p className='mb-1'>Total Quantity: <b>{remaining}</b></p>
                        <div className='d-flex'>
                            <button className='m-1 btn btn-md btn-primary' onClick={increaseQuantity}>Add Quantity</button>
                            <button className='m-1 btn btn-md btn-warning' onClick={decreaseQuantity}>Decrease Quantity</button>
                            <button className='m-1 btn btn-md btn-danger' onClick={deleteProduct}>Delete</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
