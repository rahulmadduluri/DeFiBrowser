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

const SlabContainer = styled.div`
    width: 523px;
    min-height: 571px;
    display: flex;
    flex-direction: row;
`

const OnboardingStepContainer = styled.div`
    margin-top: 36px;
`

const Onboarding = () => {
    const [currentStep, setCurrentStep] = useState(0); 
    const steps = [{label: 'Connect Wallet'}, {label: 'Get SOL'}, {label: 'Get USDC'}, {label: 'Lend'}];

    return (
        <OnboardingBody>
            <OnboardingHeader>
                Marble
            </OnboardingHeader>
            <SlabContainer>
                {steps.map((value, index) => {
                    return (
                        <Slab key={index} offset={(-523 - 120)*currentStep} enabled={index === currentStep}>
                            <div>hello</div>
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
            <button onClick={() => setCurrentStep((prev) => prev+1)} />
        </OnboardingBody>
    )
}

export default Onboarding;