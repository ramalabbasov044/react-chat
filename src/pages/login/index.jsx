import Button from '../../components/Button/index'
import Error from '../../components/Error/index'
import Input from '../../components/Input/index'
import Text from '../../components/Text/index'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/index'
import styled from 'styled-components'
import { useState } from 'react'
const Login = () => {
  const [formData, setFormData] = useState({
      email: '',
      password: '',
  });
  const [error,setError] = useState("")
  const navigate = useNavigate()

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const SwitchedFunc = async () => {
    try {
        const result = await login(formData);
        localStorage.setItem('data',result.data.data.accessToken)
        localStorage.setItem('tokenType',result.data.data.tokenType)
        // eslint-disable-next-line no-constant-condition
        result.status = 200 ? navigate("/") : null
    }catch (err) {
        setError(err.response.data.errors);
    }
  }

  return (
    <>
      <Container>
          <Content> 
            <HeadContent>
              <Text title={"Lets Sign you in"} weigth={700} size={35} color={"#000"} />
              <Text title={"Welcome Back"} weigth={400} size={28} color={"#000"} />
            </HeadContent>

            {error ? <Error err={Object.values(error)} /> : ""}

            <InputGroup>
                <Input type={"text"} name={"email"} placeholder={"Email"} value={formData.email} onInputChange={handleInputChange} />
                <Input type={"text"} name={"password"} placeholder={"Password"} value={formData.password} onInputChange={handleInputChange} />
            </InputGroup>

            <ButtonGroup>
                <Button title={"Login"} SwitchedFunc={SwitchedFunc} />
            </ButtonGroup>

            <SignUpLink onClick={() => navigate('/signup')}>
              Don’t have an account ? Register Now  
            </SignUpLink>
          </Content>
      </Container>
    </>
  )
}

export default Login


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      transition: background-color 5000s ease-in-out 0s;
      border: 0.6px solid #8E8383 !important;
      font-style: normal;
      font-weight: 400 !important;
      font-size: 16px !important;
      line-height: 18px;
    }
`

const Content = styled.div`
    max-width:390px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 52px 14px 0px 14px;
`

const HeadContent = styled.div`
    display:flex;
    flex-direction:column;
    gap: 8px;
`

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 24px;
`

const ButtonGroup = styled.div`
    margin-top: 49px;
`

const SignUpLink= styled.p`
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;  
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
`