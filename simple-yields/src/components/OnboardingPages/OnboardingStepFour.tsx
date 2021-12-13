import styled from "styled-components";
import useWalletBalances from "../../hooks/WalletBalanceProvider";
import EntryField from "../EntryField";
import usdcIcon from '../../public/usdcIcon.png';
import CTAButton from "../CTAButton";
import useDeFiOptions from "../../hooks/DeFiOptionsProvider";

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

const GreenText = styled.p`
    font-weight: bold;
    color: #21CE99;
    display: inline;
`

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
`;

const DepositWrapper = styled.div`
    margin-left: 24px;
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

const ConvertButtonWrapper = styled.div`
    margin: auto;
    margin-top: 48px;
`;

const OnboardingStepFour = () => {
    const { balances } = useWalletBalances();
    const [ defiOptions ] = useDeFiOptions();

    return (
        <Wrapper>
            <HeaderText>Lend USDC</HeaderText>
            <ExplainerText><GreenText>{defiOptions[0]?.currentAPY}%</GreenText> APY</ExplainerText>
            <DepositWrapper>
                <FieldLabel>Deposit</FieldLabel>
                <EntryField width={475} height={51} currencyName={'USDC'} balance={balances?.usdcBalance} currencyIconSrc={usdcIcon.src}/>
            </DepositWrapper>
            <ConvertButtonWrapper>
                <CTAButton innerText={'Deposit'} onClick={() => null}/>
            </ConvertButtonWrapper>
        </Wrapper>
    )
};

export default OnboardingStepFour;