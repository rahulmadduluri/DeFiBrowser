import styled from "styled-components";

const CTABtnBg = styled.div`
    height: 38px;
    width: 180px;
    border-radius: 8px;
    background: ${props => props.theme.goldGradient};
`

const CTABtnInner = styled.button`
    height: 34px;
    width: 176px;
    border-radius: 8px;
    border: 0;
    top: 2px;
    left: 2px;
    position: relative;
    background-color: ${props => props.theme.pageBg};
    text-align: center;
    font-family: Libre Baskerville;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.02em;
    color: ${props => props.theme.defaultTextColor};
`;



const CTAButton = ({onClick}: any) => {
    return (
        <CTABtnBg>
            <CTABtnInner onClick={onClick}>
                Get Started
            </CTABtnInner>
        </CTABtnBg>
    )
}

export default CTAButton;