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
        if (props.application.id !== null && response !== '') {
            props.submitDeclineResponseToApplication(props.application.id, response);
            setDisplayWarning(false);
        } else {
            setDisplayWarning(true);
        }
    }

    return (
        <div key={props.application.id}>
            <div className='card mt-2 shadow p-3 bg-body rounded'>
                <h5>Application Number: {props.application.id}</h5>
                <h5>Company/Business Name: {props.application.businessName}</h5>
                <h5>Applicant Name: {props.application.firstName} {props.application.lastName}</h5>
                <h5>Email address: {props.application.merchantEmail}</h5>
                <h6>Custom Description: {props.application.remark}</h6>
                <hr />
                <div>
                    <h5>Response: </h5>
                    <form action="PUT">
                        {displayWarning &&
                            <div className='alert alert-danger' role='alert'>
                                All fields must be filled out.
                            </div>
                        }
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'> Remark </label>
                            <textarea className='form-control' id='exampleFormControlTextarea1' rows={1}
                                onChange={e => setResponse(e.target.value)} value={response}></textarea>
                        </div>
                        <div>
                            <button type='button' className='btn btn-primary mt-3' onClick={submitBtn}>
                                Approve Application
                            </button>
                            <p></p>
                            <button type='button' className='btn btn-danger mt-3' onClick={submitDeclineBtn}>
                                Decline Application
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}