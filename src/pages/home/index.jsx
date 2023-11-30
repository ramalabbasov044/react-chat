/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import SearchComponent from '../../components/SearchComponent'
import UsersComponent from '../../components/UsersComponent'
import Messages from '../../components/Messages'
import { useNavigate } from 'react-router-dom'
import { users , searchUser , logOut } from '../../services/index'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Home = () => {
    const [usersData,setUsersData] = useState()
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        SwitchedFunc()
        localStorage.getItem('data') ? null : navigate("/login")
    }, [])

    const handleInput = (value) => {
        if (!value.trim()) {
          SwitchedFunc();
          return;
        }
    
        const response = searchUser(usersData,value)
        setUsersData(response);
      };

    const SwitchedFunc = async () => {
        try {
            setLoading(true)
            const result = await users();
            const data = result.data.data
            setUsersData(data)
        }catch (err) {
            console.log(err);
        }finally{
            setLoading(false)
        }
    }

    const logoutFunction = () => {
        const response = logOut()
        console.log(response);
    }
    return (
        <Container>
            <Content>
                <LeftSide>
                    <Top>
                        <Title>
                            Messages
                        </Title>
                        <LogOutButton onClick={logoutFunction}>
                            Log Out
                        </LogOutButton>
                    </Top>

                    <Border></Border>

                    <Bottom>
                        <SearchComponent handleInput={handleInput} />
                            <LoadingComponent>
                                {
                                    loading ? "Loading Users...": ""
                                }
                            </LoadingComponent>
                        <UsersComponent usersData={usersData} />
                    </Bottom>
                </LeftSide>

                <RightSide>
                    <Messages />
                </RightSide>
            </Content>
        </Container>
    )
}

export default Home

const Container = styled.div`
    width: 100%;
`

const Content = styled.div`
    width: 100%;
    display: flex;
`

const LeftSide = styled.div`
    max-width: 349px;
    width: 100%;
    display:flex;
    flex-direction: column;
    width: 100%;
    border-right: 1px solid #ebebeb;
`

const RightSide = styled.div`
    width: 100%;
`

const Top = styled.div`
    display:flex;
    align-items: center;
    justify-content:space-between;
    padding: 24px;
`

const Title = styled.p`
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
`

const Border = styled.div`
    width: 100%;
    height: 1px;
    background: black;
    opacity: 0.08;
`

const Bottom = styled.div`
    display:flex;
    flex-direction: column;
`

const LogOutButton = styled.div`
    color: #000;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
    cursor: pointer;
`

const LoadingComponent = styled.div`
    text-align:center;
    padding: 10px 24px;
    color: rgba(0, 0, 0, 0.40);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
`