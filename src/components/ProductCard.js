import {  ShoppingCartOutlined, Star, StarHalf, StarOutline } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import styled from 'styled-components'


const Container = styled.div`
  margin: 6px;
  width: 350px;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 4px;
  position: relative;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  
  &:hover {
    transform: scale(1.025);
  }
  
`

const ImageContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  max-height: 85%;
  max-width: 100%;
  object-fit: cover;
`
const Info = styled.div`
  width: 90%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin: 10px 0;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  margin: 10px 0;
  color: #18181b;
`
const Price = styled.h2`
  font-size: 24px;
  color: #18181b;
  font-weight: 600;
`
const Icons = styled.div`
  display: flex;
  margin: 4px 0;
  color: #f59e0b;

`


const Button = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  background-color: #059669;
  color: #fff;
  border: none;
  margin: 18px 0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: #065f46;
  }
`

const StyledLink = styled(Link)`
  width: 100%;
  text-decoration: none;
`;


const ProductCard = ({ product }) => {
  return (
    <Container>
      <ImageContainer>
        <Image src={product.img}/>
      </ImageContainer>
      <Info>
        <Title>{product.title}</Title>
        <Price>₦{product.price}</Price>
        <Icons>
         <Star /> 
         <Star />
         <Star />
         <StarHalf />
         <StarOutline />
        </Icons>
        <StyledLink to={`/product/${product._id}`}>
          <Button ><ShoppingCartOutlined sx={{ fontSize: '22px', marginRight: "2.5px", color: "gold" }}  />ADD TO CART</Button>
        </StyledLink>  
      </Info>
    </Container>
  )
}

export default ProductCard;