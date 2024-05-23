import { css } from 'styled-components';


export const MobileDevice = (props) => {
    return css`
    @media only screen and (max-width: 500px){
        ${props}
    }
    `;
};








