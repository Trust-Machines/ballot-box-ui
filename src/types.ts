export type NETWORK = 'mainnet' | 'testnet';

export interface USER_AUTH {
    signature: string,
    publicKey: string
}

export interface ApiError {
    error: string
}

export interface StrategyOptionsRecord {
    symbol: string,
    [key: string]: any
}

export interface SpaceBase {
    name: string,
    about: string | null,
    websiteLink: string | null,
    termsLink: string | null,
    twitterHandle: string | null,
    githubHandle: string | null,
    network: NETWORK,
    strategy: string,
    strategyOptions: StrategyOptionsRecord
}

export interface Space extends SpaceBase {
    id: number,
    userId: number,
    picture: string | null,
    proposalCount: number,
}

export type ProposalStatus = 'new' | 'on' | 'off';
export type VoteStats = {
    choice: string,
    power: number
}[];

export interface ProposalBase {
    title: string,
    body: string | null,
    discussionLink: string | null,
    startTime: number,
    endTime: number,
    choices: string[]
}

export interface Proposal extends ProposalBase {
    id: number,
    userId: number,
    spaceId: number,
    startBlock?: number,
    startBlockTip?: string,
    status: ProposalStatus,
    voteCount: number,
    voteStats: VoteStats;
    network: NETWORK,
    strategy: string,
    strategyOptions: StrategyOptionsRecord
}

export interface ProposalWithSpace extends Proposal {
    space: Space
}

export interface VoteBase {
    userAddress: string,
    userName: string | null,
    choice: string,
    power: number
}

export interface Vote extends VoteBase {
    id: number,
    proposalId: number,
    userId: number,
}

export interface VoteWithProposal extends Vote {
    proposal: Proposal
}

