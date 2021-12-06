import styled from "styled-components";
import { useState } from 'react';
import Slab from "../components/Slab";
import StepIndicator from "../components/StepIndicator";


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

const OnboardingStepContainer = styled.div`
    margin-top: 36px;
`

const Onboarding = () => {
    const [currentStep, setCurrentStep] = useState(0); 

    return (
        <OnboardingBody>
            <OnboardingHeader>
                Marble
            </OnboardingHeader>
            <Slab/>
            <OnboardingStepContainer>
                <StepIndicator 
                    currentStep={currentStep} 
                    width={468}
                    height={56}
                    steps={[{label: 'Connect Wallet'}, {label: 'Get SOL'}, {label: 'Get USDC'}, {label: 'Lend'}]}
                />
            </OnboardingStepContainer>
        </OnboardingBody>
    )
}

export default Onboarding;