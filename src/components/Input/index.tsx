import styled from 'styled-components'

// eslint-disable-next-line react/prop-types
const InputComponent = ({ type , placeholder , value , name , onInputChange }) => {

    const handleChange = (e) => {
        const inputValue = e.target.value;
        onInputChange(name, inputValue);
    };
    
    return (
        <>
            <Input
                name={name}
                type={type} 
                value={value} 
                onChange={handleChange}
                placeholder={placeholder}
            />
        </>
    )
}

export default InputComponent

const Input = styled.input`
    width: 100%;
    padding:15px 14px;
    border-radius: 5px;
    border: 0.6px solid #8E8383;
    color: #555454;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    outline: none;

    &::placeholder{
        color: #555454;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`