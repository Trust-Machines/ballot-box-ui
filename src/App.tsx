import React from 'react';
import {Router} from '@reach/router';

import Home from './views/home';
import Space from './views/space';
import useStyles from './hooks/use-styles';


function App() {
    const styles = useStyles();

    return (
        <Router style={{
            minHeight: '100vh',
            display: 'flex',
            color: styles.appBgColor
        }}>
            <Home path='/'/>
            <Space path='/spaces/:spaceId'/>
            <Space path='/spaces/:spaceId/:section'/>
        </Router>
    );
}

export default App;
