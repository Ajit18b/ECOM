import { useOktaAuth } from "@okta/okta-react"
import { useEffect, useState } from "react";
import SupportModel from "../../../models/SupportModel";
import { error } from "console";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Pagination } from "../../Utils/Pagination";

export const Querries = () => {
    const { authState } = useOktaAuth();
    const [isLoadingQuerries, setIsLoadingQuerries] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [querries, setQuerries] = useState<SupportModel[]>([]);

    const [querriesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchUserQuerries = async () => {
            if (authState && authState?.isAuthenticated) {
                const url = `http://localhost:8080/api/supportreq/search/findByUserEmail/?userEmail=${authState?.accessToken?.claims.sub}&page=${currentPage - 1}&size=${querriesPerPage}`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                        "Content-Type": "application/json"
                    }
                };
                const querriesResponse = await fetch(url, requestOptions);
                if (!querriesResponse.ok) {
                    throw new Error("Something went wrong!");
                }
                const querriesResponseJson = await querriesResponse.json();
                setQuerries(querriesResponseJson._embedded.querries);
                setTotalPages(querriesResponseJson.page.totalPages);
            }
            setIsLoadingQuerries(false);
        }
        fetchUserQuerries().catch((error: any) => {
            setIsLoadingQuerries(false);
            setHttpError(error.messages);
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
        <div className="mt-2">
            {querries.length > 0 ?
                <>
                    <h5>Current query</h5>
                    {querries.map(query => (
                        <div key={query.id}>
                            <div className="card mt-2 shadow p-3 bg-body rounded">
                                <h5>Query # {query.id}:{query.title}</h5>
                                <h6>{query.userEmail}</h6>
                                <p>{query.querry}</p>
                                <hr />
                                <div>
                                    <h5>Response: </h5>
                                    {query.response && query.adminEmail ?
                                        <>
                                            <h6>{query.adminEmail}(admin)</h6>
                                            <p>{query.response}</p>
                                        </>
                                        :
                                        <p><i>Pending response</i></p>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </>
                :
                <h5>All querries will be diplayed here </h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    );
}
export default Querries;