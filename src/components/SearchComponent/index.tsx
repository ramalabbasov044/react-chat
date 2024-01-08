import React from "react"
import styled from "styled-components"

// eslint-disable-next-line react/prop-types
const SearchComponent = ({ handleInput }) => {
  return (
    <Content>
        <Input onChange={(e) => handleInput(e.target.value)} placeholder="Search messages" type="text" />
    </Content>
  )
}

export default SearchComponent


const Content = styled.div`
    padding: 12px 24px;
`

const Input = styled.input`
    width: 100%;
    height: 48px;
    padding: 10px 20px;
    gap: 10px;
    border-radius: 12px;
    background: #F3F3F3;
    border:0;
    outline: none;
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; 
    opacity: .4;

    &::placeholder{
      color: #000;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; 
    }
`