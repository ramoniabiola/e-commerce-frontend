import styled from 'styled-components';
import TopSelling from './TopSelling';
import { useState, useEffect } from 'react';
import axios from "axios";


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
   margin-top: 28px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: black;
  margin-top: 8px;
  margin-bottom: 16px;
  padding: 16px;
  text-align: center;
  width: 100%;
`;


const ProductContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const TopSellingList = () => {
    const [products, setProducts] = useState([]);

    
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  return (
    <Container>
        <Title>Top Selling Brands</Title>
        <ProductContainer>
            {products.slice(0, 10).map((product) => (
              <TopSelling product={product} key={product._id} />
            ))}             
        </ProductContainer>
    </Container>
  )
}

export default TopSellingList;