import { useState, type FormEvent } from "react";
import { Alert, Button, Card, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import {
    BoxArrowInRight,
    ChatDotsFill,
    ExclamationCircleFill,
    EyeFill,
    EyeSlashFill,
    LockFill,
    PersonFill,
} from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router";
import { loginThunk } from "../thunks/AuthThunk.ts";
import { useAppDispatch, useAppSelector } from "../store/Store.ts";

function Login() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { error, loading } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const userInvalid = submitted && !user.trim();
    const passInvalid = submitted && !pass;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        if (!user.trim() || !pass || loading) return;

        const result = await dispatch(loginThunk({ user: user.trim(), pass }));
        if (loginThunk.fulfilled.match(result)) {
            navigate("/");
        }
    };

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={10} md={7} lg={5} xl={4}>
                    <Card className="shadow border-0">
                        <Card.Body className="p-4 p-md-5">
                            <div className="text-center mb-4">
                                <ChatDotsFill size={48} className="text-primary mb-2" />
                                <h3 className="fw-bold mb-1">Nalo PC</h3>
                                <p className="text-muted mb-0">Đăng nhập để tiếp tục</p>
                            </div>

                            <Form onSubmit={handleSubmit} noValidate>
                                <Form.Group className="mb-3" controlId="loginUser">
                                    <Form.Label>Tên người dùng</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text>
                                            <PersonFill />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="Điền tên người dùng"
                                            autoComplete="username"
                                            value={user}
                                            isInvalid={userInvalid}
                                            onChange={(e) => setUser(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Vui lòng nhập tên người dùng
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="loginPass">
                                    <Form.Label>Mật khẩu</Form.Label>
                                    <InputGroup hasValidation>
                                        <InputGroup.Text>
                                            <LockFill />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type={showPass ? "text" : "password"}
                                            placeholder="Điền mật khẩu"
                                            autoComplete="current-password"
                                            value={pass}
                                            isInvalid={passInvalid}
                                            onChange={(e) => setPass(e.target.value)}
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            type="button"
                                            onClick={() => setShowPass((show) => !show)}
                                        >
                                            {showPass ? <EyeSlashFill /> : <EyeFill />}
                                        </Button>
                                        <Form.Control.Feedback type="invalid">
                                            Vui lòng nhập mật khẩu
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                                {error && (
                                    <Alert variant="danger" className="py-2 d-flex align-items-center">
                                        <ExclamationCircleFill className="me-2" />
                                        {error}
                                    </Alert>
                                )}

                                <Button type="submit" className="w-100 py-2" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Spinner animation="border" size="sm" className="me-2" />
                                            Đang đăng nhập...
                                        </>
                                    ) : (
                                        <>
                                            <BoxArrowInRight className="me-2" />
                                            Đăng nhập
                                        </>
                                    )}
                                </Button>
                            </Form>

                            <p className="text-center text-muted mt-4 mb-0">
                                Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;