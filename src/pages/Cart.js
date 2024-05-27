import React, { useState } from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar'
import Annoucement from '../components/Annoucement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { Add, HighlightOff, Remove, ShoppingCart } from '@mui/icons-material';
import { MobileDevice } from '../reponsive';
import { useDispatch, useSelector } from 'react-redux';
import { useRemoveProductFromCart } from '../redux/apiCalls';
import { Alert, CircularProgress, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Container = styled.div``

const Wrapper = styled.div`
  padding: 20px;
  ${MobileDevice({ padding: "10px" })}
`
const Title = styled.h1`
  font-weight: 350;
  text-align: center;
`
// TOP SECTION --------------------------------------------------------------

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 4px;
  border: ${props => props.type === "filled" && "none"};
  background-color: ${props => props.type === "filled" ? "black" : "transparent"};
  color: ${props => props.type === "filled" && "white"};
`
const TopTexts = styled.div`
  ${MobileDevice({ display: "none" })}
`
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`

// BOTTOM SECTION --------------------------------------------------------------

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${MobileDevice({ flexDirection: "column" })}
`
const Info = styled.div`
  flex: 3;
`

const Product = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  border-radius: 6px;
  padding: 20px;
  margin: 12px 0;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  ${MobileDevice({ flexDirection: "column" })}
`

const DeleteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  svg {
    width: 32px;
    height: 32px;
  }
`
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`
const Image = styled.img`
  width: 200px;
`
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`
const ProductSize = styled.span``

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
`
const ProductAmount = styled.div`
  width: 20px;
  height: 25px;
  border-radius: 25%;
  border: 3px solid teal;
  display: flex;
  font-weight: 600;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  padding: 4px;
  ${MobileDevice({ margin: "5px 15px" })}
`
const ProductPrice = styled.div`
  font-size: 36px;
  font-weight: 600;
  ${MobileDevice({ marginBottom: "20px" })}
`

const Summary = styled.div`
  flex: 1;
  height: 50vh;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  margin-left: 5px;
`
const SummaryTitle = styled.h1`
  font-weight: 300;
`
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.type === "total" && "500"};
  font-size: ${props => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const CheckOutButton = styled.button`
  width: 100%;
  margin-top: 28px;
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
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

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  text-align: center;
`

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user.currentUser); 
  const { removeProductFromCart, error, success, isLoading } = useRemoveProductFromCart();
  const [open, setOpen] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState(null);

  const handleClickOpen = (product) => {
    setOpen(true);
    setSelectedCartItem(product);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (selectedCartItem) {
      await removeProductFromCart(selectedCartItem.uuid, dispatch);
      setOpen(false);
    }
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
        <DialogTitle>{"REMOVAL CONFIRMATION"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {selectedCartItem && `Are you sure you want to remove "${selectedCartItem.title}" from your cart?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button onClick={handleDelete}>REMOVE ITEM</Button>
        </DialogActions>
      </Dialog>
      {isLoading && (
        <IsLoadingContainer>
          <IsLoadingCircle>
            <CircularProgress />
          </IsLoadingCircle>
        </IsLoadingContainer>
      )}
      <Navbar />
      <Annoucement />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <TopButton type="">CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag ({cart.products.length})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {(!user || !cart.products.length) ? (
              <EmptyCartContainer>
                <ShoppingCart style={{ fontSize: 120, marginBottom: "10px", color: "#9ca3af" }} />
                <Typography variant="h6" color="#9ca3af">No cart item available</Typography>
              </EmptyCartContainer>
            ) : (
              cart.products.map(product => (
                <Product key={product._id}>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName><b>Product: </b>{product.title}</ProductName>
                      <ProductId><b>ID: </b>{product._id}</ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize><b>Size: </b>{product.size}</ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>₦{product.price * product.quantity}</ProductPrice>
                  </PriceDetail>
                  <DeleteIcon>
                    <HighlightOff onClick={() => handleClickOpen(product)} />
                  </DeleteIcon>
                </Product>
              ))
            )}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₦{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₦2,300</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₦300</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₦{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <CheckOutButton>CHECKOUT NOW</CheckOutButton>
          </Summary>
        </Bottom>
      </Wrapper>
      <Newsletter />
      <Footer />
      {success && (
        <Alert severity="success" sx={{ position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
          {error}
        </Alert>
      )}
    </Container>
  )
}

export default Cart;
