import styled from "styled-components"
import {useGlobalStore} from '../../provider/provider'

// eslint-disable-next-line react/prop-types
const UsersComponent = ({ usersData }) => {
    const { setUserData } = useGlobalStore()

    const getUserFunction = async (userId) => {
      // eslint-disable-next-line react/prop-types
      const userInfo = usersData.filter((item) => item.userId == userId)
      setUserData(userInfo)
    }

    return (
      <Content>
          {
            // eslint-disable-next-line react/prop-types, react/jsx-key
            usersData?.map((item) => 
                <Item onClick={() => getUserFunction(item.userId)} key={item.userId}>
                    <Image src={item.image} />
                    <Right>
                      <Name>
                        {item.name}
                      </Name>
                      <Email>
                        {item.email}
                      </Email>
                    </Right>
                </Item>
            )
          }
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