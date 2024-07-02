import React from 'react';
import { useOktaAuth } from "@okta/okta-react";
import { Link, NavLink } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import "./../../../src/App.css"
import Cart from './Components/Cart';

export const Navbar: React.FC = () => {
    const { oktaAuth, authState } = useOktaAuth();

    if (!authState) {
        return <SpinnerLoading />;
    }

    const handleLogout = async () => {
        await oktaAuth.signOut();
    };
    console.log(authState)
    // Extract the user's name from the authState
    const userName = authState.idToken?.claims?.name as string;

    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-0'>
            <div className='container-fluid'>
                <span><NavLink className='nav-link navbar-brand' to={"/home"}>E-COM</NavLink></span>
                <button className='navbar-toggler' type='button'
                    data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
                    aria-controls='navbarNavDropdown' aria-expanded='false'
                    aria-label='Toggle Navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to={"/home"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="40" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                                    <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
                                </svg>
                                {/* Home */}
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to={"/search"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="40" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                                {/* Search Products */}
                            </NavLink>
                        </li>
                        {/* {authState.isAuthenticated &&
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/cart"}>Cart</NavLink>
                            </li>

                        } */}
                        {authState.isAuthenticated && authState.accessToken?.claims?.userType === 'admin' &&
                            <li className='nav-item'>
                                <NavLink className='nav-link ' to='/admin'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="40" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                    </svg>
                                    AdminPanel
                                </NavLink>
                            </li>
                        }
                        {authState.isAuthenticated && authState.accessToken?.claims?.userType === 'merchant' &&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/merchant'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="40" fill="currentColor" className="bi bi-clipboard-data-fill" viewBox="0 0 16 16">
                                        <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zM10 8a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1" />
                                    </svg>
                                    MerchantPanel
                                </NavLink>
                            </li>
                        }
                        {/* <li>
                            <NavLink className="nav-link" to={"/cart"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-cart2" viewBox="0 0 16 16">
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                                    Cart
                                </svg>
                            </NavLink>
                        </li> */}
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        {!authState.isAuthenticated ?
                            <li className='nav-item m-1'>
                                <Link type="button" className='btn btn-outline-light me-2' to="/merchantRegd">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className="bi bi-person-vcard" viewBox="0 0 16 16">
                                        <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
                                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
                                    </svg>
                                    Register AS Merchant
                                </Link >
                                <Link type='button' className='btn btn-outline-light' to='/login'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className="bi bi-door-open-fill" viewBox="0 0 16 16">
                                        <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                                    </svg>
                                    Sign in
                                </Link>
                            </li>

                            :
                            <li className='nav-item m-1 d-flex align-items-center'>
                                <Cart></Cart>
                                <NavLink className='nav-link navbar-brand' to='/userProfilePage'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                    </svg>
                                    {userName}
                                </NavLink>
                                <button className="btn btn-outline-light" onClick={handleLogout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                    </svg>
                                    Logout
                                </button>

                            </li>
                        }

                    </ul>
                </div>
            </div>
        </nav>
    );
}
