import styled from 'styled-components';
import Step from './Step';

type StepIndicatorProps = {
    width: number;
    height: number;
    steps: StepData[];
    currentStep: number;
};

type StepData = {
    label: String;
}

interface ContainerProps {
    containerWidth: number;
    containerHeight: number;
};

const Container = styled.div<ContainerProps>`
    width: ${props => props.containerWidth.toString()}px;
    height: ${props => props.containerHeight.toString()}px;
    //background: red;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const StepIndicator = ({width, height, steps, currentStep}: StepIndicatorProps) => {

    const lineWidth = (width / steps.length) - 9;

    return (
        <Container containerWidth={width} containerHeight={height}>
            {steps.map((stepData, i) => {
                return <Step key={i} enabled={i === currentStep} showLine={i !== steps.length - 1} lineWidth={lineWidth} stepNumber={i + 1} label={stepData.label}/>
            })}
        </Container>
    )
};

export default StepIndicator;