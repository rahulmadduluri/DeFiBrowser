import styled from "styled-components";

type StepProps = {
    enabled: boolean;
    lineWidth?: number;
    showLine: boolean;
    stepNumber: number;
    label: String;
};


type StepCircleProps = {
    enabled: boolean;
}
const StepCircle = styled.div<StepCircleProps>`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    position: relative;
    top: 0px;
    left: 0px;
    
    background: radial-gradient(64.71% 71.26% at 31.61% 28.74%, rgba(255, 255, 255, 0) 30.73%, rgba(176, 180, 190, 0.1) 68.75%, rgba(255, 255, 255, 0) 100%), radial-gradient(76.24% 71.26% at 31.61% 28.74%, #FFFFFF 0%, #E5E8EC 67.27%, #FFFFFF 100%);
    background-blend-mode: darken, normal;
    box-shadow: inset 0px -4px 4px rgba(255, 255, 255, 0.02), inset 0px 4px 4px rgba(255, 255, 255, 0.02);
    border: ${props => props.enabled ? 'solid 1px #f7c17aac' : null};
`

type StepLineProps = {
    lineWidth: number;
    opacity: number;
}
const StepLine = styled.div<StepLineProps>`
    background: ${props => props.theme.goldGradient};
    width: ${props => props.lineWidth.toString()}px;
    opacity: ${props => props.opacity};
    height: 1px;
    position: relative;
    left: 35px;
    top: 18px;
`;

const StepNumber = styled.p`
    font-family: Inter;
    font-style: normal;
    font-weight: 100;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    letter-spacing: 0.02em;
    position: relative;
    top: -6px;
    color: ${props => props.theme.defaultTextColor};
`;

const Label = styled.p`
    text-align: center;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.02em;
    color: ${props => props.theme.defaultTextColor};
    position: relative;
    left: -6px;
`;

const StepContainer = styled.div`
    width: 48px;
    height: 60px;
`

const Step = ({enabled, lineWidth = 100, showLine, stepNumber, label}: StepProps) => {
    console.log(enabled);
    return (
        <StepContainer>
            <StepCircle enabled={enabled}>
                <StepLine lineWidth={lineWidth} opacity={showLine ? 1 : 0}/>
                <StepNumber>{stepNumber}</StepNumber>
            </StepCircle>
            <Label>{label}</Label>
        </StepContainer>
    )
};

export default Step;