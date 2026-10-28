import {Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {load} from "../store/slice/TempSlice.ts";

function Login() {
    const temp = useSelector((state: any) => state.products)
    const dispatch = useDispatch();
    useEffect(() => {
        const data: any[] = [];
        dispatch(load(data))
    }, [dispatch]);

    return (
      <Container>
          {temp}
          login
      </Container>
    );
}

export default Login;