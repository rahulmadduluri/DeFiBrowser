import styled from 'styled-components';
import {useState, useEffect, useRef, useCallback} from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import EntryField from '../EntryField';
import { fetchSolToUSDCConversionRate, swapSolToUSDC } from '../../orca/orca';
import solanaIcon from '../../public/solanaIcon.png';
import usdcIcon from '../../public/usdcIcon.png';
import useWalletBalances from '../../hooks/WalletBalanceProvider';
import CTAButton from '../CTAButton';

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

const ConvertButtonWrapper = styled.div`
    margin: auto;
    margin-top: 36px;
`;

const SkipStep = styled.p`
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    letter-spacing: 0.02em;
    color: #9C9C9C;
    cursor: default;

    :hover {
        text-decoration: underline;
        cursor: pointer;
    }
`

type OnboardingStepTwoProps = {
    completeStep: () => any;
};

const OnboardingStepThree = ({completeStep}: OnboardingStepTwoProps) => {

    const [solInput, setSolInput] = useState<number>();
    const { balances } = useWalletBalances();
    const [usdcTarget, setUsdcTarget] = useState<number | null>();
    const { connection } = useConnection();
    const wallet = useWallet();
    const solInputRef = useRef<number>();
    solInputRef.current = solInput;

    useEffect(() => {
        async function fetch(){
            if(connection && solInput !== undefined && !isNaN(solInput)){
                const rate = await fetchSolToUSDCConversionRate(connection, solInput);
                setUsdcTarget((curr) => {
                    // Since fetching is async responses may land out of order, ensure this repsonse is for the latest update
                    if (solInputRef.current === solInput){
                        return rate;
                    } else {
                        return curr;
                    }
                });
            } else {
                setUsdcTarget(null);
            }
        };
        fetch();
    }, [connection, solInput]);

    const convert = useCallback(() => {
        if (solInput && wallet && connection) {
            swapSolToUSDC(connection, wallet, solInput, (success) => {
                if (success){
                    completeStep();
                } else {
                    alert("Something went wrong!");
                }
            });
        }
    }, [connection, wallet, solInput])

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
                <EntryField width={475} height={51} placeholder={'Enter Amount'} setInput={setSolInput} currencyName={'SOL'} currencyIconSrc={solanaIcon.src} balance={balances?.solBalance}/>
            </DepositWrapper>
            <RecieveWrapper>
                <FieldLabel>Recieve</FieldLabel>
                <EntryField width={475} height={51} disabled displayText={usdcTarget ? usdcTarget.toString() : undefined} currencyName={'USDC'} currencyIconSrc={usdcIcon.src} balance={balances?.usdcBalance}/>
            </RecieveWrapper>
            <ConvertButtonWrapper>
                <CTAButton innerText={'Convert'} onClick={convert}/>
            </ConvertButtonWrapper>
            {balances?.usdcBalance > 0 ? (
                <SkipStep onClick={completeStep}>
                    Already have USDC? Skip this step
                </SkipStep>
            ) : null}
        </Wrapper>
    )
};

export default OnboardingStepThree;