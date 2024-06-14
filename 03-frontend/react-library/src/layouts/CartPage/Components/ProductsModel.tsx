import CartCurrentProducts from "../../../models/CartCurrentProducts";

export const ProductsModel: React.FC<{ cartCurrentProduct: CartCurrentProducts, mobile: boolean, orderProduct: any, removeProduct: any }> = (props) => {
    const modalId = props.mobile ? `mobilemodal${props.cartCurrentProduct.product.id}` : `modal${props.cartCurrentProduct.product.id}`;

    return (
        <div className="modal fade" id={modalId} data-bs-backdrop="static" data-bs-keyboard="false"
            aria-labelledby="staticBackdropLabel" aria-hidden="true" key={props.cartCurrentProduct.product.id}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            Order Now !
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="mt-3">
                                <div className="row">
                                    <div className="col-2">
                                        {props.cartCurrentProduct.product?.img ?
                                            <img src={props.cartCurrentProduct.product?.img}
                                                width="56" height="87" alt="Product" />
                                            :
                                            <img src={require("./../../../Images/productDemo1.png")}
                                                width="56" height="87" alt="Product" />
                                        }
                                    </div>
                                    <div className="col-10">
                                        <h6>{props.cartCurrentProduct.product.seller}</h6>
                                        <h4>{props.cartCurrentProduct.product.title}</h4>
                                    </div>
                                </div>
                                <hr />
                                <div className="list-group mt-3">
                                    <button onClick={() => props.orderProduct(props.cartCurrentProduct.product.id)} data-bs-dismiss="modal" className="list-group-item list-group-item-action"
                                        aria-current="true">
                                        Order this Product now
                                    </button>
                                </div>
                                <div className="list-group mt-3">
                                    <button onClick={() => props.removeProduct(props.cartCurrentProduct.product.id)} data-bs-dismiss="modal" className="list-group-item list-group-item-action"
                                        aria-current="true">
                                        Remove this Product now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
