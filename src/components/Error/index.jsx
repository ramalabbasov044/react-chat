import styled from 'styled-components'

// eslint-disable-next-line react/prop-types
const Error = ({ err }) => {
    return (
        <ErrorBody>
            {
                // eslint-disable-next-line react/prop-types, react/jsx-key
                err.map((item) => <ErrorTitle key={"1"}>{item}</ErrorTitle>)                 
            }
        </ErrorBody>
    )
}

export default Error

let ErrorBody = styled.div`
    margin-top: 12px;
`

let ErrorTitle = styled.p`
    color: #2a9f39fc;
    margin-bottom: 6px;
`