import styled from 'styled-components';
import TopSelling from './TopSelling';
import { useState, useEffect } from 'react';
import axios from "axios";
import { PostAdd } from '@mui/icons-material';
import { CircularProgress, Typography } from '@mui/material';


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin-top: 8px;
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
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 2px 0;
`;

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


const TopSellingList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      setError(null)

      try {
        const response = await axios.get("http://localhost:5000/api/products");
        if(response.status >= 200 && response.status < 300) {
          setProducts(response.data);
          setError(null);
          setIsLoading(false);
        } else {
          // If the response status is not in the success range, handle the error
          throw new Error(response.data.error);
        }
      } catch (error) {
        setIsLoading(false)
        setError("No data...")
    
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
      {error && (
        <NoDataContainer>
          <PostAdd style={{ fontSize: 100, marginBottom: "10px", color: "#9ca3af" }} />
          <Typography variant="h5" color="#9ca3af">{error}</Typography>
        </NoDataContainer>
      )}
      {isLoading && (
        <LoadingContainer>
          <CircularProgress  style={{ color: '#6b7280', marginBottom: "14px" }} size={40}  />
          <Typography variant="h6" color="#9ca3af">Loading...</Typography>
        </LoadingContainer>
      )}
    </Container>
  )
}

export default TopSellingList;