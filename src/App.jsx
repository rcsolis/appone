import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react';
import { Container, Button } from 'react-bootstrap';
import { PageLayout } from './components/PageLayout';
import { IdTokenData } from './components/DataDisplay';
import { loginRequest } from './utils/authConfig';

import './styles/App.css';
import { MakeRequests } from './components/MakeRequests';

/**
* Most applications will need to conditionally render certain components based on whether a user is signed in or not. 
* msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will 
* only render their children if a user is authenticated or unauthenticated, respectively. For more, visit:
* https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
*/
const MainContent = () => {
    /**
    * useMsal is hook that returns the PublicClientApplication instance,
    * that tells you what msal is currently doing. For more, visit:
    * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
    */
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    const handleRequestNoAuth = () => {
        console.log("Making Unauthorized request");
        // Make request to backend API
        fetch('http://localhost:5000/api/nosecure', {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain',
            },
        })
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            document.getElementById('noAuthResp').innerText = JSON.stringify(data);
        })
        .catch((error) => {
            document.getElementById('noAuthResp').innerText = JSON.stringify(error);
            console.error('There was an error!', error);
        });
    };
    const handleRequestAuth = () => {
      // Make request to backend API with Bearer token from MSAL
      const tokenRequest = {
          scopes: ["api://323d2ffd-0781-4c18-a725-fa643e5cad3d/allow_user"],
          account: activeAccount,
      };
      instance.acquireTokenSilent(tokenRequest).then((accessTokenResponse) => {
          fetch('http://localhost:5000/api/secure', {
              method: 'GET',
              headers: {
                  'Content-Type': 'text/plain',
                  'Authorization': `Bearer ${accessTokenResponse.accessToken}`
              },
          })
          .then((response) => response.text())
          .then((data) => {
              console.log(data);
              document.getElementById('authResp').innerText = JSON.stringify(data);
          })
          .catch((error) => {
              document.getElementById('authResp').innerText = JSON.stringify(error);
              console.error('There was an error!', error);
          });
      });
    };

    return (
        <div className="App">
          {activeAccount ? (
                <AuthenticatedTemplate>
                    <Container>
                        <MakeRequests signed={true} handleRequestNoAuth={handleRequestNoAuth} handleRequestAuth={handleRequestAuth}/>
                        <IdTokenData idTokenClaims={activeAccount.idTokenClaims} />
                    </Container>
                </AuthenticatedTemplate>
                ) : (
                  <UnauthenticatedTemplate>
                      <h1> You need to Login for make authenticated requests</h1>
                      <MakeRequests signed={false} handleRequestNoAuth={handleRequestNoAuth} handleRequestAuth={handleRequestAuth}/>
                  </UnauthenticatedTemplate>
                )}
        </div>
    );
};


/**
* msal-react is built on the React context API and all parts of your app that require authentication must be 
* wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication 
* then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the 
* PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
* https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
*/
const App = ({ instance }) => {
    return (
        <MsalProvider instance={instance}>
            <PageLayout>
                <MainContent />
            </PageLayout>
        </MsalProvider>
    );
};

export default App;