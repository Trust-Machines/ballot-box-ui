import {Space} from '../../../../types';
import {Muted} from '../../../../components/text';

const Proposals = (props: { space: Space }) => {

    return <>
        <Muted sx={{textAlign: 'center', mt: '100px'}}>No proposals yet</Muted>
    </>;
}

export default Proposals;
