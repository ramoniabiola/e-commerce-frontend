import React from 'react';
import styled from 'styled-components';
import { KeyboardDoubleArrowRight, Star, StarHalf, StarOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;


const Wrapper = styled.div`
    width: 328px;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 4px;
    position: relative;
    margin-bottom: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    transition: transform 0.1s ease;
    margin: 0;

    &:hover {
        transform: scale(1.04);
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    max-height: 90%;
    max-width: 90%;
    object-fit: cover;
`;

const Info = styled.div`
    width: 90%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    margin: 10px 0;
`;

const Title = styled.h1`
    font-size: 26px;
    font-weight: 700;
    margin: 10px 0;
    color: #18181b;
`;

const Price = styled.h2`
    font-size: 22px;
    color: #6b7280;
    font-weight: 700;
`;

const Icons = styled.div`
    display: flex;
    margin: 4px 0;
    color: #f59e0b;
`;


const Button = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background-color: #059669;
    color: #fff;
    border: none;
    margin: 18px 0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: bac kground-color 0.2s;

    &:hover {
        background-color: #065f46;
    }
`;

const StyledLink = styled(Link)`
    width: 100%;
    text-decoration: none;
`;

const TopSelling = ({ product }) => {
    if (!product) return null;

    return (
        <Container>
            <Wrapper>
                <ImageContainer>
                    <Image src={product.img} alt={product.title} />
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
                        <Button>
                            <KeyboardDoubleArrowRight sx={{ fontSize: '22px', marginRight: "2.5px", color: "gold" }} />
                            VIEW DETAILS
                        </Button>
                    </StyledLink>
                </Info>
            </Wrapper>
        </Container>
    );
};

export default TopSelling;  
