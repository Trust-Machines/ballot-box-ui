import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {RouteComponentProps, useParams} from '@reach/router';
import {Helmet} from 'react-helmet';

import Proposal from './sections/proposal';
import ProposalEdit from './sections/edit';
import AppMenu from '../../layout/app-menu';
import AppHeader from '../../layout/app-header';
import AppWrapper from '../../layout/app-wrapper';
import AppContent from '../../layout/app-content';
import {getProposal} from '../../api/ballot-box';
import {proposalAtom} from '../../store';

const ProposalPage = (_: RouteComponentProps) => {
    const [proposal, setProposal] = useAtom(proposalAtom);
    const params = useParams();

    useEffect(() => {
        getProposal(Number(params.proposalId)).then(r => {
            setProposal(r);
        })

        return () => {
            setProposal(null);
        }
    }, [params.proposalId]);
console.log(JSON.stringify(proposal))
    return <>
        {proposal && <Helmet><title>{`${proposal.title} | BallotBox`}</title></Helmet>}
        <AppMenu/>
        <AppWrapper>
            <AppHeader/>
            <AppContent>
                {(() => {
                    if (!proposal) {
                        return null;
                    }

                    if (!params.section) {
                        return <Proposal proposal={proposal}/>
                    }

                    if (params.section === 'edit') {
                        return <ProposalEdit proposal={proposal}/>
                    }

                    return null;
                })()}
            </AppContent>
        </AppWrapper>
    </>
}


export default ProposalPage;
