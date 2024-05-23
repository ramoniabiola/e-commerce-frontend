import { FavoriteBorderOutlined, Search, ShoppingCartOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: rgba(0,0,0,0.2);
  border-radius: 4px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
`

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(250 250 249);
  border-radius: 4px;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`
const Image = styled.img`
  height: 60%;
`

const Icon = styled(Link)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover{
    background-color: #e9f5f5;
    transform: scale(1.08);
  }

`

const Product = ({ item }) => { 
  
  
  
  return (
   <Container>
      <Image src={item.img}/>
      <Info >
        <Icon>
          <ShoppingCartOutlined /> 
        </Icon>
          <Icon to={`/product/${item._id}`}> 
            <Search  /> 
          </Icon>
        <Icon>
         <FavoriteBorderOutlined /> 
        </Icon>
      </Info>
    </Container>
  )
}

export default Product;