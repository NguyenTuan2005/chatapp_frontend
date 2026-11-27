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
import { useAppDispatch } from "../store/Store.ts";

function Register() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (loading) return;

        setError(null);
        setLoading(true);
        const result = await dispatch(registerThunk({ user, pass }));
        setLoading(false);

        if (registerThunk.fulfilled.match(result)) {
            navigate("/login", { replace: true });
        } else {
            setError(typeof result.payload === "string" ? result.payload : "Register failed");
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
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <PersonFill />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="Điền tên người dùng"
                                            autoComplete="username"
                                            value={user}
                                            onChange={(e) => setUser(e.target.value)}
                                        />
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