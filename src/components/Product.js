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
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: rgb(250, 250, 249);
  border-radius: 4px;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  height: 60%;
  object-fit: cover;
  margin-top: 24px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin: 14px 15px 5px;
`;

const Price = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: gray;
  margin: 8px 15px 5px;
`;

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

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.08);
  }
`;

const Product = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} alt={item.title} />
      <Wrapper>
        <Title>{item.title}</Title>
        <Price>₦{item.price}</Price>
      </Wrapper>
      <Info>
        <Icon to="#">
          <ShoppingCartOutlined />
        </Icon>
        <Icon to={`/product/${item._id}`}>
          <Search />
        </Icon>
        <Icon to="#">
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
