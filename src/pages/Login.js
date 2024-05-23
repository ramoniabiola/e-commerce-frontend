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
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://media.timeout.com/images/105542512/image.jpg");
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 30%;
    padding: 20px;
    background-color: transparent;
    ${MobileDevice({ width: "75%" })}

`
const Title = styled.h1`
    font-size: 32px;
    font-weight: 500;
    color: white;
    margin-bottom: 5px;


`
const Form = styled.form`
    display: flex;
    flex-direction: column;

`

const Input = styled.input`
    flex: 1;
    min-width: 35%;
    margin:  14px 0;
    padding: 18px;
    font-size: 20px;
    outline: none;
    border-radius: 4px;
`
const Button = styled.button`   
    width: 100%;
    border: none;
    padding: 20px 20px;
    background-color:  rgb(220 38 38);
    color: white;
    cursor: pointer;
    margin: 15px 0;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;

    &:hover{
        background-color: rgb(185 28 28);
    }

    &:disabled{
        color: red;
        cursor: not-allowed;
    }
`
const RegLink = styled(Link)`
    margin: 10px 0;
    font-size: 12px;
    text-decoration: underline; 
    cursor: pointer;
    color: white;
   
    
    &:hover{
        color: rgb(185 28 28);
    }
`;

const Error = styled.p`
    margin-top: 5px;
    padding: 10px;
    background: #ffefef;
    border: 1px solid red;
    border-radius: 4px;
    margin: 20px 0;
    color: red; 
`
const IsLoadingContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(13, 13, 13, 0.5); 
    display: flex;
    justify-content: center;
    align-items: center;
`

const IsLoadingCircle = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

     
 svg {
    width: 35px; 
    height: 35px;
    color: #f0f3f7; 
 }
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
        {isLoading && (
            <IsLoadingContainer>
                <IsLoadingCircle>
                    <CircularProgress />
                </IsLoadingCircle>
            </IsLoadingContainer>
        )}
        <Wrapper>
            <Title>LOG IN TO YOUR ACCOUNT</Title>
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
                <Button onClick={handleClick}>LOGIN</Button>
                {error && <Error>{error}</Error>} {/* Display the error if it exists */}
                <RegLink>Forgot password ?</RegLink>
                <RegLink to="/register">CREATE A NEW ACCOUNT</RegLink>
            </Form>
        </Wrapper>
    </Container>

  )
}

export default Login;