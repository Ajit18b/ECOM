import { Link } from "react-router-dom";
import ProductModel from "../../models/ProductModel";
import { LeaveAReview } from "../Utils/LeaveAReview";

export const CheckoutAndReview: React.FC<{
    product: ProductModel | undefined, mobile: boolean,
    currentCount: number, isAuthenticated: any, isCheckedout: boolean,
    checkoutProduct: any, isReviewLeft: boolean, submitReview: any
}> = (props) => {
    function buttonRender() {
        if (props.isAuthenticated) {
            if (!props.isCheckedout && props.currentCount < 5) {
                return (<button onClick={props.checkoutProduct} className="btn btn-success btn-lg">
                    Add To Cart
                </button>)
            } else if (props.isCheckedout) {
                return (<p><b>Added to cart successfully !</b></p>)
            } else if (!props.isCheckedout) {
                return (<p className="text-danger">Cart limit exceeded ! </p>)
            }
        }
        return (<Link to={"/login"} className="btn btn-success btn-lg">Sign in</Link>)
    }
    function reviewRender() {
        if (props.isAuthenticated && !props.isReviewLeft) {
            return (<p><LeaveAReview submitReview={props.submitReview} /></p>)
        } else if (props.isAuthenticated && props.isReviewLeft) {
            return (<p>Thank you for your review !</p>)
        }
        return (<div>Sign in to review the product </div>)
    }
    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>{props.currentCount} </b>
                        Products added to cart
                    </p>
                    <hr />
                    {props.product && props.product.quantityAvailable && props.product.quantityAvailable > 0 ?
                        <h4 className="text-success">
                            Available
                        </h4>
                        :
                        <h4 className="text-danger">
                            Wait List
                        </h4>
                    }
                    <div className="row">
                        {/* <p className="col-6 lead">
                            <b>{props.product?.quantity} </b>
                            Quantity
                        </p> */}
                        <p className="col-6 lead">
                            <b>{props.product?.quantityAvailable} </b>
                            Available
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr />
                <p className="mt-3">
                    This number can change untill placing order
                </p>
                {reviewRender()}
            </div>
        </div>
    );
}
