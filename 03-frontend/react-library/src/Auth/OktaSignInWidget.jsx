// Import the OktaSignIn class from the @okta/okta-signin-widget library, which provides the Okta sign-in widget functionality.
import OktaSignIn from "@okta/okta-signin-widget";
// Import the useEffect and useRef hooks from the react library, which are used to manage side effects and references to DOM nodes.
import { useEffect, useRef } from "react";
// Import the oktaConfig object from the../lib/oktaConfig module, which contains the Okta configuration settings.
import { oktaConfig } from "../lib/oktaConfig";
// Import the CSS styles for the Okta sign-in widget from the @okta/okta-signin-widget library.
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";

// Define the OktaSignInWidget component, which takes onSuccess and onError props as arguments.
const OktaSignInWidget = ({ onSuccess, onError }) => {
    // Create a reference to a DOM node using the useRef hook, which will be used to render the Okta sign-in widget.
    const widgetRef = useRef();

    // Use the useEffect hook to create and render the Okta sign-in widget when the component mounts.
    useEffect(() => {
        // Check if the widgetRef is null or undefined, and return false if it is.
        if (!widgetRef.current) {
            return false;
        }
        // Create a new instance of the OktaSignIn class, passing the oktaConfig object as an argument.
        const widget = new OktaSignIn(oktaConfig);
        // Call the showSignInToGetTokens method on the widget instance, passing an options object with the el property set to the widgetRef.current DOM node.
        widget.showSignInToGetTokens({
            el: widgetRef.current,
        })
        // Chain a then method to handle the successful sign-in, calling the onSuccess prop function.
       .then(onSuccess)
        // Chain a catch method to handle any errors, calling the onError prop function.
       .catch(onError);
        // Return a cleanup function that removes the widget when the component unmounts.
        return () => widget.remove();
    }, [onSuccess, onError]);

    // Return a JSX element that renders a container div with a child div that will render the Okta sign-in widget.
    return (
        <div className="container mt-5 mb-5">
            <div ref={widgetRef}></div>
        </div>
    );
};

// Export the OktaSignInWidget component as the default export.
export default OktaSignInWidget;