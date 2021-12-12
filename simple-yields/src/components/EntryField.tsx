import { useRef, useEffect} from 'react';
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
    width: 64px;
    height: calc(100% - 16px);
`;

const EntryCurrencyRow = styled.div`
    height: 55%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: right;
`;

const CurrencySymbol = styled.img`
    height: 20px;
    width: 20px;
    border-radius: 50%;
`

const CurrencyText = styled.p`
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;
    color: ${props => props.theme.defaultTextColor};
    margin-top: 4px;
    margin-left: 8px;
`

const EntryBalanceRow = styled.div`
    height: 30%;
    width: 100%;
    margin-top: 6px;
    text-align: right;
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 9px;
    line-height: 11px;
    color: #B2B2B2;
    white-space: nowrap;
`;

type EntryFieldProps = {
    width: number,
    height: number,
    placeholder?: string,
    disabled?: boolean,
    setInput?: (input: number) => void;
    displayText?: string,
    currencyName: string,
    currencyIconSrc: string,
    balance: number,
};

const EntryField = ({width, height, placeholder, disabled, setInput, displayText, currencyName, currencyIconSrc, balance}: EntryFieldProps) => {

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Display text can only be used when disabled
        if(inputRef.current && disabled){
            inputRef.current.value = displayText ? displayText : '';
        }
    }, [displayText, inputRef])

    return (
        <Wrapper width={width} height={height}>
            <InnerContainer>
                <InputField ref={inputRef} type={'number'} placeholder={placeholder ? placeholder : ''} disabled={disabled} {...setInput ? {onChange: (e) => setInput(parseFloat(e.target.value))} : {}}/>
                <RightContainer>
                    <EntryCurrencyRow>
                        <CurrencySymbol src={currencyIconSrc}/>
                        <CurrencyText>{currencyName}</CurrencyText>
                    </EntryCurrencyRow>
                    <EntryBalanceRow>{balance ? `Balance: ${balance >= 1 ? balance.toFixed(2).toString() : balance.toFixed(4).toString()}` : 'Balance: 0'}</EntryBalanceRow>
                </RightContainer>
            </InnerContainer>
        </Wrapper>
    )
};

export default EntryField;