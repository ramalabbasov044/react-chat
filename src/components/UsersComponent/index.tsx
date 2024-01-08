import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import { ref, push } from "firebase/database";

import { useGlobalStore } from '../../provider/provider';
import { followUser } from '../../services/index';
import { db } from '../../helper/firebase/index';

import 'react-toastify/dist/ReactToastify.css';

interface UserTypes {
    userId: number;
    image: string;
    name: string;
    email: string;
}

interface UsersComponentProps {
    usersData: UserTypes[];
}

const UsersComponent: React.FC<UsersComponentProps> = ({ usersData }) => {
    const { setUserData } = useGlobalStore();
    const [followersData, setFollowersData] = useState<UserTypes[]>([]);

    const getUserFunction = async (userId: number) => {
      const userInfo = usersData.filter((item) => item.userId === userId);
      setUserData(userInfo);
    }

    const followUserF = async (id: number, item: UserTypes) => {
        const res = await followUser(id);
        if (res.status === 200) {
            toast.success(res.data.message);
            setFollowersData(prevFollowers => [...prevFollowers, item]);
        }
    }

    useEffect(() => {
        const followers = ref(db, "followers");
        push(followers, followersData);
    }, [followersData]);

    return (
      <Content>
          {
            usersData?.map((item) => (
                <Item onClick={() => getUserFunction(item.userId)} key={item.userId}>
                    <Image src={item.image} />
                    <Right>
                      <Top>
                        <Name>
                          {item.name}
                        </Name>
                        {
                            <FollowButton onClick={() => followUserF(item.userId,item)}>Follow</FollowButton> 
                        }
                      </Top>

                      <Email>
                        {item.email}
                      </Email>
                    </Right>
                </Item>
            ))
          }
        <ToastContainer />
      </Content>
    )
}

export default UsersComponent

const Content = styled.div`
    padding: 0px 16px;
    max-height: 75vh;
    overflow-y: scroll;
`

const Item = styled.div`
    display: flex;
    gap: 16px;
    padding: 12px;
    cursor: pointer;
`

const Image = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 12px;
`

const Right = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-between;
`

const Name = styled.p`
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
`

const Email = styled.p`
    color: rgba(0, 0, 0, 0.40);
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
`

const Top = styled.div`
    display: flex;
    gap: 20px;
`

const FollowButton = styled.div`
    color: green;
    font-size: 16px;
    font-weight: 500;
`
