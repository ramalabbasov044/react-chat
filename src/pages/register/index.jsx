import Input from '../../components/Input/index'
import Button from '../../components/Button/index'
import Error from '../../components/Error/index'
import { register } from '../../services/index'
import { useNavigate } from 'react-router-dom'
import Text from '../../components/Text/index'
import styled from 'styled-components'
import { useState } from 'react'
const Register = () => {
  const [formData, setFormData] = useState({ 
      name: '',
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
  console.log(formData);
  const SwitchedFunc = async () => {
      try {
        const result = await register(formData);
        console.log(result);
        result.status == 200 ? navigate("/login") : null
      }catch (err) {
        setError(err.response.data.errors);
      }
  }

  return (
    <>
      <Container>
          <Content> 
            <HeadContent>
              <Text title={"Lets Register Account"} weigth={700} size={35} color={"#000"} />
              <Text title={"Hello user"} weigth={400} size={28} color={"#000"} />
            </HeadContent>

            {error ? <Error err={Object.values(error)} /> : ""}

            <InputGroup>
                <Input type={"text"} name={"name"} placeholder={"Name"} value={formData.name} onInputChange={handleInputChange} />
                <Input type={"text"} name={"email"} placeholder={"Email"} value={formData.email} onInputChange={handleInputChange} />
                <Input type={"text"} name={"password"} placeholder={"Password"} value={formData.password} onInputChange={handleInputChange} />
            </InputGroup>

            <ButtonGroup>
                <Button title={"Sign in"} SwitchedFunc={SwitchedFunc} />
            </ButtonGroup>
          </Content>
      </Container>
    </>
  )
}

export default Register

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