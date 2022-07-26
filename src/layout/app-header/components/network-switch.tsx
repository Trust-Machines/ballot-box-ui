import React, {useState} from 'react';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {useNavigate} from '@reach/router';
import {NETWORK} from '../../../types'

import useNetwork from '../../../hooks/use-network';
import ThemedBox from '../../../components/themed-box';
import NetworkLabel from '../../../components/network-label';

export const NetworkMenu = (props: { onChange: (value: NETWORK) => void }) => {
    const [, , setNetwork] = useNetwork();

    const list: NETWORK[] = ['mainnet', 'testnet']
    return (
        <ThemedBox sx={{
            position: 'absolute',
            right: '0',
            top: '50px',
        }}>
            {list.map((n, i) => {
                return <Box key={n} sx={{mb: i === list.length - 1 ? null : '6px'}}>
                    <NetworkLabel network={n} onClick={() => {
                        props.onChange(n);
                        setNetwork(n);
                    }}/>
                </Box>
            })}
        </ThemedBox>
    )
}

const NetworkSwitch = () => {
    const [menu, setMenu] = useState(false);
    const [network] = useNetwork();
    const navigate = useNavigate();

    return (
        <ClickAwayListener onClickAway={() => {
            setMenu(false);
        }}>
            <Box sx={{
                flexGrow: 0,
                flexShrink: 0,
                ml: '10px',
                height: '40px',
                position: 'relative',
            }} onClick={() => {
                setMenu(true);
            }}>
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}>
                    <NetworkLabel network={network} onClick={() => {
                    }}/>
                </Box>
                {menu && <NetworkMenu onChange={(n) => {
                    setTimeout(() => {
                        setMenu(false);
                        if (network !== n) {
                            navigate('/').then();
                        }
                    }, 100);
                }}/>}
            </Box>
        </ClickAwayListener>);
}

export default NetworkSwitch;
