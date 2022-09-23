import {render} from '@testing-library/react';

import TestStrategyBtn from './test-strategy-btn';

test('1 Default render', () => {
    const view = render(<TestStrategyBtn strategy="stx-balance" network="mainnet" strategyOptions={{}}/>);
    expect(view.container).toMatchSnapshot()
});

test('2 Empty strategy', () => {
    const view = render(<TestStrategyBtn strategy="empty" network="mainnet" strategyOptions={{}}/>);
    expect(view.container).toMatchSnapshot()
});
