import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { sliderItems } from '../data';
import { Link } from 'react-router-dom';



const scrollReveal = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-30px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;
    position: relative;

`;


const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${props => props.direction === "left" && "12px"};
    right: ${props => props.direction === "right" && "12px"};
    cursor: pointer;
    opacity: 0.2;
    z-index: 2;
`;

const Wrapper = styled.div`
    height: 100%; 
    display: flex;
    transition: 1.2s ease;
    transform: translateX(${props => props.slideindex * - 100}vw);
`;

const Slide = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;


`;

const ImageContainer = styled.div`
    height: 100%;
    width: 100%;
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 800%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
`;

const Image = styled.img`
    height: 100vh;
    width: 100vw;
    object-fit: cover;
    overflow: hidden;
    
`;

const InfoContainer = styled.div`
    position: absolute;
    top: 34%;
    left: 23%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #fff;
    z-index: 1;
    max-width: 990px; 
    width: 80%; 
    margin-right: 50px;
    animation: ${scrollReveal} 1s ease forwards;
`;


const Title = styled.h1`
    font-size: 100px;
    margin-bottom: 14px;
`;

 
const Desc = styled.p`
    font-size: 20px;
    margin-bottom: 38px;
    letter-spacing: 3px;
`;
 
const Button = styled(Link)`
    cursor: pointer;
    border: 1px solid #fff;
    border-radius: 4px;
    padding: 8px 20px;
    color: #fff;
    text-decoration: none;
    font-family: century;
    transition: 0.5 ease;
    font-size: 18px;


    &:hover {
        background-color: #fff;
        color: black;
        transition: 0.5s ease;
    }
`;
 


const Slider = () => {
    const [slideindex, setSlideIndex] = useState(0);


    const handleClick = useCallback((direction) => { 
        if(direction === "left") {
            setSlideIndex(slideindex > 0 ? slideindex - 1 : sliderItems.length - 1);
        } else {
            setSlideIndex(slideindex < sliderItems.length - 1 ? slideindex + 1 : 0);
        }
    }, [slideindex]);


         
    useEffect(() => {
        const interval = setInterval(() => {
            handleClick("right");
        }, 8000);
        return () => clearInterval(interval);
    }, [slideindex, handleClick]);


    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined/>
            </Arrow>
            <Wrapper slideindex={slideindex}>
                {sliderItems.map(item => ( 
                    <Slide key={item.id}>
                        <ImageContainer>
                            <Image src={item.img} />
                        </ImageContainer>
                        <InfoContainer>   
                            <Title>{item.title}</Title> 
                            <Desc>{item.desc}</Desc> 
                            <Button to={`/products/${item.cat}`}>SHOP NOW</Button>
                        </InfoContainer> 
                    </  Slide>
                ))}
            </Wrapper>
            <Arrow  direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined/>
            </Arrow>
        </Container>
    );
};

export default Slider;
