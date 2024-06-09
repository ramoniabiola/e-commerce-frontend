import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Annoucement from '../components/Annoucement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { Add, Remove, PostAdd } from '@mui/icons-material';
import { MobileDevice } from '../reponsive';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { publicRequest } from '../requestMethod'
import { useSelector, useDispatch } from "react-redux";
import { useAddProductToCart } from '../redux/apiCalls';
import { Alert, CircularProgress, Dialog, DialogActions, DialogContent, 
  DialogContentText, Slide, DialogTitle, Button as MuiButton, Typography 
} from '@mui/material';






const Container = styled.div`

`

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${({ $isProgressing, $isError }) =>
    ($isProgressing  || $isError) 
    ? 
      `
        justify-content: center;
        align-items: center;
      `
    : `
        justify-content: none;
        align-items: none;  
      `
  }
  ${MobileDevice({ flexDirection: "column", padding: "10px" })}
`
const ImageContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 90vh;
  border-radaius: 4px;
  
`
const Image = styled.img`
  width: 85%;
  height: 90%;
  object-fit: cover;
  ${MobileDevice({ width: "100%", height: "50vh" })}


`
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  margin-top: 24px;
  ${MobileDevice({ padding: "10px" })}
`
const Title = styled.h1`
  font-weight: 450;
  font-size: 45px;

`
const Desc = styled.p`
  margin: 20px 0;
  font-size: 20px;

`
const Price = styled.span`
  font-weight: 400;
  font-size: 40px;
`
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  ${MobileDevice({ width: "100%" })}


  `
const Filter = styled.div`
  display: flex;
  align-items: center;

`
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;  
`
const FilterColor = styled.div`
  width:20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};  
  margin: 0 5px;
  cursor: pointer;
 
`
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
  border-radius: 4px; 
`
const FilterSizeOption = styled.option`

`
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;  
  cursor: pointer;
  justify-content: space-between;
  ${MobileDevice({ width: "100%" })}
`
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;  
`
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 3px solid teal; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  padding: 5px;

`
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;  
  background-color: white;
  border-radius: 4px;

  cursor: pointer;
  font-weight: 500;


  &:hover{
    background-color:#f8f8f8; 
  }

`
const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  text-align: center;
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  text-align: center;
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});



const Product = () => {
  const location =  useLocation();
  const id = location.pathname.split("/")[2]
  const [product, setProduct]  = useState({}) 
  const [quantity, setQuantity]  = useState(1)
  const [color, setColor]  = useState([]) 
  const [size, setSize]  = useState("")
  const dispatch = useDispatch();
  const { productToCart, error, success, isLoading } = useAddProductToCart();
  const userId = useSelector((state) => state.user.currentUser?._id);
  const [open, setOpen] = useState(false);
  const [findError, setFindError] = useState(null);
  const [findIsLoading, setFindIsLoading] = useState(false);



      
  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    const getProduct = async() => {
      setFindIsLoading(true);
      setFindError(null)


      try{
        const response = await publicRequest.get("/products/find/"+id);
        if(response.status >= 200 && response.status < 300) {
          setProduct(response.data);
          setFindError(null);
          setFindIsLoading(false);
        } else {
          // If the response status is not in the success range, handle the error
          throw new Error(response.data.error);
        }
      }catch(error){
        setFindIsLoading(false)
        setFindError("Product not found...")
      }
    }

    getProduct();
  }, [id]);



  // QUANTITY CHANGE BUTTON -----------------------
  const handleQuantity = (type) => {
    if (type === "add") {
       setQuantity(quantity + 1)
    } else {
      quantity > 1 && setQuantity(quantity - 1)
    }
  }

  // HANDLE PRODUCT TO CART ACTION 
  const handleClick = async () => {
    if (!userId) {
      handleDialogOpen();
      return;
    }

    // Preparing data to be sent to the backend
    const cartProduct = {  
      userId: userId, 
      products: [
        {
          productId: product._id,
          quantity: quantity,
          color: color,
          price: product.price,
          size: size,
          title: product.title,
          img: product.img, 
        }
      ]
    };
    
    // Call Redux action to add the product to the cart
    await productToCart(cartProduct, dispatch);
  };




  return (
    <Container>
      {isLoading && (
        <IsLoadingContainer>
          <IsLoadingCircle>
            <CircularProgress />
          </IsLoadingCircle>
        </IsLoadingContainer>
      )}
      <Navbar />
      <Annoucement />
      <Wrapper $isProgressing={findIsLoading ? "true" : undefined} $isError={findError ? "true" : undefined}>
        {findIsLoading ? (
          <LoadingContainer>
            <CircularProgress  style={{ color: '#6b7280', marginBottom: "14px" }} size={40}  />
            <Typography variant="h6" color="#9ca3af" style={{  marginLeft: "8px" }} >Loading...</Typography>
          </LoadingContainer>
          ) : findError ? (
            <NoDataContainer>
              <PostAdd style={{ fontSize: 100, marginBottom: "10px", color: "#9ca3af" }} />
              <Typography variant="h5" color="#9ca3af">{findError}</Typography>
            </NoDataContainer>
          ) : (
          <>
            <ImageContainer>
              <Image src={product.img} />
            </ImageContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Price>₦{product.price}</Price>
              <FilterContainer>
                <Filter>
                  <FilterTitle>Color </FilterTitle>
                  {product.color?.map((c) =>
                    <FilterColor color={c} key={c} value={c} onClick={() => setColor(c)}/>
                  )}         
                </Filter>
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                    <FilterSize  value={size} onChange={(e) => setSize(e.target.value)}>
                      {product.size?.map((s) =>
                        <FilterSizeOption key={s}>{s}</FilterSizeOption>
                      )}
                    </FilterSize>
                </Filter>
              </FilterContainer>
              <AddContainer>
                <AmountContainer>
                  <Add onClick={() => handleQuantity("add")} />
                  <Amount>{quantity}</Amount>
                  <Remove onClick={() => handleQuantity("sub")} />
                </AmountContainer>
                <Button onClick={handleClick}>ADD TO CART</Button>
              </AddContainer>
            </InfoContainer>
          </> 
        )}
      </Wrapper>
      <Newsletter />
      <Footer />
      {success && (
        <Alert severity="success" sx={{ position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
          Add to cart succesfully...
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
          {error}
        </Alert>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        sx={{
          '& .MuiDialog-paper': {
            width: '500px', 
            maxWidth: 'none',
            borderRadius: "4px",
          },
        }}
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle  style={{color: "#64748b", fontSize: "18px"}}>{"Not Logged In?"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description" style={{color: "#1e293b"}}>
                {" You need to be logged in to add products to the cart. Please log in if you already have an account or register if you don't have one."}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={() => setOpen(false)} color="secondary">
            CANCEL
          </MuiButton>
          <MuiButton href="/login" color="primary">
            LOGIN
          </MuiButton>
          <MuiButton href="/register"color="primary" autoFocus>
            REGISTER
          </MuiButton>
        </DialogActions>
      </Dialog>     
    </Container>
  )
}

export default Product;