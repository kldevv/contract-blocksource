import { Component } from "react";
import { Form, Checkbox, Button, Header, TextArea, Card, Segment, Icon } from "semantic-ui-react";
import { issueRequest } from "../../../../web3/lib/action";

class NewRequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            walletStatus: "not received",
            address: "0x0",
            recipient: "0x0",
            amount: 0,
            email: "test@test.com",
            description: "",
            isLoading: false
        };
    }
    static getDerivedStateFromProps(props, state) {
        const { walletStatus, address } = props;
        return {
            walletStatus,
            address,
        };
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {address, recipient, amount, description} = this.state;
        if (amount < 0) {
            throw Error("amount need to be a positive number.");
        }
        this.setState({
            isLoading: true
        });
        try {
            await issueRequest(address, recipient, amount, description)
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({
                isLoading: false
            });
        }
    }

    render() {
        const { walletStatus, isLoading } = this.state;
        return (
            <Form
            onSubmit={this.handleSubmit}
            style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                fontSize: "20px"
            }}>
                <Form.Field required>
                    <label
                    style={{
                        fontSize: '13px',
                        color: "rgb(95, 95, 95)",
                        fontWeight: "normal"
                    }}> Required fields</label>
                </Form.Field>
                <Form.Field required>
                    <label> Recipient </label>
                    <p
                    style={{
                        fontSize: '13px',
                        color: "rgb(95, 95, 95)",
                        fontWeight: "normal"
                    }}> Receiver of the amount.</p>
                    <input 
                    required
                    type="text" 
                    name="recipient" 
                    placeholder="Recipient"
                    onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field required>
                    <label> Amount </label>
                    <p
                    style={{
                        fontSize: '13px',
                        color: "rgb(95, 95, 95)",
                        fontWeight: "normal"
                    }}>Amount to send.</p>
                    <input 
                    required
                    type="number"
                    name="amount"
                    placeholder="Amount" 
                    onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label> Email </label>
                    <p
                    style={{
                        fontSize: '13px',
                        color: "rgb(95, 95, 95)",
                        fontWeight: "normal"
                    }}> Only for the purpose of developer's personal study; your email will be kept confidential, and no commerical activities involved. (I might even not bother to collect them)</p>
                    <input
                    type="email" 
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field required>
                    <label> Description </label>
                    <p
                    style={{
                        fontSize: '13px',
                        color: "rgb(95, 95, 95)",
                        fontWeight: "normal"
                    }}> 
                    Additional information to ensure the functionality fo the request. <br /><br />
                    <em>Attention: Adding messages will cost gas since they will be written to the contract on chain; 
                    if no additional information needed, put "N/A" without the double quotation marks to remove ambiguity. </em>
                    </p>
                    <TextArea
                    name="description"
                    placeholder="Description"
                    onChange={this.handleChange}
                    />
                </Form.Field>
                <Button
                type="submit"
                disabled={walletStatus !== "connected"}
                loading={isLoading}
                style={{ 
                    fontFamily: "Poppins, sans-serif",
                    backgroundColor: "rgb(117, 117, 244)",
                    color: "white"
                }}>
                Issue
                </Button>
            </Form>
        );
    }
}

export default NewRequestForm;