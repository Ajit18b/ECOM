import { useState } from "react";
import MessageModel from "../../../models/MessageModel";
import MerchantApplicationModel from "../../../models/MerchantApplicationModel";

export const MerchantApplication: React.FC<{
    application: MerchantApplicationModel,
    submitResponseToQuestion: any
}> = (props, key) => {

    const [displayWarning, setDisplayWarning] = useState(false);
    const [response, setResponse] = useState('');

    function submitBtn() {
        if (props.application.id !== null && response !== '') {
            props.submitResponseToQuestion(props.application.id, response);
            setDisplayWarning(false);
        } else {
            setDisplayWarning(true);
        }
    }

    return (
        <div key={props.application.id}>
            <div className='card mt-2 shadow p-3 bg-body rounded'>
                <h5>Case #{props.application.id}: {props.application.businessName}</h5>
                <h6>{props.application.merchantEmail}</h6>
                <p>{props.application.remark}</p>
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
                            <label className='form-label'> Description </label>
                            <textarea className='form-control' id='exampleFormControlTextarea1' rows={3}
                                onChange={e => setResponse(e.target.value)} value={response}></textarea>
                        </div>
                        <div>
                            <button type='button' className='btn btn-primary mt-3' onClick={submitBtn}>
                                Close Ticket
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}