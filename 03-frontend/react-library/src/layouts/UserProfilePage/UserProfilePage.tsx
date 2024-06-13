import React from "react";
import { useOktaAuth } from "@okta/okta-react";

export const UserProfilePage = () => {
    const { oktaAuth, authState } = useOktaAuth();

    if (!authState) {
        return <div>Loading...</div>;
    }

    const userInfo = {
        Email: authState.accessToken?.claims.sub,
        UserName: authState.idToken?.claims.name,
        UserType: authState.accessToken?.claims.userType || "Customer",
        UserId: authState.accessToken?.claims.uid
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h3>User Profile Details</h3>
                </div>
                <div className="card-body">
                    {Object.entries(userInfo).map(([key, value]) => (
                        <div className="row mb-3" key={key}>
                            <div className="col-sm-3 font-weight-bold">{key}:</div>
                            <div className="col-sm-9">{value as string}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
