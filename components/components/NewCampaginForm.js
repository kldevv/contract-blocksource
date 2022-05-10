import { Component } from "react";
import { Form, Checkbox, Button, Header, TextArea, Card, Segment, Icon } from "semantic-ui-react";
import Link from "next/link";

class NewCampaignForm extends Component {
    render() {
        return (
            <Form
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
                <Form.Field>
                    <label> Image, Video, Audio, or 3D Model (Holder)</label>
                    <p
                    style={{
                        fontSize: '13px',
                        color: "rgb(95, 95, 95)",
                        fontWeight: "normal"
                    }} > File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB </p>
                    <Card
                    link
                    style={{
                    border: "3px dashed rgb(195, 195, 195)",
                    }}>
                        <Segment 
                        vertical 
                        textAlign="center"
                        style={{
                            minHeight: "350px",
                            backgroundColor: "white",
                        }}>
                            <Icon
                            name="paper plane" 
                            size="massive"
                            style={{
                                paddingTop: "0.75em",
                                color: "rgb(195, 195, 195)",
                            }}/>
                            <Header 
                            content="Drag to upload (Holder)" 
                            style={{
                                paddingTop: "4em",
                                color: "rgb(195, 195, 195)",
                            }}/>
                        </Segment>
                    </Card>
                </Form.Field>
                <Form.Field required>
                    <label> Name </label>
                    <p
                    style={{
                        fontSize: '13px',
                        color: "rgb(95, 95, 95)",
                        fontWeight: "normal"
                    }}> Name for the campaign.</p>
                    <input type="text" placeholder="Name" />
                </Form.Field>
                <Form.Field required>
                    <label> Minimum Contribution </label>
                    <p
                    style={{
                        fontSize: '13px',
                        color: "rgb(95, 95, 95)",
                        fontWeight: "normal"
                    }}>Minimum contribution required for a new patron to enter. Any contribution with the amount below this number will be reverted. Any contribution with the amount above this number will be kept in the contract as an extra gratuity.</p>
                    <input type="number" placeholder="Minimum Contribution" />
                </Form.Field>
                <Form.Field>
                    <label> Email </label>
                    <p
                    style={{
                        fontSize: '13px',
                        color: "rgb(95, 95, 95)",
                        fontWeight: "normal"
                    }}> Only for the purpose of developer's personal study; your email will be kept confidential, and no commerical activities involved. (I might even not bother to collect them)</p>
                    <input type="email" placeholder="Email" />
                </Form.Field>
                <Form.Field required>
                    <label> Description </label>
                    <p
                    style={{
                        fontSize: '13px',
                        color: "rgb(95, 95, 95)",
                        fontWeight: "normal"
                    }}> 
                    Additional information to ensure the functionality fo the contract. <br /><br />
                    <em>Attention: Adding messages will cost gas since they will be written to the contract on chain; 
                    if no additional information needed, put "N/A" without the double quotation marks to remove ambiguity. </em>
                    </p>
                    <TextArea placeholder="Description" />
                </Form.Field>
                <Form.Field>
                    <Checkbox 
                    label="I agree to the Terms and Conditions"
                    style={{
                        fontSize: '15px',
                    }} />
                </Form.Field>
                <Button
                type="submit"
                style={{ 
                    fontFamily: "Poppins, sans-serif",
                    backgroundColor: "rgb(117, 117, 244)",
                    color: "white"
                }}>
                <Icon name="paper plane"/>
                Create
                </Button>
            </Form>
        );
    }
}

export default NewCampaignForm;