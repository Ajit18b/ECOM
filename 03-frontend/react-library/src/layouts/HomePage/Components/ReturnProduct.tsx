import React from "react";
import ProductModel from "../../../models/ProductModel";
import { Link } from "react-router-dom";
export const ReturnProduct: React.FC<{ product: ProductModel }> = (props) => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-2 mb-3">
            <div className="text-center">
                <Link to={`checkout/${props.product.id}`}>
                    {props.product.img ?
                        <img
                            src={props.product.img}
                            width="151"
                            height="151"
                            alt="product"
                        />
                        :
                        <img
                            src={require('./../../../Images/productDemo1.png')}
                            width="151"
                            height="151"
                            alt="product"
                        />
                    }
                </Link>
                <h6 className="mt-2">{props.product.title}</h6>
                <p>{props.product.seller}</p>
                <Link className="btn main-color btn-outline-light" to={`checkout/${props.product.id}`}>Buy Now</Link>
            </div>
        </div>
    );
}