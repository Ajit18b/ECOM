import { useState } from "react";
import MerchantApplicationModel from "../../models/MerchantApplicationModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const MerchantRegistration = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [merchantEmail, setMerchantEmail] = useState('');
    const [merchantPhone, setMerchantPhone] = useState('');
    const [remark, setRemark] = useState('');

    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const [nameValidationFirst, setNameValidationFirst] = useState(false);
    const [nameValidationLast, setNameValidationLast] = useState(false);
    const [businessNameValidation, setBusinessNameValidation] = useState(false);
    const [emailValidation, setEmailValidation] = useState(false);
    const [phoneValidation, setPhoneValidation] = useState(false);
    const [emptyWarningRemark, setEmptyWarningRemark] = useState(false)
    const [showAnimation, setShowAnimation] = useState(false);

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateEmail = (email: string) => {
        return emailRegex.test(email);
    };
    const phoneRegex = /^\d{10}$/;

    const validatePhoneNumber = (phone: string) => {
        return phoneRegex.test(phone);
    };


    // const handleEmailChange = (e: { target: { value: any; }; }) => {
    //     const email = e.target.value;
    //     setMerchantEmail(email);
    //     setEmailValidation(!validateEmail(email));
    // };

    async function submitNewApplication() {
        // Validate form fields
        setNameValidationFirst(!firstName);
        setNameValidationLast(!lastName);
        setBusinessNameValidation(!businessName);
        setEmailValidation(!validateEmail(merchantEmail));
        setPhoneValidation(!validatePhoneNumber(merchantPhone));
        setEmptyWarningRemark(!remark);

        if (!firstName || !lastName || !businessName || !validateEmail(merchantEmail) || !validatePhoneNumber(merchantPhone) || !remark) {
            setDisplayWarning(true);
            setDisplaySuccess(false);
            window.scrollTo(0, 0);
            return;
        }

        const url = `http://localhost:8080/api/merchantApplications/apply`;
        const applicationRequestModel = new MerchantApplicationModel(firstName, lastName, businessName, merchantEmail, merchantPhone, remark);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(applicationRequestModel)
        };

        try {
            const submitNewQuestionResponse = await fetch(url, requestOptions);
            if (!submitNewQuestionResponse.ok) {
                throw new Error('Something went wrong!');
            }

            setDisplayWarning(false);
            setNameValidationFirst(false);
            setNameValidationLast(false);
            setBusinessNameValidation(false);
            setEmailValidation(false);
            setPhoneValidation(false);
            setEmptyWarningRemark(false);
            setDisplaySuccess(true);
            setFirstName('');
            setLastName('');
            setBusinessName('');
            setMerchantEmail('');
            setMerchantPhone('');
            setRemark('');
            window.scrollTo(0, 0);
            setShowAnimation(true);
            setTimeout(() => setShowAnimation(false), 5000);
        } catch (error) {
            console.error(error);
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

    return (
        <div className='container mt-5'>
            {showAnimation && <div className="animation-merchant-application">Application Submitted Successfylly</div>}
            <div className='card mx-auto' style={{ maxWidth: '600px' }}>
                <div className='card-header'>
                    Apply for Merchant Account and Start Your Online Business
                </div>
                <div className='card-body'>
                    <form method='POST'>
                        {displayWarning &&
                            <div className='alert alert-danger' role='alert'>
                                All fields must be filled out
                            </div>
                        }
                        {displaySuccess &&
                            <div className='alert alert-success' role='alert'>
                                Application submitted successfully. If approved, you will receive your credentials via email.
                            </div>
                        }
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='firstName'>
                                <h6>First Name</h6>
                            </label>
                            <input type='text' className='form-control' id='firstName' aria-label='First Name'
                                placeholder='Enter your first name' onChange={e => setFirstName(e.target.value)} value={firstName} />
                            {nameValidationFirst && (
                                <div className="text-danger mt-2">
                                    Please enter a valid first name.
                                </div>
                            )}
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='lastName'>
                                <h6>Last Name</h6>
                            </label>
                            <input type='text' className='form-control' id='lastName' aria-label='Last Name'
                                placeholder='Enter your last name' onChange={e => setLastName(e.target.value)} value={lastName} />
                            {nameValidationLast && (
                                <div className="text-danger mt-2">
                                    Please enter a valid last name.
                                </div>
                            )}
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='businessName'>
                                <h6>Business Name / Company Name</h6>
                            </label>
                            <input type='text' className='form-control' id='businessName' aria-label='Business Name'
                                placeholder='Enter your business name' onChange={e => setBusinessName(e.target.value)} value={businessName} />
                            {businessNameValidation && (
                                <div className="text-danger mt-2">
                                    Please enter your business name / company name
                                </div>
                            )}
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='merchantEmail'>
                                <h6>Email</h6>
                            </label>
                            <input
                                type='email'
                                className="form-control"
                                id='merchantEmail'
                                aria-label='Email'
                                placeholder='Enter your email address'
                                onChange={e => setMerchantEmail(e.target.value)}
                                value={merchantEmail}
                            />
                            {emailValidation && (
                                <div className="text-danger mt-2">
                                    Please enter a valid email address
                                </div>
                            )}
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='merchantPhone'>
                                <h6>Phone</h6>
                            </label>
                            <input type='tel' className='form-control' id='merchantPhone' aria-label='Phone'
                                placeholder='Enter your phone number' onChange={e => setMerchantPhone(e.target.value)} value={merchantPhone} />
                            {phoneValidation && (
                                <div className="text-danger mt-2">
                                    Please enter a valid phone number
                                </div>
                            )}
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='remark'>
                                <h6>Remarks and Additional Requests for Custom Configuration</h6>
                            </label>
                            <textarea className='form-control' id='remark' aria-label='Remarks'
                                rows={3} placeholder='Enter any additional requests' onChange={e => setRemark(e.target.value)} value={remark}>
                            </textarea>
                            {emptyWarningRemark && (
                                <div className="text-danger mt-2">
                                    remark should not be empty
                                </div>
                            )}
                        </div>
                        <div>
                            <button type='button' className='btn btn-primary mt-3' onClick={submitNewApplication}>
                                Submit Your Application
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
