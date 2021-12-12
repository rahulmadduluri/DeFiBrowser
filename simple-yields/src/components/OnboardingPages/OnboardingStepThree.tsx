import styled from 'styled-components';
import {useState} from 'react';
import EntryField from '../EntryField';

const HeaderText = styled.h2`
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 44px;
    letter-spacing: 0.02em; 
    margin-left: 24px;
    margin-top: 36px;
    margin-bottom: 0px;
    color: ${props => props.theme.defaultTextColor};
`;

const ExplainerText = styled.p`
    font-family: Inter;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    color: ${props => props.theme.defaultTextColor};
    margin-top: 12px;
    margin-bottom: 0px;
    margin-left: 24px;;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
`;

const DepositWrapper = styled.div`
    margin-left: 21px;
    margin-top: 24px;
`;

const FieldLabel = styled.p`
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;
    color: ${props => props.theme.defaultTextColor};
`;

const RecieveWrapper = styled.div`
    margin-left: 21px;
    margin-top: 48px;
`;

const OnboardingStepThree = () => {

    const [solInput, setSolInput] = useState<number>();

    return (
        <Wrapper>
            <HeaderText>
                Convert SOL to USDC
            </HeaderText>
            <ExplainerText>
                USDC is a stablecoin. Stablecoins are coins who’s value is tied to another currency. 1 USDC is worth 1 dollar. Your principal’s value in USDC will always be stable.
            </ExplainerText>
            <DepositWrapper>
                <FieldLabel>Deposit</FieldLabel>
                <EntryField width={475} height={51} placeholder={'Enter Amount'} setInput={setSolInput}/>
            </DepositWrapper>
            <RecieveWrapper>
                <FieldLabel>Recieve</FieldLabel>
                <EntryField width={475} height={51} disabled/>
            </RecieveWrapper>
        </Wrapper>
    )
};

export default OnboardingStepThree;