export const oktaConfig = {
    clientId: "0oahc7pilzSZlIsdq5d7",
    issuer: "https://dev-52275887.okta.com/oauth2/default",
    redirectUri: "http://localhost:3000/login/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: true,
    features: {
        registration: true  // Enable self-service registration feature
    },
    registration: {
        parseSchema: function(schema: { profileSchema: { properties: { firstName: { type: string; description: string; }; lastName: { type: string; description: string; }; }; }; }, onSuccess: (arg0: any) => void, onFailure: any) {
            schema.profileSchema.properties.firstName = {
                type: 'string',
                description: 'First Name'
            };
            schema.profileSchema.properties.lastName = {
                type: 'string',
                description: 'Last Name'
            };
            onSuccess(schema);
        },
        preSubmit: function (postData: any, onSuccess: (arg0: any) => void, onFailure: any) {
            onSuccess(postData);
        },
        postSubmit: function (response: any, onSuccess: (arg0: any) => void, onFailure: any) {
            onSuccess(response);
        }
    }
};