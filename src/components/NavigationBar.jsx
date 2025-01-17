import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Navbar, Button } from 'react-bootstrap';
import { loginRequest } from '../utils/authConfig';

export const NavigationBar = () => {
    const { instance } = useMsal();

    const handleLoginRedirect = () => {
        instance.loginRedirect(loginRequest).catch((error) => console.log(error));
    };

    const handleLogoutRedirect = () => {
        instance.logoutRedirect().catch((error) => console.log(error));
    };

    /**
     * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
     * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
     * only render their children if a user is authenticated or unauthenticated, respectively.
     */
    return (
        <>
            <Navbar bg="primary" variant="dark" className="navbarStyle">
                <a className="navbar-brand" href="/">
                    GENTERA Demo App 1 - Microsoft identity platform
                </a>
                <AuthenticatedTemplate>
                    <div className="collapse navbar-collapse justify-content-end">
                        <span style={{color:"white", fontSize:"9pt", marginRight:"10px", fontWeight:"bolder"}}>
                                Bienvenido, {instance.getActiveAccount()?.name}
                        </span>
                        <Button variant="warning" onClick={handleLogoutRedirect}>
                            Salir
                        </Button>
                    </div>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <div className="collapse navbar-collapse justify-content-end">
                        <Button onClick={handleLoginRedirect} variant='light'>
                            Iniciar Sesión
                        </Button>
                    </div>
                </UnauthenticatedTemplate>
            </Navbar>
        </>
    );
};