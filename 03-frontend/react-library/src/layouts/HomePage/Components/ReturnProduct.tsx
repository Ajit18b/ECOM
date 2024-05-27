import React from "react";
import ProductModel from "../../../models/ProductModel";
export const ReturnProduct: React.FC<{ product: ProductModel }> = (props) => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                {props.product.img ?
                    <img
                        src={props.product.img}
                        width="151"
                        height="151"
                        alt="product"
                    />
                    :
                    <img
                        src={require('D:\\E_commerce_demo\\03-frontend\\react-library\\src\\Images\\productDemo.png')}
                        width="151"
                        height="151"
                        alt="product"
                    />
                }
                <h6 className="mt-2">{props.product.title}</h6>
                <p>{props.product.seller}</p>
                <a className="btn main-color btn-outline-light" href="#">Reserve</a> {/* Provide a valid href */}
            </div>
        </div>
    );
}