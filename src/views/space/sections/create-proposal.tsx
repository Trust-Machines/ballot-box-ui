import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useNavigate} from '@reach/router';
import {useAtom} from 'jotai';
import ProposalForm from '../../components/proposal-form';
import {Space} from '../../../types';
import useTranslation from '../../../hooks/use-translation';
import useToast from '../../../hooks/use-toast';
import {proposalsAtom} from '../../../store';
import {toUnixTs} from '../../../util';

const CreateProposal = (props: { space: Space }) => {
    const {space} = props;
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [, showMessage] = useToast();
    const [done, setDone] = useState(false);
    const [proposals, setProposals] = useAtom(proposalsAtom);
    let timer: any;

    useEffect(() => {
        if (done) {
            showMessage(t('Your new proposal created'), 'success');
            navigate(`/spaces/${space.id}`).then();
        }
    }, [done]);

    const getFormData = (field: string) => {
        const key = `proposal_form_${field}`;
        if (localStorage.getItem(key)) {
            try {
                return JSON.parse(localStorage.getItem(key) || '');
            } catch (e) {
                return;
            }
        }
    }

    const startDateStorage = getFormData('startDate');
    const endDateStorage = getFormData('endDate');

    return <>
        <ProposalForm
            space={space}
            formDefault={{
                title: getFormData('title') || '',
                body: getFormData('body') || '',
                discussionLink: getFormData('discussionLink') || '',
                choices: getFormData('choices') || ['For', 'Against', 'Abstain'],
                startDate: startDateStorage ? moment.unix(startDateStorage) : moment().add(2, 'hour').set('minutes', 0).set('seconds', 0).set('millisecond', 0),
                endDate: endDateStorage ? moment.unix(endDateStorage) : moment().add(2, 'hour').set('minutes', 0).set('seconds', 0).set('millisecond', 0).add(1, 'day')
            }}
            onSuccess={(p) => {
                setProposals([...proposals, p]);
                setDone(true);
                for (let k of Object.keys(localStorage)) {
                    if (k.startsWith('proposal_form_')) {
                        localStorage.removeItem(k);
                    }
                }
            }}
            onChange={(a) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    let v: any = a.value;
                    if (a.field === 'startDate' || a.field === 'endDate') {
                        v = toUnixTs(a.value.toDate().getTime())
                    }
                    localStorage.setItem(`proposal_form_${a.field}`, JSON.stringify(v));
                }, 500);
            }}
        />
    </>
}

export default CreateProposal;
