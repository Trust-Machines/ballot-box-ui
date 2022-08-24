import React, {useEffect, useState} from 'react';
import moment, {Moment} from 'moment';
import {useNavigate} from '@reach/router';
import {useAtom} from 'jotai';
import ProposalForm from '../../../components/proposal-form';
import {Space} from '../../../../types';
import {H2} from '../../../../components/text';
import useTranslation from '../../../../hooks/use-translation';
import useToast from '../../../../hooks/use-toast';
import {proposalsAtom} from '../../../../store';

const CreateProposal = (props: { space: Space }) => {
    const {space} = props;
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [, showMessage] = useToast();
    const [done, setDone] = useState(false);
    const [proposals, setProposals] = useAtom(proposalsAtom);

    useEffect(() => {
        if (done) {
            showMessage(t('Your new proposal created'), 'success');
            navigate(`/spaces/${space.id}`).then();
        }
    }, [done]);

    return <>
        <ProposalForm
            space={space}
            formDefault={{
                title: '',
                body: '',
                discussionLink: '',
                choices: ['For', 'Against', 'Abstain'],
                startDate: moment().add(2, 'hour').set('minutes', 0).set('seconds', 0).set('millisecond', 0),
                endDate: moment().add(2, 'hour').set('minutes', 0).set('seconds', 0).set('millisecond', 0).add(1, 'day')
            }}
            onSuccess={(p) => {
                setProposals([...proposals, p]);
                setDone(true);
            }}
        />
    </>
}

export default CreateProposal;
