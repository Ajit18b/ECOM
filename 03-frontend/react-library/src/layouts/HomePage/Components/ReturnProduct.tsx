import React from "react";
import ProductModel from "../../../models/ProductModel";
import { Link } from "react-router-dom";


export const ReturnProduct: React.FC<{ product: ProductModel }> = (props) => {
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
            <div className="product-card text-center">
                <Link to={`checkout/${props.product.id}`}>
                    {props.product.img ? (
                        <img
                            src={props.product.img}
                            className="product-img"
                            alt="product"
                        />
                    ) : (
                        <img
                            src={require("./../../../Images/productDemo1.png")}
                            className="product-img"
                            alt="product"
                        />
                    )}
                </Link>
                <h6 className="mt-2 product-title">{props.product.title}</h6>
                <p className="product-seller">{props.product.seller}</p>
                <Link className="btn main-color btn-outline-light" to={`checkout/${props.product.id}`}>
                    Buy Now
                </Link>
            </div>
        </div>
    );
};
