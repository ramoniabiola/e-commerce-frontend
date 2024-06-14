import styled from 'styled-components';
import { MobileDevice } from '../reponsive';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAddUser } from '../redux/apiCalls';
import { Alert, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';


const Container = styled.div`
    width: 100vw;
    height: 100vh; 
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    ${MobileDevice({ width: "75%" })}
`
const Title = styled.h1`
    font-size: 34px;
    font-weight: 800;
    margin-bottom: 8px;
    text-align: center;
    color: #0c0a09;


`

const Desc = styled.div`
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 16px;
    text-align: center;
    
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
    font-weight: 600;
    outline: none;
    border-radius: 6px;
    border: 3px solid #d1d5db;

    &:hover {
      border: 3px solid gray;
    }

    &:focus {
      border: 3px solid #10b981;
    }
`
const Agreement = styled.span`
    font-size: 18px;
    margin: 20px 0;
    color: #4b5563;

`
const Button = styled.button`   
    width: 100%;
    border: none;
    padding: 16px 20px;
    background: linear-gradient(to right, #10b981, #047857);
    color: white;
    font-size: 18px;
    cursor: pointer;
    border-radius: 4px;
    font-weight: 700;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    &:hover{
        background: linear-gradient(to right, #059669, #065f46);
    }
`;

const LoginContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 18px 0;
`;

const LoginTitle = styled.h2`
    font-size: 24px;
    font-weight: 500;
    color: #1f2937;
`
const LogLink = styled(Link)`
    margin-left: 6px;
    font-size: 20px;
    font-weight: 900;
    text-decoration: none; 
    cursor: pointer;
    color: #111827;

    &:hover {
        text-decoration: underline;
        color: #065f46; 
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
        <Wrapper>
            <Title>Welcome!</Title>
            <Desc>Dont't have a luxeli Account? kindly create one below</Desc>
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
                <Button onClick={handleClick}>
                    {isLoading ? <CircularProgress size={24} style={{ color: 'white'}} /> : "CREATE"}    
                </Button>
                <LoginContainer>
                    <LoginTitle>Already have an account?</LoginTitle>
                    <LogLink to="/login">LOGIN HERE</LogLink>
                </LoginContainer>
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