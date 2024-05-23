import styled from 'styled-components';
import { MobileDevice } from '../reponsive';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAddUser } from '../redux/apiCalls';
import { Alert, CircularProgress } from '@mui/material';


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://i.pinimg.com/originals/64/2e/4c/642e4ca2d13ac7081fa1ad81093c4e11.jpg");
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: transparent;
    ${MobileDevice({ width: "75%" })}
`
const Title = styled.h1`
    font-size: 32px;
    font-weight: 500;
    color: white;


`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;

`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0 0;
    padding: 16px;
    padding: 18px;
    font-size: 20px;
    outline: none;
    border-radius: 4px;

    ::placeholder {
        color: red;
    }   
`
const Agreement = styled.span`
    font-size: 16px;
    margin: 20px 0;
    color: white;

`
const Button = styled.button`   
    width: 100%;
    border: none;
    padding: 16px 20px;
    background-color: rgb(220 38 38);
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    font-weight: 600;

    &:hover{
        background-color: rgb(185 28 28);
    }
`;


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

const Register = () => {
    const [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        job: ""
    }); 
    const { addUser, error, success, isLoading } = useAddUser();
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    


    const handleClick = async (e) => {
        e.preventDefault();

        // Check if any required fields are empty
        const requiredFields = ["firstname", "lastname", "job", "email", "password"];
        const emptyFields = requiredFields.filter(field => !inputs[field]);
        if (emptyFields.length > 0) {
         setErrorMessage("Fill all fields");
          return;
        }
        setErrorMessage(null)

        const user = inputs;
        await addUser(user, dispatch);       
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
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
                <Input name="firstname" placeholder="firstname" onChange={handleChange} />
                <Input name="lastname" placeholder="lastname" onChange={handleChange} />
                <Input name="username" placeholder="username"  onChange={handleChange}/>
                <Input name="email" type="email" placeholder="email" onChange={handleChange}/>
                <Input name="password" type="password" placeholder="password" onChange={handleChange}/>
                <Input name="job"  placeholder="job description" onChange={handleChange}/>
                <Agreement>
                    By creating an account, I consent to the processing of my personal data
                    in accordance with the <b>PRIVACY POLICY.</b>
                </Agreement>
                <Button onClick={handleClick}>CREATE</Button>
            </Form>
        </Wrapper>
        {success && (
            <Alert severity="success" sx={{ position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
                Registeration process succesfull...
            </Alert>
        )}
        {error && (
            <Alert severity="error" sx={{ position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
                {error}
            </Alert>
        )}
        {errorMessage && (
            <Alert severity="error" sx={{ position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
                {errorMessage}
            </Alert>
        )}
    </Container>
  )
}

export default Register;