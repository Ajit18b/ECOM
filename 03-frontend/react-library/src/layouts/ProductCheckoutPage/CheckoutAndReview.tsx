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
            if (!props.isCheckedout && props.currentCount < 20) {
                return (<p>
                    <button onClick={props.checkoutProduct} className="btn btn-success btn-lg">
                        Add To Cart
                    </button>
                    <p />
                    {/* <button onClick={props.checkoutProduct} className="btn btn-primary btn-lg">
                        Order Now
                    </button> */}
                    <hr />
                    <Link to={"/cart"} className="btn btn-primary btn-sm">View all products in cart</Link>
                </p >)
            } else if (props.isCheckedout) {
                return (<p><b>Item added to cart successfully !</b><hr /><Link className="btn btn-primary" to={"/search"}>add more product</Link><hr /><Link to={"/cart"} className="btn btn-outline-info">View all products in cart</Link></p >)
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
            return (<p>Review added successfully Thank you for your review !</p>)
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
                            Currently not available
                        </h4>
                    }
                    <div className="row">
                        <p className="col-6 lead">
                            <b>{props.product?.quantityAvailable} </b>
                            Available
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr />
                {reviewRender()}
            </div>
        </div>
    );
}
