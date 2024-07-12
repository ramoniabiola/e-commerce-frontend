import styled from 'styled-components';
import { MobileDevice } from '../reponsive';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { CircularProgress } from '@mui/material';
import { useLogin } from '../redux/apiCalls';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 38%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    ${MobileDevice({ width: "75%" })}
`;

const Title = styled.h1`
    font-size: 34px;
    font-weight: 800;
    margin-bottom: 12px;
    text-align: center;
    color: #0c0a09;
`;

const Desc = styled.div`
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 12px;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    width: 100%;
`;

const InputContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    width: 90%;
    margin: 14px 0;
    padding: 18px;
    font-size: 24px;
    font-weight: 600;
    color: #09090b;
    border: 2px solid gray;
    outline: none;
    border-radius: 6px;

    &:hover {
        border: 2px solid black;
    }

    &:focus {
        border: 2px solid #10b981;
    }
`;

const Button = styled.button`
    width: 98%;
    border: none;
    padding: 20px;
    background: linear-gradient(to right, #10b981, #047857);
    color: white;
    cursor: pointer;
    margin: 15px 0;
    border-radius: 4px;
    font-size: 20px;
    font-weight: 700;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    &:hover {
        background: linear-gradient(to right, #059669, #065f46);
    }
`;

const NavContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 14px;
`;

const RegLink = styled(Link)`
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    color: #4b5563;
    margin: 0 16px;

    &:hover {
        color: #047857;
        text-decoration: underline;
    }
`;

const StyledHr = styled.hr`
    border: none;
    height: 24px;
    background-color: #4b5563;
    width: 3px;
`;

const Error = styled.h2`
    width: 100%;
    font-weight: 600;
    font-size: 20px;
    margin: 10px 0;
    color: red;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { login, error, isLoading } = useLogin();

    const handleClick = async (e) => {
        e.preventDefault();
        await login(dispatch, { username, password });
    };

    return (
        <Container>
            <Wrapper>
                <Title>Welcome!</Title>
                <Desc>Type your username and password to log in to your <b>luxeli</b> account.</Desc>
                <Form>
                    <InputContainer>
                        <Input
                            placeholder="username" 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input 
                            type="password"
                            placeholder="password" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button onClick={handleClick} disabled={isLoading}>
                            {isLoading ? <CircularProgress size={24} style={{ color: 'white' }} /> : "LOGIN"}
                        </Button>
                        {error && <Error>{error}</Error>}
                    </InputContainer>
                    <NavContainer>
                        <RegLink>Forgot password</RegLink>
                        <StyledHr />
                        <RegLink to="/register">CREATE A NEW ACCOUNT</RegLink>
                    </NavContainer>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;
