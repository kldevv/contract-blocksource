import React, { Component, useEffect, useState } from "react";
import { Container, Segment, Card, Icon, Button, Input } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from 'next/router'

import Layout from "../../components/common/Layout";
import CampaignHeaderBarScene from "../../components/campaign/CampaignHeaderBarScene";
import CampaginInfoScene from "../../components/campaign/CampaginInfoScene";
import CampaignExplorerScene from "../../components/campaign/CampaignExplorerScene";

import { getWalletStatus, getFirstAccount } from "../../web3/lib/wallet";
import { getCampaignInfoDetail } from "../../web3/lib/info"
import { contributeCampaign, lockCampaign, unlockCampaign } from "../../web3/lib/action"

const CampaignPageWrapper = () => {
    // Using wrapper because class component does not support hook
    // Router is a hook
    // We need router to access dynamic query arguments
    const router = useRouter();
    const { addr } = router.query;

    const [walletStatus, setWalletStatus] = useState("not received");
    const [account, setAccount] = useState("0x0");
    const [campaignInfo, setCampaignInfo] = useState({});
    const [requests, setRequests] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const walletStatus = await getWalletStatus();
                setWalletStatus(walletStatus);
                const account = await getFirstAccount();
                setAccount(account);
                const [campaignInfo, requests, events] = await getCampaignInfoDetail(addr);
                setCampaignInfo(campaignInfo);
                setRequests(requests);
                setEvents(events);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [addr]);
    return (
        <CampaignPage 
        walletStatus={walletStatus} 
        account={account} 
        campaignInfo={campaignInfo} 
        requests={requests}
        events={events}
        />
    ); 
}

class CampaignPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            walletStatus: "not received",
            account: "0x0",
            activeItem: "Explorer",
            campaignInfo: {},
            requests: [],
            events: [],
            isOwner: false,
            hasApproved: false,
            hasRejected: false,
            isContributionBtnLoading: false,
            isLockBtnLoading: false,
            isUnlockBtnLoading: false,
            contributeAmount: 0,
        }
        
    }
    static getDerivedStateFromProps(props, state) {
        const {
            walletStatus,
            account,
            campaignInfo,
            requests,
            events
        } = props;
        const isOwner = (account == campaignInfo["owner"]);
        return {
            walletStatus,
            account,
            campaignInfo,
            requests,
            isOwner,
            events
        };
    }

    makeContribution = async () => {
        const { contributeAmount, campaignInfo } = this.state;
        this.setState({
            isContributionBtnLoading: true
        });
        try {
            if (await contributeCampaign(campaignInfo.address, contributeAmount)) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({
                isContributionBtnLoading: false
            });
        }
    }

    makeLocked = async () => {
        const { campaignInfo } = this.state;
        this.setState({
            isLockBtnLoading: true
        });
        try {
            if (await lockCampaign(campaignInfo.address)) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({
                isLockBtnLoading: false
            });
        }
    }

    makeUnlocked = async () => {
        const { campaignInfo } = this.state;
        this.setState({
            isUnlockBtnLoading: true
        });
        try {
            if (await unlockCampaign(campaignInfo.address)) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({
                isUnlockBtnLoading: false
            });
        }
    }

    renderWindowSwitch = () => {
        const {
            campaignInfo,
            isOwner,
            isContributionBtnLoading,
            isLockBtnLoading,
            isUnlockBtnLoading
        } = this.state;
        return (
                <Container>
                    { 
                        (!campaignInfo.isPatron && !campaignInfo.isLocked) ?
                        (
                            <Input 
                            required
                            type="number"
                            action={{
                            color: "purple",
                            labelPosition: 'left',
                            icon: 'plus',
                            content: "Contribute",
                            onClick: this.makeContribution,
                            loading: isContributionBtnLoading,
                            }}
                            placeholder={`Amount`}
                            onChange={(event) => {
                                this.setState({
                                    contributeAmount: Math.max(event.target.value, 0)
                                });
                            }}
                            />
                        ) : null 
                    }
                    {
                        (!campaignInfo.isLocked && isOwner) ?
                        (
                            <Container>
                            <Button 
                            circular
                            style={{
                                backgroundColor: "rgb(117, 117, 244)",
                                color: "white",
                                marginTop: "4em"
                            }}
                            disabled={campaignInfo.patronCount <= 0}
                            loading={isUnlockBtnLoading}
                            onClick={this.makeLocked}
                            >
                                <Icon name="lock"/>
                                Lock Campaign
                            </Button>
                            </Container>
                        ) : null
                    }
                    {
                        (campaignInfo.isLocked && isOwner) ?
                        (
                            <Button 
                            style={{
                                backgroundColor: "rgb(95, 95, 95)",
                                color: "white",
                                marginTop: "4em"
                            }}
                            disabled={campaignInfo.activeRequestCount != 0}
                            loading={isLockBtnLoading}
                            onClick={this.makeUnlocked}
                            >
                                <Icon name="unlock"/>
                                Unlock Campaign
                            </Button>
                        ) : null
                    }
                </Container>
            );
    }

    render() {
        const { 
            walletStatus, 
            campaignInfo, 
            account, 
            isOwner,
            requests,
            events
        } = this.state;
        return (
            <Layout walletStatus={walletStatus} account={account}>
                <Segment 
                vertical
                style={{
                    minHeight: 2000
                }}>
                <CampaignHeaderBarScene />
                <CampaginInfoScene 
                campaignInfo={campaignInfo} 
                walletStatus={walletStatus}
                isOwner={isOwner}
                />
                <Container 
                textAlign="center"
                style={{
                    marginBottom: "3em"
                }}>
                {this.renderWindowSwitch()}
                </Container>
                <CampaignExplorerScene 
                requests={requests}
                events={events}
                isOwner={isOwner}
                walletStatus={walletStatus}
                address={campaignInfo.address}
                isLocked={campaignInfo.isLocked}
                />;
                </Segment>
            </Layout>
        );
    }
}

export default CampaignPageWrapper;