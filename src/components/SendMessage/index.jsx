import { useState } from "react"
import styled from "styled-components"


// eslint-disable-next-line react/prop-types
const SendMessage = ({ handleData }) => {
    const [messageValue,setMessageValue] = useState({value:""}) 

    const handleInput = (e) => {
        const value = e.target.value
        const messageObj = {
            value,
        }
        setMessageValue(messageObj)
    }

    const sendMessageFunction = async () => {
        handleData(messageValue.value)
        setMessageValue({value:""})
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          sendMessageFunction();
        }
      };

    return (
        <>
            <Form>
                <Input onKeyDown={handleKeyDown} value={messageValue.value} onChange={handleInput} placeholder="Type a message" />

                <SendButton onClick={sendMessageFunction}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.14 2.96001L7.11 5.96001C1.04 7.99001 1.04 11.3 7.11 13.32L9.79 14.21L10.68 16.89C12.7 22.96 16.02 22.96 18.04 16.89L21.05 7.87001C22.39 3.82001 20.19 1.61001 16.14 2.96001ZM16.46 8.34001L12.66 12.16C12.51 12.31 12.32 12.38 12.13 12.38C11.94 12.38 11.75 12.31 11.6 12.16C11.4605 12.0189 11.3823 11.8284 11.3823 11.63C11.3823 11.4316 11.4605 11.2412 11.6 11.1L15.4 7.28001C15.69 6.99001 16.17 6.99001 16.46 7.28001C16.75 7.57001 16.75 8.05001 16.46 8.34001Z" fill="#615EF0"/>
                    </svg>
                </SendButton>
            </Form> 
        </>
    )
}

export default SendMessage

const Form = styled.div`
    display:flex;
    justify-content: space-between;
    width: 100%;
    padding: 0px 20px;
    border-radius: 12px;
    border: 2px solid #E2E8F0;
    background: #fff;
    height: 48px;
`

const Input = styled.input`
    width: 90%;
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; 
    opacity: 0.4;
    border: 0;
    outline: none;
    height: 100%;
`

const SendButton = styled.button`
    border: 0;
    background: #fff;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`