import { useState, type FormEvent } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useAppSelector } from "../../store/Store.ts";

interface SearchUserProps {
    onSearch: (username: string) => Promise<boolean>;
}

function SearchUser({ onSearch }: SearchUserProps) {
    const [username, setUsername] = useState("");
    const [notFound, setNotFound] = useState(false);
    const loading = useAppSelector((state) => state.auth.loading);

    const trimmed = username.trim();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!trimmed || loading) return;

        const found = await onSearch(trimmed);
        if (found) {
            setUsername("");
        }
        setNotFound(!found);
    };

    const handleChange = (value: string) => {
        setUsername(value);
        setNotFound(false);
    };

    return (
        <Form onSubmit={handleSubmit} className="px-3 py-2 border-bottom">
            <InputGroup size="sm">
                <Form.Control
                    type="text"
                    placeholder="Tìm người dùng..."
                    value={username}
                    onChange={(e) => handleChange(e.target.value)}
                    disabled={loading}
                    aria-label="Tìm người dùng"
                />
                <Button type="submit" disabled={loading || !trimmed}>
                    {loading ? <Spinner animation="border" size="sm" /> : <Search />}
                </Button>
            </InputGroup>

            {notFound && (
                <Form.Text className="text-danger">Không tìm thấy người dùng</Form.Text>
            )}
        </Form>
    );
}

export default SearchUser;