import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { PostAdd } from '@mui/icons-material';
import { CircularProgress, Typography } from '@mui/material';

import ProductCard from '../components/ProductCard'; 
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Annoucement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';



const Container = styled.div`
    
`
const Title = styled.h1`
    padding: 20px;
    text-align: center;
    margin: 10px 0;
    font-weight: 500;
`
const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 18px;
    margin-bottom: 10px;
    
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

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};


const SearchResults = () => {
    const query = useQuery().get('query');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null)

            try {
                const response = await axios.get(`http://localhost:5000/api/products/search?query=${query}`);
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
                setError( `Product "${query}" not found...`)
            }
        };

        if (query) {
            fetchProducts();
        }
    }, [query]);

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>Search Results for <b>"{query}"</b></Title>
            <Wrapper>
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
                {error && (
                    <NoDataContainer>
                      <PostAdd style={{ fontSize: 100, marginBottom: "10px", color: "#9ca3af" }} />
                      <Typography variant="h5" color="#9ca3af">{error}</Typography>
                    </NoDataContainer>
                )}
                {isLoading && (
                    <LoadingContainer>
                        <CircularProgress  style={{ color: '#6b7280', marginBottom: "14px" }} size={40}  />
                        <Typography variant="h6" color="#9ca3af">Searching...</Typography>
                    </LoadingContainer>
                )}
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default SearchResults;
