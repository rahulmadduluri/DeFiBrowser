import { useMemo, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {useWalletModal } from '@solana/wallet-adapter-react-ui';
import styled from 'styled-components';
import CTAButton from '../CTAButton';
import { Button } from '@solana/wallet-adapter-react-ui/lib/Button';

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin: auto;
`

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
`

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
`

const ButtonWrapper = styled.div`
    margin-top: 24px;
`

type OnboardingStepOneProps = {
    completeStep: () => any;
};

const OnboardingStepOne = ({completeStep}: OnboardingStepOneProps) => {

    const { publicKey, wallet, disconnect } = useWallet();
    const { setVisible } = useWalletModal();
    
    const base58 = useMemo(() => publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58(), [publicKey]);
    const walletContent = useMemo(() => {
        if (!wallet || !base58)
            return null;
        return base58.slice(0, 4) + '..' + base58.slice(-4);
    }, [wallet, base58]);    

    useEffect(() => {
        if(publicKey !== null && publicKey !== void 0){
            completeStep();
        }
    }, [publicKey]);

    return (
        <Wrapper>
            <HeaderText>Connect Wallet</HeaderText>
            <ExplainerText>Wallets are a prodigal son of the coming hereafter. Please panacea the end of times until the day of reckoning.</ExplainerText>
            <ButtonWrapper><CTAButton innerText={walletContent ? walletContent : 'Connect Wallet'} onClick={() => setVisible(true)}/></ButtonWrapper>
        </Wrapper>
    )
};

export default OnboardingStepOne;