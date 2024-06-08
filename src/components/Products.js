import styled from 'styled-components';
import Product from './Product';
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


const Products = ({ cat, sort, filters }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      setError(null)

      try {
        const response = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
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
  }, [cat]);



  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);


  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);


  return (
    <Container>
      <Title>Popular Products</Title>
      <ProductContainer>
        {cat
          ? filteredProducts.map((item) => (
              <Product item={item} key={item._id} />
            ))
          : products
            .slice(0, 10)
            .map((item) => <Product item={item} key={item._id} />)
        }
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
  );
};

export default Products;
