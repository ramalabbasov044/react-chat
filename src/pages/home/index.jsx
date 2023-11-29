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
    const [usersData,setUsersData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.getItem('data') ? null : navigate("/login")
        SwitchedFunc()
    }, [])

    const handleInput = (value) => {
        const filteredItem = searchUser(usersData,value)
        console.log(filteredItem,usersData,value);
    }

    const SwitchedFunc = async () => {
        try {
            const result = await users();
            const data = result.data.data
            setUsersData(data)
        }catch (err) {
            console.log(err);
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