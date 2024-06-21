// Import the useOktaAuth hook from the @okta/okta-react library, which provides authentication functionality.
import { useOktaAuth } from "@okta/okta-react";

// Import the SpinnerLoading component from the ../layouts/Utils/SpinnerLoading module, which displays a loading spinner.
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";

// Import the Redirect component from the react-router-dom library, which allows for client-side routing.
import { Redirect } from "react-router-dom";

// Import the OktaSignInWidget component from the ./OktaSignInWidget module, which renders the Okta sign-in widget.
import OktaSignInWidget from "./OktaSignInWidget";

// Define the LoginWidget component, which takes a config prop as an argument.
const LoginWidget = ({ config }) => {
    // Use the useOktaAuth hook to get the oktaAuth and authState objects, which provide authentication functionality and state.
    const { oktaAuth, authState } = useOktaAuth();

    // Define a onSuccess function that takes tokens as an argument, which is called when the sign-in is successful.
    const onSuccess = (tokens) => {
        // Call the handleLoginRedirect method on the oktaAuth object, passing the tokens as an argument, to handle the login redirect.
        oktaAuth.handleLoginRedirect(tokens);
    };

    // Define an onError function that takes an error object as an argument, which is called when the sign-in fails.
    const onError = (err) => {
        // Log the sign-in error to the console.
        console.log("Sign in error: ", err);
    };

    // Check if the authState is falsy (i.e., null or undefined).
    if (!authState) {
        // If authState is falsy, return the SpinnerLoading component, which displays a loading spinner.
        return (
            <SpinnerLoading />
        );
    }

    // Check if the user is authenticated based on the authState.isAuthenticated property.
    return authState.isAuthenticated ?
        // If the user is authenticated, return a Redirect component that redirects to the root URL ("/").
        <Redirect to={{ pathname: "/" }} /> :
        // If the user is not authenticated, return the OktaSignInWidget component, passing the config, onSuccess, and onError props.
        <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />;
};

// Export the LoginWidget component as the default export.
export default LoginWidget;