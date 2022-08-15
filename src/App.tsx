import React from 'react';
import {Router} from '@reach/router';

import Home from './views/home';
import Space from './views/space';
import CreateSpace from './views/space/create';
import Proposal from './views/proposal';
import useStyles from './hooks/use-styles';


function App() {
    const styles = useStyles();

    return (
        <Router style={{
            minHeight: '100vh',
            display: 'flex',
            color: styles.textColor
        }}>
            <Home path='/'/>
            <CreateSpace path='/create-space'/>
            <Space path='/spaces/:spaceId'/>
            <Space path='/spaces/:spaceId/:section'/>
            <Proposal path='/spaces/:spaceId/proposals/:proposalId'/>
        </Router>
    );
}

export default App;
