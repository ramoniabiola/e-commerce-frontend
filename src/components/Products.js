import styled from 'styled-components';
import Product from './Product';
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

const Products = ({ cat, sort, filters }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
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
    </Container>
  );
};

export default Products;
