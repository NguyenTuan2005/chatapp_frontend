import {Card, Col, Container, InputGroup, Row, Form, Button, Alert} from "react-bootstrap";
import {
    BoxArrowInRight,
    ChatDotsFill,
    ExclamationCircleFill,
    EyeFill, EyeSlashFill,
    LockFill,
    PersonFill
} from "react-bootstrap-icons";
import {loginThunk} from "../thunks/AuthThunk.ts";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/Store.ts";
import {useNavigate} from "react-router";

function Login() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);
    const error = useAppSelector(state => state.auth.error);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(loginThunk({ user, pass }));
        if (loginThunk.fulfilled.match(result)) {
            navigate("/hehe");
        }
    };

    return (
        <Container
            fluid
            className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
        >
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={10} md={7} lg={5} xl={4}>
                    <Card className="shadow border-0">
                        <Card.Body className="p-4 p-md-5">
                            <div className="text-center mb-4">
                                <ChatDotsFill size={48} className="text-primary mb-2" />
                                <h3 className="fw-bold mb-1">HTJ App Chat</h3>
                                <p className="text-muted mb-0">Sign in to continue</p>
                            </div>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="loginUser">
                                    <Form.Label>Username</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <PersonFill />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter username"
                                            autoComplete="username"
                                            value={user}
                                            onChange={(e) => setUser(e.target.value)}
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="loginPass">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <LockFill />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type={showPass ? "text" : "password"}
                                            placeholder="Enter password"
                                            autoComplete="current-password"
                                            value={pass}
                                            onChange={(e) => setPass(e.target.value)}
                                        />
                                        <Button variant="outline-secondary" type="button" onClick={() => setShowPass(show => !show)}>
                                            {showPass ? <EyeSlashFill/>: <EyeFill /> }
                                        </Button>
                                    </InputGroup>
                                </Form.Group>

                                {error &&
                                    <Alert variant="danger" className="py-2 d-flex align-items-center">
                                        <ExclamationCircleFill className="me-2" />
                                        {error}
                                    </Alert>
                                }

                                <Button variant="primary" type="submit" className="w-100 py-2">
                                    <BoxArrowInRight className="me-2" />
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
