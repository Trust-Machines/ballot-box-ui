import {render} from '@testing-library/react';

import StrategySelect from './strategy-select';

test('1 Default render', () => {
    const view = render(<StrategySelect value="empty" readonly={false} onChange={() => {
    }}/>);
    expect(view.container).toMatchSnapshot()
});

test('2 stx-balance selected', () => {
    const view = render(<StrategySelect value="stx-balance" readonly={false} onChange={() => {
    }}/>);
    expect(view.container).toMatchSnapshot()
});

