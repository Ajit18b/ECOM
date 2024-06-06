import { useState } from "react";
import { PostNewQuerry } from "./Components/PostNewQuerry";
import { Querries } from "./Components/Querries";

export const SupportPage = () => {
    const [supportsClick, setSupportsClick] = useState(false)
    return (
        <div className="container">
            <div className="mt-3 mb-2">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button onClick={() => setSupportsClick(false)} className="nav-Link active"
                            id="nav-send-message-tab" data-bs-toggle="tab" data-bs-target="#nav-send-message"
                            type="button" role="tab" aria-controls="nav-send-message" aria-selected="true">
                            Send your querry
                        </button>
                        <button onClick={() => setSupportsClick(true)} className="nav-link"
                            id="nav-message-tab" data-bs-toggle="tab" data-bs-target="#nav-message"
                            type="button" role="tab" aria-controls="nav-message" aria-selected="false">
                            pending response
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-send-message" role="tabpanel"
                        aria-labelledby="nav-send-message-tab">
                        <PostNewQuerry />
                    </div>
                    <div className="tab-pane fade" id="nav-message" role="tabpanel" aria-labelledby="nav-message-tab">
                        {supportsClick ? <Querries /> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}