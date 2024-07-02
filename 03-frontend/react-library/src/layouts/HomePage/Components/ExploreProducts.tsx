import { Link } from "react-router-dom";

export const ExploreProducts = () => {
    return (
        <div className="p-5 mb-4 bg-dark header d-flex justify-content-center align-items-center">
            <div className="container-fluid py-5 text-white
            d-flex justify-content-center align-items-center">
                <div>
                    <h3 className="display-3">E-COM Explorer</h3>
                    {/* <p className="col-md-8 fs-4">next product?</p> */}
                    <Link type='button' className="btn btn-outline-light btn-md d-flex justify-content-center align-items-center" to='/search'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="currentColor" className="bi bi-search" viewBox="0 2 16 12">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                        Explore top produts
                    </Link>
                </div>
            </div>
        </div>
    );
}