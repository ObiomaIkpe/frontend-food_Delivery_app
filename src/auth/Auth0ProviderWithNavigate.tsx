import { useCreateMyUser } from "@/api/MyUserApi";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
}

const Auth0ProviderWithNavigate = ({children}: Props) => {
    const navigate = useNavigate();
    //const {createUser, } = useCreateMyUser();
    
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirecturi = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    if(!domain || !clientId || !redirecturi || !audience) {
        throw new Error("unable to initialize auth!")
    }

    const onRedirectCallback = (appState?: AppState, user?: User) => {
        console.log("USER", user)
        // // console.log("TOKEN", token)
        // navigate("/auth-callback")

        // if(user?.sub && user?.email) {
        //     createUser({
        //         auth0Id: user.sub, 
        //         email: user.email
        //     })
        // }
    }

    return (
        <Auth0Provider domain={domain}
        clientId={clientId}
        authorizationParams={{ redirect_uri: redirecturi, audience }}
        onRedirectCallback={onRedirectCallback}
        
        >{children} </Auth0Provider>
    )
};

export default Auth0ProviderWithNavigate;