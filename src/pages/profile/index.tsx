/* eslint-disable react/jsx-key */
import { logOut , getFollowers , getUserProfile , rejectUser , approveUser  } from '../../services/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styled from "styled-components"
import React from 'react';

interface userDataTypes {
    email: string,
    image: string,
    name: string,
    userId: number
}

interface followersType {
    email: string,
    routes: object,
    name: string,
    userId: number
}

const Profile = () => {
    const [notificationTitle,setNotificationTitle] = useState<string>("You don't have any notification")
    const [userData,setUserData] = useState<userDataTypes>({
        email: "",
        image: "",
        name: "",
        userId: 0
    })
    const [followers,setFollowers] = useState<followersType[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        getUserProfileF()
        getFollowersF()
    },[])

    const getUserProfileF = async () => {
        try {
            const activeUserId: string | null = localStorage.getItem("activeData")
            const res = await getUserProfile(activeUserId)
            setUserData(res.data.data)
        }catch (err) {
            console.error(err);
        }
    }

    const logoutFunction = () => {
        const response = logOut()
        response ? navigate("/") : navigate("/login")
    }

    const getFollowersF = async () => {
        try {
            const res = await getFollowers(); 
            setFollowers(res.data.data);
            console.log(res.data.data);
            
            if(res.data.data.length > 0){
                setNotificationTitle("You have notification")
            }else{
                setNotificationTitle("You don't have any notification")
            }
        } catch (err) {
            console.error(err);
        }
    };

    const approveUserF = async (id: number | string) => {
        try {
            const response = await approveUser(id)
            toast(response.data.message)
            getFollowersF()
        }catch (err){
            console.log(err);
        }
    }

    const rejectUserF = async (id: number | string) => {
        try {
            const response = await rejectUser(id)
            toast(response.data.message)
            getFollowersF()
        }catch (err){
            console.log(err);
        }
    }
    console.log(userData);
    
    return (
        <Container>
            <Top>
                Bildirimlər

                <Right>
                    <LogOutButton onClick={logoutFunction}>
                            Log Out
                    </LogOutButton>

                    <LogOutButton onClick={() => navigate(-1)}>
                            Back
                    </LogOutButton>
                </Right>
            </Top>

            <Bottom>
                <Image src={userData.image} />
                <Name>Hello, {userData.name}</Name>
                <Name>{ notificationTitle }</Name>

                {
                    followers.map((item) => 
                        <FollowerItem key={item.userId}>
                            <FollowerName>
                                {item.name} Səni Takip etmək istəyir 
                            </FollowerName>

                            <FollowerButtonBody>
                                <AppreoveButton onClick={() => approveUserF(item.userId)}>
                                    Qebul et
                                </AppreoveButton>
                                <RejectButton onClick={() => rejectUserF(item.userId)}>
                                    Qebul etmə
                                </RejectButton>
                            </FollowerButtonBody>
                        </FollowerItem>
                    )
                }
            </Bottom>

            <ToastContainer />

        </Container>
    )
}

export default Profile

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    padding: 40px;
`

const Bottom = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Image = styled.img`
    width: 110px;
    height: 110px;
    border-radius: 50%;
`

const Name = styled.p`
    color: #000;
    font-size: 18px;
    font-weight: 600;
    margin-top: 9px;
`

const LogOutButton = styled.div`
    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
    cursor: pointer;
`

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 24px;
`

const FollowerItem = styled.div`
    display:flex;
    flex-direction: column;
    border-bottom: 1px solid darkgray;
    border-top: 1px solid darkgray;
    padding: 20px;
    margin: 12px 0px;
`

const FollowerName = styled.p`
    color: #000;
    opacity: .4;
    text-align: center;
`

const FollowerButtonBody = styled.div`
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-top: 15px;
`

const AppreoveButton = styled.button`
    padding: 13px 23px;
    border: 1px solid green;
    color: green;
    background: transparent;
    border-radius: 13px;
    cursor: pointer;
`

const RejectButton = styled.button`
    padding: 13px 23px;
    border: 1px solid orange;
    color: orange;
    background: transparent;
    border-radius: 13px;
    cursor: pointer;
`

const Right = styled.div`
    display:flex;
    gap: 30px;
`