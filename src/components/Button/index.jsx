import styled from 'styled-components'

// eslint-disable-next-line react/prop-types
const ButtonC = ({ title , SwitchedFunc}) => {

    let handleButton = () => {
        SwitchedFunc()
    }
    
    return (
        <>
            <Button onClick={handleButton}>
                {
                    title
                }
            </Button>
        </>
    )
}

export default ButtonC

const Button = styled.button`
    width: 100%;
    border-radius: 5px;
    border: 0.6px solid #8E8383;
    background: #000;
    padding: 13px 0px;
    color: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
`