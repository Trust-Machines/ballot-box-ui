import React from 'react';
import {Box, Button} from '@mui/material';
import {openSignatureRequestPopup} from "@stacks/connect";

import useAddress from './hooks/use-address';
import useUserSession from './hooks/use-user-session';
import useNetwork from './hooks/use-network';
import {SignatureData, UserSession} from '@stacks/connect-react';
import {appConfig, baseAuthOptions} from './constants';
import {SIGNATURE_MESSAGE} from './constants';

function App() {
    const address = useAddress();
    const [, , openAuth, signOut] = useUserSession();
    const [, stacksNetwork] = useNetwork();

    const onSignFinish = (data: SignatureData) => {
        console.log("Signature of the message", data.signature);
        console.log("Use public key:", data.publicKey);


        fetch('http://127.0.0.1:8081/me', {
            headers: {
                'Content-Type': 'application/json',
                'x-signature': data.signature,
                'x-public-key': data.publicKey,
                'x-network': 'mainnet'
            },
        })
            .then(r => r.json())
            .then(r => {
                console.log(r)
            })
    }

    const signMessage = () => {
        const signOptions = {
            userSession: new UserSession({appConfig}),
            ...baseAuthOptions,
            message: SIGNATURE_MESSAGE,
            network: stacksNetwork,
            onFinish: onSignFinish,
        };

        openSignatureRequestPopup(signOptions).then()
    }

    if (!address) {
        return <Box sx={{p: '10px'}}><Button variant="contained" onClick={openAuth}>Sign in</Button> </Box>
    }

    return <Box sx={{p: '10px'}}>
        <Button variant="contained" onClick={signMessage}>Sign message</Button>
        <Button variant="contained" onClick={signOut}>Sign out</Button>
    </Box>
}

export default App;
