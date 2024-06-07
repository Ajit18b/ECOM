import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import SupportModel from "../../../models/SupportModel";
import { error } from "console";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Pagination } from "../../Utils/Pagination";

export const AdminQuerries = () => {
    const { authState } = useOktaAuth();
    const [isLoadingQuerries, setIsLoadingQuerries] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [querries, setQuerries] = useState<SupportModel[]>([]);
    const [querriesPerPage] = useState(5);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchUserQuerries = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/supportreq/search/findByClosed/?closed=false&page=${currentPage - 1}&size=${querriesPerPage}`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        "Content-Type": "application/json"
                    }
                };
                const querriesResponse = await fetch(url, requestOptions);
                if (!querriesResponse.ok) {
                    throw new Error("Something went wrong !");
                }
                const querriesResponseJson = await querriesResponse.json();
                setQuerries(querriesResponseJson._embedded.querries);
                setTotalPages(querriesResponseJson.page.totalPages);
            }
            setIsLoadingQuerries(false);
        }
        fetchUserQuerries().catch((error: any) => {
            setIsLoadingQuerries(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [authState, currentPage]);
    if (isLoadingQuerries) {
        return (
            <SpinnerLoading />
        );
    }
    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <div className="mt-3">
            {querries.length > 0 ?
                <>
                    <h5>Pending querries</h5>
                    {querries.map(querry => (
                        <p>Querries to response</p>
                    ))}
                </>
                :
                <h5>no pending querries</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    );
}