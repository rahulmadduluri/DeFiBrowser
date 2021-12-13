import styled from "styled-components";
import { motion } from 'framer-motion';

const CTABtnBg = styled(motion.div)`
    height: 38px;
    width: 180px;
    border-radius: 8px;
    background: ${props => props.theme.goldGradient};
    :hover {
        background: ${props => props.theme.goldGradientLight};
        cursor: pointer;
    }
`

const CTABtnInner = styled.button`
    height: 34px;
    width: 176px;
    border-radius: 8px;
    border: 0;
    top: 2px;
    left: 2px;
    position: relative;
    background-color: ${props => props.theme.btnBg};
    text-align: center;
    font-family: Libre Baskerville;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.02em;
    color: ${props => props.theme.defaultTextColor};
    
    :hover {
        cursor: pointer;
    }
`;


type CTAButtonProps = {
    onClick: (e: any) => void;
    innerText?: string;
};

const CTAButton = ({onClick, innerText}: CTAButtonProps) => {
    return (
        <CTABtnBg whileHover={{scale: 1.01}}>
            <CTABtnInner onClick={onClick}>
                {innerText ? innerText : 'Get Started'}
            </CTABtnInner>
        </CTABtnBg>
    )
}

export default CTAButton;