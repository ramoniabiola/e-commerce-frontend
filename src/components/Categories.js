import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 2px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: #f5f5f5;
`;

const Title = styled.h1`
    font-size: 40px;
    font-weight: 600;
    color: black;
    margin-top: 12px;   
    margin-bottom: 28px;
`;

const CategoriesContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
`;

const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 12px;
    margin-top: 20px;
    padding: 30px;
    border-radius: 12px;
    background-color: #e5e5e5;
    max-width: 400px; /* Limiting width to prevent overflowing */

    &:hover {
        transform: scale(1.01);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        background-color: #d4d4d4;
    }
`;

const Desc = styled.p`
    word-wrap: break-word;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.8;
    text-align: center;
    flex-grow: 1; /* Grow to fill available space */
    color: black;
`;


const Button = styled(Link)`
    margin-top: 24px;
    border: 3px solid #0c0a09;
    border-radius: 8px;
    padding: 14px 40px;
    background-color: transparent;
    cursor: pointer;
    font-weight: 600;
    font-size: 20px;
    text-decoration: none;
    color: #0a0a0a;
    
    &:hover {
        color: #f5f5f5;
        background-color: #0a0a0a;
        border: 3px solid #f5f5f5;
    }

`


const Categories = () => {
    return (
        <Container>
            <Title>Categories</Title>
            <CategoriesContainer>
                <CategoryWrapper>
                    <Desc>
                        Men fashion encompasses a diverse range of styles, trends, and clothing choices tailored to men's 
                        preferences and lifestyles.It often reflects cultural influences, personal tastes, and societal norms. 
                        From classic tailored suits to casual streetwear, men fashion offers a spectrum of options for self-expression and
                        individuality. Key elements of men fashion may include well-fitted clothing, attention to detail in accessories, 
                        and a balance between comfort and style. Whether it's dressing for a formal occasion, expressing creativity through 
                        street style, or embracing timeless elegance, men fashion allows individuals to showcase their personality and confidence 
                        through their clothing choices.
                    </Desc>
                    <Button  to={"/products/Men"}>Men</Button>
                </CategoryWrapper>
                <CategoryWrapper>
                    <Desc>
                        Women fashion is a vibrant and diverse realm encompassing a wide array of styles, 
                        trends, and clothing options designed to reflect women's individuality and self-expression. 
                        From elegant dresses to edgy streetwear, women fashion embraces versatility and creativity, 
                        allowing women to experiment with different looks and aesthetics. It often draws inspiration 
                        from cultural influences, runway trends, and personal preferences, offering a dynamic mix of silhouettes, 
                        colors, and textures. Key elements of female fashion may include attention to detail, accessorizing, and 
                        the ability to mix and match pieces to create unique outfits for various occasions. Whether it's exuding 
                        sophistication in formal attire, embracing comfort in casual wear, or making a statement with bold fashion 
                        choices, women fashion empowers women to express their personality and confidence through their clothing and style.
                    </Desc>
                    <Button to={"/products/Women"}>Women</Button>
                </CategoryWrapper>
                <CategoryWrapper>
                    <Desc>
                        Men fashion and women fashion are vibrant and diverse realms that encompass a wide array of styles, trends, 
                        and clothing options tailored to the preferences and lifestyles of each gender. Men fashion offers a spectrum of options 
                        for self-expression, ranging from classic tailored suits to casual streetwear. It often emphasizes well-fitted clothing, 
                        attention to detail in accessories, and a balance between comfort and style. Whether dressing for a formal occasion or 
                        embracing casual elegance, men fashion allows individuals to showcase their personality and confidence through their clothing
                        choices. Women fashion, on the other hand, embraces versatility and creativity, offering an expansive range of styles and 
                        trends. From elegant dresses to edgy streetwear, female fashion allows women to experiment with different looks and 
                        aesthetics. It draws inspiration from cultural influences, runway trends, and personal preferences, empowering women to 
                        express their individuality and confidence through their clothing and style. In summary, both men and women fashion provide
                        platforms for self-expression, allowing individuals to showcase their personality and creativity through their clothing 
                        choices, while also reflecting cultural influences and societal norms.
                    </Desc>
                    <Button  to={"/products/All"}>Unisex</Button>
                </CategoryWrapper>
            </CategoriesContainer>
        </Container>
    );
};

export default Categories;
