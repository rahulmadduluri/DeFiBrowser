import styled from "styled-components";
import { useState } from 'react';
import { GetServerSideProps } from "next";
import Head from 'next/head';
import Slab from "../components/Slab";
import StepIndicator from "../components/StepIndicator";
import OnboardingStepOne from "../components/OnboardingPages/OnboardingStepOne";
import OnboardingStepTwo from "../components/OnboardingPages/OnboardingStepTwo";
import OnboardingStepThree from "../components/OnboardingPages/OnboardingStepThree";
import favicon from '../public/favicon.ico';
import OnboardingStepFour from "../components/OnboardingPages/OnboardingStepFour";


const OnboardingBody = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.theme.pageBg};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const OnboardingHeader = styled.p`
    margin-left: auto;
    margin-right: auto;
    font-family: Libre Baskerville;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
`;

const SlabContainer = styled.div`
    width: 523px;
    min-height: 571px;
    display: flex;
    flex-direction: row;
`

const OnboardingStepContainer = styled.div`
    margin-top: 36px;
`

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch('https://ftx.us/api/markets/SOL/USD');
    const data = await res.json();
    const solPrice = data.result.price;

    return {
        props: {
            solPrice,
        }
    }
}

type OnboardingProps = {
    solPrice: number
};

const Onboarding = ({solPrice}: OnboardingProps) => {
    const [currentStep, setCurrentStep] = useState(0); 
    const steps = [{label: 'Connect Wallet'}, {label: 'Get SOL'}, {label: 'Get USDC'}, {label: 'Lend'}];

    return (
        <>
            <Head>
                <title>Marble Finance</title>
                <meta name="description" content="SimpleYields helps you get yields as easily as possible." />
                <link rel="icon" href={favicon.src} />
            </Head>
            <OnboardingBody>
                <OnboardingHeader>
                    Marble
                </OnboardingHeader>
                <SlabContainer>
                    {steps.map((value, index) => {
                        return (
                            <Slab key={index} offset={(-523 - 120)*currentStep} enabled={index === currentStep}>
                                {index === 0 ? <OnboardingStepOne completeStep={() => setCurrentStep(1)}/> : null}
                                {index === 1 ? <OnboardingStepTwo solPrice={solPrice} completeStep={() => setCurrentStep(2)}/> : null}
                                {index === 2 ? <OnboardingStepThree completeStep={() => setCurrentStep(3)}/> : null}
                                {index === 3 ? <OnboardingStepFour/> : null}
                            </Slab>
                        )
                    })}
                </SlabContainer>
                <OnboardingStepContainer>
                    <StepIndicator 
                        currentStep={currentStep} 
                        width={468}
                        height={56}
                        steps={steps}
                    />
                </OnboardingStepContainer>
            </OnboardingBody>
        </>
    )
}

export default Onboarding;