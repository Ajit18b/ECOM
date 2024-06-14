import { Link } from "react-router-dom";

export const ExploreProducts = () => {
    return (
        <div className="p-5 mb-4 bg-dark header">
            <div className="container-fluid py-5 text-white
            d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="display-1">E-COM Explorer</h1>
                    {/* <p className="col-md-8 fs-4">next product?</p> */}
                    <Link type='button' className="btn main-color btn-lg text-white" to='/search'>
                        Explore top produts
                    </Link>
                </div>
            </div>
        </div>
    );
}