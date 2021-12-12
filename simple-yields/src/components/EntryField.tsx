import styled from 'styled-components';

type WrapperProps = {
    width: number,
    height: number, 
};

const Wrapper = styled.div<WrapperProps>`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background: rgba(188, 188, 188, 0.33);
    border-radius: 8px;
`;

const InnerContainer = styled.div`
    margin: auto;
    width: calc(100% - 24px);
    height: 100%;
    display: flex;
    direction: row;
    justify-content: space-between;
    align-items: center;
`;

const InputField = styled.input`
    width: 75%;
    height: calc(100% - 16px);
    background-color: rgba(0, 0, 0, 0);
    border: none;
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;

    :focus {
        outline: none;
    }
`;

const RightContainer = styled.div`
    background-color: red;
    width: 20%;
    height: calc(100% - 16px);
`;

type EntryFieldProps = {
    width: number,
    height: number,
    placeholder?: string,
    disabled?: boolean,
    setInput?: (input: number) => void;
};

const EntryField = ({width, height, placeholder, disabled, setInput}: EntryFieldProps) => {
    return (
        <Wrapper width={width} height={height}>
            <InnerContainer>
                <InputField type={'number'} placeholder={placeholder ? placeholder : ''} disabled={disabled} {...setInput ? {onChange: (e) => setInput(parseFloat(e.target.value))} : {}}/>
                <RightContainer/>
            </InnerContainer>
        </Wrapper>
    )
};

export default EntryField;