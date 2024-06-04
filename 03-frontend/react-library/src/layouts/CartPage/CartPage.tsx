import { useState } from "react";
import { HistoryPage } from "./Components/HistoryPage";
import { Products } from "./Components/Products";

export const CartPage = () => {
    const [historyClick, setHistoryClick] = useState(false);
    return (
        <div className="container">
            <div className="mt-3">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button onClick={() => setHistoryClick(false)} className="nav-link active" id="nav-orders-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-orders" type="button" role="tab" aria-controls="nav-orders"
                            aria-selected="true">
                            Current Order in cart
                        </button>
                        <button onClick={() => setHistoryClick(true)} className="nav-link" id="nav-history-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-history" type="button" role="tab" aria-controls="nav-history"
                            aria-selected="false">
                            Order History
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-orders" role="tabpanel"
                        aria-labelledby="nav-orders-tab">
                        <Products />
                    </div>
                    <div className="tab-pane fade" id="nav-history" role="tabpanel"
                        aria-labelledby="nav-history-tab">
                        {historyClick ? <HistoryPage /> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
};
