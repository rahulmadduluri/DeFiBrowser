import { useEffect, useState } from "react";
import styled from 'styled-components';
import useWalletBalances from '../../hooks/WalletBalanceProvider';
import CTAButton from '../CTAButton';


const HeaderText = styled.h2`
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 44px;
    text-align: center;
    letter-spacing: 0.02em; 
    color: ${props => props.theme.defaultTextColor};
    margin-top: 194px;
    margin-bottom: 0px;
`;

const ExplainerText = styled.p`
    font-family: Inter;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: ${props => props.theme.defaultTextColor};
    margin-top: 12px;
    margin-bottom: 0px;
`;


const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin: auto;
`;

const ButtonWrapper = styled.div`
    margin-top: 24px;
`;

type OnboardingStepTwoProps = {
    solPrice: number,
    completeStep: () => any;
};

const OnboardingStepTwo = ({solPrice, completeStep} : OnboardingStepTwoProps) => {
    const {balances, loading} = useWalletBalances();

    const solBalance = balances?.solBalance;

    return (
       <Wrapper> 
           {(solBalance > 0) ? 
            <>
                <HeaderText>You have {solBalance.toFixed(0).toString()} SOL</HeaderText> 
                <ExplainerText>Nice lets invest it</ExplainerText>
                <ButtonWrapper><CTAButton innerText={'Next'} onClick={completeStep}/></ButtonWrapper>
            </>
            : 
            (!loading ? <div>Buy SOL!</div> : null)} 
        </Wrapper>
    )
};

export default OnboardingStepTwo;