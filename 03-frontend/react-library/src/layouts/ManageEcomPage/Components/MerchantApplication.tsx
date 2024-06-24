import { useState } from "react";
import MerchantApplicationModel from "../../../models/MerchantApplicationModel";

export const MerchantApplication: React.FC<{
    application: MerchantApplicationModel,
    submitResponseToApplication: any,
    submitDeclineResponseToApplication: any
}> = (props, key) => {

    const [displayWarning, setDisplayWarning] = useState(false);
    const [response, setResponse] = useState('');

    function submitBtn() {
        if (props.application.id !== null && response !== '') {
            props.submitResponseToApplication(props.application.id, response);
            setDisplayWarning(false);
        } else {
            setDisplayWarning(true);
        }
    }
    function submitDeclineBtn() {
        if (props.application.id !== null) {
            props.submitDeclineResponseToApplication(props.application.id, response);
            setDisplayWarning(false);
        } else {
            setDisplayWarning(false);
        }
    }

    return (
        <div key={props.application.id} className='container'>
            <div className='row mt-2'>
                <div className='col-md-6'>
                    <div className='card shadow p-3 bg-body rounded'>
                        <div className='card-body'>
                            <h5 className='card-title'>Application Details</h5>
                            <table className='table table-bordered table-hover' style={{ tableLayout: 'fixed', width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <th scope='row' style={{ width: '40%' }}>Application Number:</th>
                                        <td style={{ overflowWrap: 'break-word' }}>{props.application.id}</td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>Company/Business Name:</th>
                                        <td style={{ overflowWrap: 'break-word' }}>{props.application.businessName}</td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>Applicant Name:</th>
                                        <td style={{ overflowWrap: 'break-word' }}>{props.application.firstName} {props.application.lastName}</td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>Email Address:</th>
                                        <td style={{ overflowWrap: 'break-word' }}>{props.application.merchantEmail}</td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>Phone Number:</th>
                                        <td style={{ overflowWrap: 'break-word' }}>{props.application.merchantPhone}</td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>Custom Description:</th>
                                        <td style={{ overflowWrap: 'break-word' }}>{props.application.remark}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card shadow p-3 bg-body rounded'>
                        <div className='card-body'>
                            <h5 className='card-title'>Response To This Application </h5>
                            <h6>Application Number : #{props.application.id}</h6>
                            <a>Please configure the merchant account and send the credentials to the email of the merchant before approving the application </a>
                            <form action='PUT'>
                                {displayWarning && (
                                    <div className='alert alert-danger' role='alert'>
                                        Remark must be filled out.
                                    </div>
                                )}
                                <div className='mb-3'>
                                    <h5> <label className='form-label'>Remark</label></h5>
                                    <textarea
                                        className='form-control'
                                        id='exampleFormControlTextarea1'
                                        rows={2}
                                        onChange={e => setResponse(e.target.value)}
                                        value={response}
                                    ></textarea>
                                </div>
                                <div>
                                    <button
                                        type='button'
                                        className='btn btn-primary mt-3'
                                        onClick={submitBtn}
                                    >
                                        Approve Application
                                    </button>
                                    <button
                                        type='button'
                                        className='btn btn-danger mt-3 ms-2'
                                        onClick={submitDeclineBtn}
                                    >
                                        Decline Application
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}