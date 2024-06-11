import React from 'react';
import { useOktaAuth } from "@okta/okta-react";
import { Link, NavLink } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

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
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
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
                            <NavLink className='nav-link' to={"/home"}>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to={"/search"}>Search Products</NavLink>
                        </li>
                        {authState.isAuthenticated &&
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/cart"}>Cart</NavLink>
                            </li>
                        }
                        {authState.isAuthenticated && authState.accessToken?.claims?.userType === 'admin' &&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/admin'>AdminPanel</NavLink>
                            </li>
                        }
                        {authState.isAuthenticated && authState.accessToken?.claims?.userType === 'merchant' &&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/merchant'>MerchantPanel</NavLink>
                            </li>
                        }
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        {!authState.isAuthenticated ?
                            <li className='nav-item m-1'>
                                <Link type='button' className='btn btn-outline-light' to='/login'>Sign in</Link>
                            </li>
                            :
                            <li className='nav-item m-1 d-flex align-items-center'>
                                {userName && <span className='text-light me-2'>{userName}</span>}
                                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}
