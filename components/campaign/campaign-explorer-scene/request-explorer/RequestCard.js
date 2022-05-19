import React, { Component } from "react";
import { Segment, Icon, Card, Container, Grid, Popup, Button, Header, Divider } from "semantic-ui-react";
import { voteRequest } from "../../../../web3/lib/action"

class RequestCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            request: {},
            requestStatusEnum: {},
            address: "0x0",
            isOwner: false,
            walletStatus: "not received",
            isApproveBtnLoading: false,
            isRejectBtnLoading: false,
            isResolveBtnLoading: false,
            isCancelBtnLoading: false,
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { request, requestStatusEnum, isOwner, walletStatus, address } = props;
        return {
            request,
            requestStatusEnum,
            isOwner,
            walletStatus,
            address
        };
    }

    renderFirstRowCardItems = () => {
        const { request } = this.state;
        if (typeof request === "undefined")
            return null;
        const {
            requestID,
            amount,
            recipient,
            requestDescription,
        } = request;
        return (
            <Grid.Row>
                <Grid.Column width={2}>
                    <h4>ID</h4>
                    <p>{requestID}</p>
                </Grid.Column>
                <Grid.Column>
                    <h4>Amount</h4>
                    <Icon name="ethereum" /> {amount}
                </Grid.Column>
                <Grid.Column>
                    <Popup
                    content={
                        recipient
                    } 
                    trigger={
                        <div>
                        <h4>Recipient</h4>
                        <p>{recipient.slice(0, 10)+ ((recipient.length > 10) ? "..." : "")}</p>
                        </div>
                    }/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Popup
                    content={
                        requestDescription
                    }
                    trigger={
                        <div>
                        <h4>Description</h4>
                        <p>{requestDescription.slice(0, 15) + ((requestDescription.length > 15) ? "..." : "")}</p>
                        </div>
                    }/>
                </Grid.Column>
            </Grid.Row>
        );
    }

    renderSecondRowCardItems = () => {
        const { request, requestStatusEnum } = this.state;
        if (typeof request === "undefined")
            return null;
        const {
            status,
            targetApprovalCount,
            approvalCount,
            rejectionCount
        } = request;
        return (
            <Grid.Row>
                <Grid.Column width={2}>
                    <h4>Status</h4>
                    <p>{requestStatusEnum[status]}</p>
                </Grid.Column>
                <Grid.Column>
                    <h4>Required Apr.</h4>
                    <p>{targetApprovalCount}</p>
                </Grid.Column>
                <Grid.Column>
                    <h4>Current Apr. /  Rej.</h4>
                    <p>{`${approvalCount} / ${rejectionCount}`}</p>
                </Grid.Column>
                <Grid.Column width={6}>
                    <h4>Action</h4>
                    {this.renderActionButton()}
                </Grid.Column>
            </Grid.Row>
        );
    }



    handleApprove = async () => {
        const { address, request } = this.state;
        this.setState({
            isApproveBtnLoading : true,
        });
        await voteRequest(address, request.requestID, "approve");
        this.setState({
            isApproveBtnLoading : false,
        });
        window.location.reload();
    }

    handleReject = async () => {
        const { address, request } = this.state;
        this.setState({
            isRejectBtnLoading : true,
        });
        await voteRequest(address, request.requestID, "reject");
        this.setState({
            isRejectBtnLoading : false,
        });
        window.location.reload();
    }

    handleResolve = async () => {
        const { address, request } = this.state;
        this.setState({
            isResolveBtnLoading : true,
        });
        await voteRequest(address, request.requestID, "resolve");
        this.setState({
            isResolveBtnLoading : false,
        });
        window.location.reload();
    }

    handleCancel = async () => {
        const { address, request } = this.state;
        this.setState({
            isCancelBtnLoading : true,
        });
        await voteRequest(address, request.requestID, "cancel");
        this.setState({
            isCancelBtnLoading : false,
        });
        window.location.reload();
    }
    

    renderActionButton = () => {
        const { walletStatus } = this.state;
        if (walletStatus !== "connected") {
            return (
                <p>
                    You are not connected
                </p>
            );
        }
        const { 
            isOwner, 
            request, 
            requestStatusEnum, 
            isApproveBtnLoading,
            isCancelBtnLoading,
            isRejectBtnLoading,
            isResolveBtnLoading
        } = this.state;
        const { status, isUserApproved, isUserRejected } = request;

        const isActive = (requestStatusEnum[status] === "Active");
        const isApproved = (requestStatusEnum[status] === "Approved");

        const isApproveBtnActive = (isActive || isApproved) && !isUserApproved && !isUserRejected;
        const isRejectBtnActive = (isActive || isApproved) && !isUserApproved && !isUserRejected;
        const isResolveBtnActive = isApproved;
        const isCancelBtnActive = isActive || isApproved;


        return (
            <Button.Group widths={4}>
            <Popup
            content="Approve this request."
            trigger={
                <Button
                content="APR."
                icon="check"
                onClick={this.handleApprove}
                loading={isApproveBtnLoading}
                disabled={!isApproveBtnActive}
                style={{
                    backgroundColor: "#80F55D",
                    color: "black"
                }}
                />
            }
            />
            <Button.Or />
            <Popup
            content="Reject this request."
            trigger={
                <Button 
                content="REJ."
                icon="cancel"
                onClick={this.handleReject}
                loading={isRejectBtnLoading}
                disabled={!isRejectBtnActive}
                style={{
                    backgroundColor: "#F5B18E",
                    color: "black"
                }}
                />
            }
            />
            {
                (isOwner) ? 
                (
                    <Button.Or />
                ) 
                : null
            }
            {
                (isOwner) ? (                    
                    <Popup
                    content="Resolve this request."
                    trigger={
                        <Button 
                        content="RLV."
                        icon="user plus"
                        disabled={!isResolveBtnActive}
                        loading={isResolveBtnLoading}
                        onClick={this.handleResolve}
                        style={{
                            backgroundColor: "rgb(117, 117, 244)",
                            color: "white"
                        }}
                    />}
                    />
                    ) : null
            }
            {
                (isOwner) ? (<Button.Or />) : null
            }
            {
                (isOwner) ? (
                <Popup
                    content="Cancel this request."
                    trigger={
                        <Button 
                        content="CXL."
                        icon="user cancel"
                        onClick={this.handleCancel}
                        disabled={!isCancelBtnActive}
                        loading={isCancelBtnLoading}
                        style={{
                            backgroundColor: "rgb(95, 95, 95)",
                            color: "black"
                        }}
                        />
                    }
                />
                ) : null
            }
        </Button.Group>
        );
    }

    render() {
        const { isOwner, request, requestStatusEnum } = this.state;
        const { status, isUserApproved, isUserRejected } = request;
        const isActive = (requestStatusEnum[status] === "Active");
        const isApproved = (requestStatusEnum[status] === "Approved");
        const isResolved = (requestStatusEnum[status] === "Resolved");

        const extraMsg = (isOwner && isApproved) ? "This request is ready to resolve." 
            : (isResolved) ? "This request has been resolved."
            : (isUserApproved) ? "You have already approved this request"
            : (isUserRejected) ? "You have already rejected this request"
            : "";

        return (
            <Card fluid style={{
                color: (isActive || (isOwner && isApproved)) ? "" : "gray"
            }}>
                <Card.Content>
                    <Grid celled columns={4}>
                        {this.renderFirstRowCardItems()}
                        {this.renderSecondRowCardItems()}
                        {(extraMsg) ? (                   
                        <Grid.Row>
                            <Grid.Column width={8}>
                                {extraMsg}
                            </Grid.Column>
                        </Grid.Row>
                        ): null}
                    </Grid>
                </Card.Content>
            </Card>
        );
    }
}

export default RequestCard;