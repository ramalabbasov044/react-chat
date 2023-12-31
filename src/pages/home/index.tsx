/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import SearchComponent from '../../components/SearchComponent'
import UsersComponent from '../../components/UsersComponent'
import Messages from '../../components/Messages'
import { useNavigate } from 'react-router-dom'
import { users , searchUser , logOut } from '../../services/index'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import React from 'react'

import { userTypes } from '../../interface/interface'

const Home: React.FC = () => {
    const [usersData,setUsersData] = useState<userTypes[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('data')) {
            navigate("/login");
        }
        getAllUsers();
    }, []);

    const handleInput = (value: string) => {
        if (!value.trim()) {
            getAllUsers()
            return
        }

        const response = searchUser(usersData, value);
        setUsersData(response);
    };

    const getAllUsers = async () => {
        try {
            setLoading(true)
            const result = await users();
            if(result.status == 200){
                const data = result.data.data
                setUsersData(data)
            }
        }catch (err) {
            console.log(err);
        }finally{
            setLoading(false)
        }
    }

    return (
        <Container>
            <Content>
                <LeftSide>
                    <Top>
                        <Title>
                            Messages
                        </Title>

                        <Profile onClick={() => navigate("/profile")}>
                            Go to Notification
                        </Profile>
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

const LoadingComponent = styled.div`
    text-align:center;
    padding: 10px 24px;
    color: rgba(0, 0, 0, 0.40);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
`

const Profile = styled.div`
    font-weight: 600;
    cursor: pointer;
`