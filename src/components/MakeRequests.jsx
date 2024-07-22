import { CardGroup } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

export const MakeRequests = ({signed, handleRequestNoAuth, handleRequestAuth}) => {
    return (
        <CardGroup style={{padding:'5px'}}>
            <Card
                bg={"light"}
                key={"light"}
                text={'dark'}
                border={'light'}
                className="mb-2"
            >
                <Card.Body>
                    <Card.Title>Not secure API</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Make requests to backend API endpoint</Card.Subtitle>
                    <Card.Text>
                        <code id={"noAuthResp"}>
                            Click the button below.
                        </code>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" onClick={handleRequestNoAuth}>Make request</Button>
                </Card.Footer>
            </Card>
            {signed && (
                <Card
                bg={"warning"}
                key={"warning"}
                text={'white'}
                border={'light'}
                style={{ width: '18rem' }}
                className="mb-2"
            >
                <Card.Body>
                    <Card.Title>Secure API</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Make requests to backend API endpoint</Card.Subtitle>
                    <Card.Text>
                        <code id={"authResp"}>
                            Click the button below.
                        </code>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" onClick={handleRequestAuth}>Make secure request</Button>
                </Card.Footer>
            </Card>
            )}
        </CardGroup>
    );
}