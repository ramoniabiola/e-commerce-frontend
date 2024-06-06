import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
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

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
    const query = useQuery().get('query');
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/search?query=${query}`);
                setProducts(res.data);
                console.log(res.data);
            } catch (err) {
                console.error(err);
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
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default SearchResults;
