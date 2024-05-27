import React, { useState } from 'react'
import styled from 'styled-components'
import { Badge } from '@mui/material';
import { Search, ShoppingCartOutlined } from '@mui/icons-material'
import { MobileDevice } from '../reponsive';
import { Link } from 'react-router-dom';
import { useSelector} from "react-redux"
import { useLogout } from '../redux/apiCalls';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';



const Container = styled.div`
    height: 60px;
    ${MobileDevice({ height: "50px" })}
`;

const Wrapper = styled.div`
    padding: 5px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    ${MobileDevice({ justifyContent: "space-between", padding: "5px 2px"})}
    
`
// Left --------------------------------------------

const Left = styled.div`
    flex: 1;
    ${MobileDevice({  marginRight: "15px" })}
`
const Logo = styled(Link)`
    font-weight: 600;
    margin-left: 50px;
    display: flex;
    font-size: 35px;
    cursor: pointer;
    font-family: "poppins";
    text-decoration: none;
    color: inherit;
    ${MobileDevice({ fontSize: "25px", marginLeft: "15px" })}   
`

const LogoSpan = styled.div`
    color: rgb(138, 22, 22);
    font-weight: 600;;
    font-size: 35px;
    cursor: pointer;
    font-family: "poppins";
    text-decoration: none;
    ${MobileDevice({ fontSize: "25px", marginLeft: "15px" })}   
    
    
`



//  Center --------------------------------------------


const Center = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    ${MobileDevice({ width: "70px", marginRight: "-15px"})}
   

`

const SearchContainer = styled.div`
    width: 100%; 
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid lightgray;
    border-radius: 5px;
    padding: 6px;

    ${MobileDevice({ width: "100%", padding: "3px" })}

`
const Input = styled.input`
    width: 100%;
    padding: 4px;
    border-radius: 5px;
    font-size: 16px;
    border: none;
    outline: none;
    ${MobileDevice({ fontSize: "12px"})}  
`


//  Right --------------------------------------------
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${MobileDevice({ flex: 1, margin: " 0px 12px", justifyContent: 'center', alignItems: 'center' })}
`

const MenuItem = styled(Link)`
    font-size: 16px;
    cursor: pointer;
    margin-left: 25px;
    text-decoration: none;
    font-weight: 400;
    color: inherit;
    ${MobileDevice({ fontSize: "12px", marginLeft: "15px" })}
    
`

const MenuItemUser = styled.div`
    letter-spacing: 1px;
    font-size: 20px;
    font-weight: 500;
    padding: 5px 10px;
    color: transparent;
    background:  linear-gradient(to right,rgb(7 89 133), rgb(6 95 70), rgb(190 24 93));
    background-clip: text;
    border: 2px dashed gray;
    border-radius: 8px;
`



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
  



const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)
    const isLoggedIn = useSelector((state) => state.user.currentUser)
    const { handleLogout } = useLogout();
    const [open, setOpen] = useState(false);


      
    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
      setOpen(false);
    };



    const handleClick = async () => {
        // invoke log-out action
        await handleLogout();
        setOpen(false);
    };
    



  return (
    <Container>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            sx={{
                '& .MuiDialog-paper': {
                    width: '450px', 
                    maxWidth: 'none',
                },
            }}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle style={{color: "#64748b", fontSize: "18px"}}>{"EXIT CONFIRMATION"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description"  style={{color: "#1e293b"}}>
                    {"Are you sure you want to Log out?"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>CANCEL</Button>
              <Button  onClick={handleClick}>LOG OUT</Button>
            </DialogActions>
        </Dialog>
        <Wrapper>
            <Left>
                <Logo to="/"> Luxel <LogoSpan>i</LogoSpan></Logo>
            </Left>
            <Center>
                <SearchContainer>
                    <Input placeholder='Search products, brands'/>
                    <Search style={{color: "gray", fontSize: 25, cursor: "pointer" }}/>
                </SearchContainer>
            </Center>
            <Right>
                {isLoggedIn ? (
                    <>
                        <MenuItem>
                            <MenuItemUser>
                                {isLoggedIn.username}
                            </MenuItemUser>
                        </MenuItem>
                        <MenuItem onClick={handleClickOpen}>LOG OUT</MenuItem>
                        <MenuItem to="/cart">
                            <Badge badgeContent={quantity} color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem to="/register">REGISTER</MenuItem>
                        <MenuItem to="/login">SIGN IN</MenuItem>
                        <MenuItem to="/cart">
                            <Badge badgeContent={quantity} color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>
                    </>
                )}
            </Right>
        </Wrapper>
    </Container>
)}

export default Navbar;