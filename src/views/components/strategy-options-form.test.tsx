import {render} from '@testing-library/react';

import StrategyOptionsForm from './strategy-options-form';

test('1 stx-balance', () => {
    const view = render(<StrategyOptionsForm strategy="stx-balance" readOnly={false} values={{}} onChange={() => {
    }}/>);
    expect(view.container).toMatchSnapshot()
});


test('2 sip-010-get-balance', () => {
    const view = render(<StrategyOptionsForm strategy="sip-010-get-balance" readOnly={false} values={{}} onChange={() => {
    }}/>);
    expect(view.container).toMatchSnapshot()
});


test('3 sip-010-get-balance with values', () => {
    const view = render(<StrategyOptionsForm strategy="sip-010-get-balance" readOnly={false} values={{
        symbol: 'USDT',
        address: 'usdt.contract',
        decimals: 6
    }} onChange={() => {
    }}/>);
    expect(view.container).toMatchSnapshot()
});


