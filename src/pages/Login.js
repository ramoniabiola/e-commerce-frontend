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
`
const Wrapper = styled.div`
    width: 38%;
    padding: 20px;
     position: relative;
    ${MobileDevice({ width: "75%" })}

`
const Title = styled.h1`
    font-size: 34px;
    font-weight: 800;
    margin-bottom: 12px;
    text-align: center;
    color: #0c0a09;


`

const Desc = styled.div`
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 12px;
    text-align: center;
    
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-left: 68px;
    width: 80%;

`

const Input = styled.input`
    flex: 1;
    width: 90%;
    margin:  14px 0;
    padding: 18px;
    font-size: 24px;
    font-weight: 600;
    border: 2px solid gray;
    outline: none;
    border-radius: 6px;

    &:hover {
        border: 2px solid black;
    }

    &:focus {
        border: 3px solid #10b981;

    }
`
const Button = styled.button`   
    width: 97%;
    border: none;
    padding: 20px 20px;
    background-color: #047857;
    color: white;
    cursor: pointer;
    margin: 15px 0;
    border-radius: 6px;
    font-size: 20px;
    font-weight: 700;

    &:hover{
        background-color: #065f46;
    }

`
const RegLink = styled(Link)`
    margin: 10px 0;
    font-size: 16px;
    font-weight: 500;
    text-decoration: underline; 
    cursor: pointer;
    color: black;
   
    
    &:hover{
        color: #047857;
        text-decoration: underline;
    }
`;

const Error = styled.h2`
    margin-top: 2px;
    width: 80%;
    padding: 14px 24px;
    background-color: #fecaca;
    border: 3px solid #991b1b;
    font-weight: 600;
    font-size: 20px;
    border-radius: 4px;
    margin: 20px 0;
    color: #991b1b; 
`



const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { login, error, isLoading } = useLogin();



    const handleClick = async (e) => {
        e.preventDefault();
        await login(dispatch, { username, password }) // Perform login action

    }

    return (
        <Container>
            <Wrapper>
                <Title>Welcome!</Title>
                <Desc>Type your username and  password to log in to your <b>Luxeli</b> account.</Desc>
                <Form>
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
                        {isLoading ? <CircularProgress size={24} style={{ color: 'white'}} /> : "LOGIN"}
                    </Button>
                    {error && <Error>{error}</Error>} {/* Display the error if it exists */}
                    <RegLink>Forgot password ?</RegLink>
                    <RegLink to="/register">CREATE A NEW ACCOUNT</RegLink>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login;