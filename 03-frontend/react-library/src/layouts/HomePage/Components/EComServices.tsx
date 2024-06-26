import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const EComServices = () => {
    const { authState } = useOktaAuth();
    return (
        <div className="container my-5">
            <div className="row p-4 align-items-center border shadow-lg">
                <div className="col-lg-7 p-3">
                    <h1 className="display-4 fw-bold">
                        Can't find what you're looking for? Let us help you!
                    </h1>
                    <p className="lead">
                        send your querries here
                    </p>
                    <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
                        {authState?.isAuthenticated ?
                            <Link type="button" className="btn main-color btn-outline-light"
                                to="/support"> Contact </Link>
                            :
                            <Link className="btn main-color btn-outline-light" to="/login">Sign up</Link>
                        }
                    </div>
                </div>
                <div className="col-lg-4 offset-lg-1 shadow-lg lost-image"></div>
            </div>
        </div>
    );
}