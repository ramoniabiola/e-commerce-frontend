import { Facebook, Instagram, MailOutline, Phone, Room, YouTube } from '@mui/icons-material';
import XIcon from '@mui/icons-material/X';
import styled  from 'styled-components';
import { MobileDevice } from '../reponsive';
import { Link } from 'react-router-dom';



const Container = styled.div`
    display: flex;
    ${MobileDevice({ flexDirection: "column" })}
`

// LEFT ------------------------------------------------------------------
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styled(Link)`
    font-weight: 600;
    margin-left: 20px;
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
const Desc = styled.p`
    margin: 20px 0;
    font-size: 16px;
    line-height: 1.4;
`

const SocialContainer = styled.div`
    display: flex;
    margin-top: 16px;

`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: black;
    border: 2px solid;
    display: flex;
    align-items: center;
    justify-content: center;  
    cursor: pointer;
    margin-right: 20px;
`
// CENTER ----------------------------------------------------------------------

const Center = styled.div`
    flex: 1;  
    padding: 20px;
    ${MobileDevice({ display: "none" })}
    
`

const Title = styled.h3`
    margin-bottom: 30px;

`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;

`

// RIGHT -------------------------------------------------------------------------


const Right = styled.div`
    flex: 1;
    padding: 20px; 
    ${MobileDevice({ backgroundColor: "rgb(249 250 251)" })} 
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-item: center;

`

const Payment = styled.img`
    width: 50%
`


const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo to="/"> Luxel <LogoSpan>i</LogoSpan></Logo>
            <Desc>Empowering aquatic enthusiasts with trendy, sustainable fashion choices, 
                our fashion store offers a curated selection of apparel and accessories inspired by 
                the beauty of marine life and eco-friendly practices.
            </Desc>
            <SocialContainer>
                <SocialIcon>
                    <Facebook /> 
                </SocialIcon  >
                <SocialIcon>
                    <XIcon /> 
                </SocialIcon>
                <SocialIcon>
                    <Instagram /> 
                </SocialIcon>
                <SocialIcon>
                    <YouTube /> 
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Men Fashion</ListItem>
                <ListItem>Women Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>WishList</ListItem>
                <ListItem>Payment Info.</ListItem>
                <ListItem>Terms and Conditions.</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem><Room style={{marginRight: "10px"}}/>  30, New RailWay Road Obada Abeokuta, Ogun State.  </ContactItem>
            <ContactItem><Phone style={{marginRight: "10px"}}/> +234 708 4767 396 </ContactItem>
            <ContactItem><MailOutline style={{marginRight: "10px"}}/> ramoniabiola61@gmail.com </ContactItem> 
            <Payment src="https://paddleinmastery.com/wp-content/uploads/elementor/thumbs/Payment-Method-logos-p3sjdy67e0tvrapzvo4v20g49x3h6ho46o4ecsisxw.png"  />     
        </Right> 
    </Container>
  )
}

export default Footer;