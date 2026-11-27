import { useState, type FormEvent } from "react";
import { Alert, Button, Card, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import {
    ChatDotsFill,
    ExclamationCircleFill,
    EyeFill,
    EyeSlashFill,
    LockFill,
    PersonFill,
    PersonPlusFill,
} from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router";
import { registerThunk } from "../thunks/AuthThunk.ts";
import { useAppDispatch, useAppSelector } from "../store/Store.ts";

const USERNAME_PATTERN = /^\w+$/;

function Register() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { error, loading } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const userValid = USERNAME_PATTERN.test(user);
    const userInvalid = (submitted || user.length > 0) && !userValid;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        if (!userValid || loading) return;

        const result = await dispatch(registerThunk({ user, pass }));
        if (registerThunk.fulfilled.match(result)) {
            navigate("/login", { replace: true });
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
                                <p className="text-muted mb-0">Tạo tài khoản mới</p>
                            </div>

                            <Form onSubmit={handleSubmit} noValidate>
                                <Form.Group className="mb-3" controlId="registerUser">
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
                                            Chỉ được dùng chữ cái, số và dấu gạch dưới (_)
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="registerPass">
                                    <Form.Label>Mật khẩu</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <LockFill />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type={showPass ? "text" : "password"}
                                            placeholder="Điền mật khẩu"
                                            autoComplete="new-password"
                                            value={pass}
                                            onChange={(e) => setPass(e.target.value)}
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            type="button"
                                            onClick={() => setShowPass((show) => !show)}
                                        >
                                            {showPass ? <EyeSlashFill /> : <EyeFill />}
                                        </Button>
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
                                            Đang đăng ký...
                                        </>
                                    ) : (
                                        <>
                                            <PersonPlusFill className="me-2" />
                                            Đăng ký
                                        </>
                                    )}
                                </Button>
                            </Form>

                            <p className="text-center text-muted mt-4 mb-0">
                                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;