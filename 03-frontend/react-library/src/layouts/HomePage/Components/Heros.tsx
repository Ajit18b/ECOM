export const Heros = () => {
    return (
        <div>
            <div className="d-one d-lg-block">
                <div className="row g-0 mt-5">
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-left"></div>
                    </div>
                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                        <div className="ml-2">
                            <h1>demo product ref ?</h1>
                            <p className="lead">
                                demo pragraph for product description
                            </p>
                            <a className="btn main-color btn-outline-light" href="#">Sign up</a>
                        </div>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                        <div className="ml-2">
                            <h1>demo product ref ?</h1>
                            <p className="lead">
                                demo pragraph for product description
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-right"></div>
                    </div>
                </div>
            </div>
            {/* mobile */}
            <div className="d-lg-none">
                <div className="container">
                    <div className="m-2">
                        <div className="col-image-left">
                            <div className="mt-2">
                                <h1>demo product ref ?</h1>
                                <p className="lead">
                                    demo pragraph for product description
                                </p>
                                <a className="btn main-color btn-lg text-white" href="#">Sign up</a>
                            </div>
                        </div>
                        <div className="m-2">
                            <div className="col-image-right"></div>
                            <div className="mt-2">
                                <h1>demo product ref ?</h1>
                                <p className="lead">
                                    demo pragraph for product description
                                </p>
                                <a className="btn main-color btn-lg text-white" href="#">Sign up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}