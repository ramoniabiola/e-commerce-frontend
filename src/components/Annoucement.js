import React from 'react';
import styled, { keyframes } from 'styled-components';
import { MobileDevice } from '../reponsive';

const gradientAnimation = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

const Container = styled.div`
    height: 50px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    ${MobileDevice({ fontSize: "12px" })}
    animation: ${gradientAnimation} 2.1s linear infinite alternate;
    background-size: 400% 400%;
    background-image: linear-gradient(to right,rgb(7 89 133), rgb(6 95 70), rgb(190 24 93));
`;

const Announcement = () => {
    return (
        <Container>
            Extraordinary Deal! Free Delivery on orders over N40,000
        </Container>
    );
};

export default Announcement;
