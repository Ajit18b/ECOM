import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import SupportModel from "../../../models/SupportModel";

export const PostNewQuerry = () => {
    const { authState } = useOktaAuth();
    const [title, setTitle] = useState("");
    const [query, setQuerry] = useState("");
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    async function submitNewQuerry() {
        const url = `http://localhost:8080/api/supportreq/secure/add/support`;
        if (authState?.isAuthenticated && title !== "" && query !== "") {
            const supportRequestModel: SupportModel = new SupportModel(title, query);
            const requestOptions = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(supportRequestModel)
            };
            const submitNewQuerryResponse = await fetch(url, requestOptions);
            if (!submitNewQuerryResponse.ok) {
                throw new Error("Something went wrong!");
            }
            setTitle("");
            setQuerry("");
            setDisplayWarning(false);
            setDisplaySuccess(true);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }
    return (
        <div className="card mt-3">

            <div className="card-header">
                Send new querry
            </div>
            <div className="card-body">
                <form method="POST">
                    {displayWarning &&
                        <div className="alert alert-danger" role="alert">
                            All fields must be filled out
                        </div>
                    }
                    {displaySuccess &&
                        <div className="alert alert-success" role="alert">
                            Querry sent successfully ! Wait for the response
                        </div>
                    }
                    <div className="mb-3">
                        <label className="form-label">
                            Title
                        </label>
                        <input type="text" className="form-control" id="exampleFormControlInput"
                            placeholder="title" onChange={e => setTitle(e.target.value)} value={title} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Querry
                        </label>
                        <textarea className="form-control" id="exampleFormControlTextarea1"
                            rows={3} onChange={e => setQuerry(e.target.value)} value={query}>
                        </textarea>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary mt-3" onClick={submitNewQuerry}>
                            Send your querry
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}