import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';


import { Pagination } from '../../Utils/Pagination';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import MerchantApplicationModel from '../../../models/MerchantApplicationModel';
import MerchantApplicationResponse from '../../../models/MerchantApplicationResponse';
import { MerchantApplication } from './MerchantApplication';

export const MerchantApplications = () => {

    const { authState } = useOktaAuth();

    // Normal Loading Pieces
    const [isLoadingApplications, setIsLoadingApplications] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Application endpoint State
    const [appliactions, setApplications] = useState<MerchantApplicationModel[]>([]);
    const [appliactionsPerPage] = useState(5);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Recall useEffect
    const [btnSubmit, setBtnSubmit] = useState(false);

    useEffect(() => {
        const fetchMerchantApplications = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/merchantApplications/search/findByApproval/?approval=false&response=null&page=${currentPage - 1}&size=${appliactionsPerPage}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const applicationResponse = await fetch(url, requestOptions);
                if (!applicationResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const applicationResponseJson = await applicationResponse.json();

                setApplications(applicationResponseJson._embedded.merchantApplications);
                setTotalPages(applicationResponseJson.page.totalPages);
            }
            setIsLoadingApplications(false);
        }
        fetchMerchantApplications().catch((error: any) => {
            setIsLoadingApplications(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [authState, currentPage, btnSubmit]);

    if (isLoadingApplications) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }


    async function submitResponseToApplication(id: number, response: string) {
        const url = `http://localhost:8080/api/merchantApplications/secure/admin/application`;
        if (authState && authState?.isAuthenticated && id !== null && response !== '') {
            const merchantApplicationResponseModel: MerchantApplicationResponse = new MerchantApplicationResponse(id, response);
            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(merchantApplicationResponseModel)
            };

            const applicationAdminRequestModelResponse = await fetch(url, requestOptions);
            if (!applicationAdminRequestModelResponse.ok) {
                throw new Error('Something went wrong!');
            }
            setBtnSubmit(!btnSubmit);
        }
    }
    async function submitDeclineResponseToApplication(id: number, response: string) {
        const url = `http://localhost:8080/api/merchantApplications/secure/admin/application`;
        if (authState && authState?.isAuthenticated && id !== null && response !== '') {
            const merchantApplicationResponseModel: MerchantApplicationResponse = new MerchantApplicationResponse(id, response);
            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(merchantApplicationResponseModel)
            };

            const applicationAdminRequestModelResponse = await fetch(url, requestOptions);
            if (!applicationAdminRequestModelResponse.ok) {
                throw new Error('Something went wrong!');
            }
            setBtnSubmit(btnSubmit);
        }
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className='mt-3'>
            {appliactions.length > 0 ?
                <>
                    <h5>Pending Tickets to Response: </h5>
                    {appliactions.map(application => (
                        <MerchantApplication application={application} key={application.id} submitResponseToApplication={submitResponseToApplication} submitDeclineResponseToApplication={submitDeclineResponseToApplication} />
                    ))}
                </>
                :
                <h5>No pending Tickets</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    );
}