import { useEffect , useState } from 'react'
import { useGlobalStore } from '../../provider/provider'
import { getMessages , sendMessage } from '../../services/index'
import SendMessage from '../SendMessage/index'
import styled from 'styled-components'

let formatDate = (dateString) => {
  const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Baku', 
      hour12: false, 
  };

  const formattedDate = new Date(dateString).toLocaleString('en-US', options);
  return formattedDate;
}

const Messages = () => {
    const [messageData,setMessageData] = useState([])
    const [loading,setLoading] = useState(false)
    const [messageLoading,setMessageLoading] = useState(false)
    const { userData } = useGlobalStore()

    useEffect(() => {
      getUserMessages();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    const getUserMessages = async () => {
      if (userData[0]) {
        try {
          setLoading(true)
          const result = await getMessages(userData[0].userId);
          const sortedMessages = result.data.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          setMessageData(sortedMessages);
        } catch (err) {
          console.log(err);
        }finally{
          setLoading(false)
        }
      }
      return;
    };

    const handleData = async (message) => {
      if(userData[0]){
        try {
            setMessageLoading(true)
            let id = userData[0].userId
            await sendMessage({"to_id":id,"message":message});
            getUserMessages()
        }catch (err) {
            console.log(err);
        }finally{
          setMessageLoading(false)
        }
      }
      return
    }

    return (
      <>
          <Top>
            <Left>
              <UserImage src={userData[0] ? userData[0].image : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} />
              <UserName>{userData[0] ? userData[0].name : "User"}</UserName>
            </Left>

            <Right>
              <CallButton>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.05 12.95L7.2 14.8C6.81 15.19 6.19 15.19 5.79 14.81C5.68 14.7 5.57 14.6 5.46 14.49C4.44877 13.472 3.5161 12.3789 2.67 11.22C1.85 10.08 1.19 8.94 0.71 7.81C0.24 6.67 0 5.58 0 4.54C0 3.86 0.12 3.21 0.36 2.61C0.6 2 0.98 1.44 1.51 0.94C2.15 0.31 2.85 0 3.59 0C3.87 0 4.15 0.0600001 4.4 0.18C4.66 0.3 4.89 0.48 5.07 0.74L7.39 4.01C7.57 4.26 7.7 4.49 7.79 4.71C7.88 4.92 7.93 5.13 7.93 5.32C7.93 5.56 7.86 5.8 7.72 6.03C7.59 6.26 7.4 6.5 7.16 6.74L6.4 7.53C6.29 7.64 6.24 7.77 6.24 7.93C6.24 8.01 6.25 8.08 6.27 8.16C6.3 8.24 6.33 8.3 6.35 8.36C6.53 8.69 6.84 9.12 7.28 9.64C7.73 10.16 8.21 10.69 8.73 11.22C8.83 11.32 8.94 11.42 9.04 11.52C9.44 11.91 9.45 12.55 9.05 12.95ZM19.97 16.33C19.9687 16.7074 19.8833 17.0798 19.72 17.42C19.55 17.78 19.33 18.12 19.04 18.44C18.55 18.98 18.01 19.37 17.4 19.62C17.39 19.62 17.38 19.63 17.37 19.63C16.78 19.87 16.14 20 15.45 20C14.43 20 13.34 19.76 12.19 19.27C11.04 18.78 9.89 18.12 8.75 17.29C8.36 17 7.97 16.71 7.6 16.4L10.87 13.13C11.15 13.34 11.4 13.5 11.61 13.61C11.66 13.63 11.72 13.66 11.79 13.69C11.87 13.72 11.95 13.73 12.04 13.73C12.21 13.73 12.34 13.67 12.45 13.56L13.21 12.81C13.46 12.56 13.7 12.37 13.93 12.25C14.16 12.11 14.39 12.04 14.64 12.04C14.83 12.04 15.03 12.08 15.25 12.17C15.47 12.26 15.7 12.39 15.95 12.56L19.26 14.91C19.52 15.09 19.7 15.3 19.81 15.55C19.91 15.8 19.97 16.05 19.97 16.33Z" fill="#615EF0"/>
                  </svg>
                Call
              </CallButton>
            </Right>
          </Top>

          <Bottom>
              <MessagesBody>
                    <LoadingComponent>
                        {
                            loading ? "Loading Messages...": ""
                        }
                    </LoadingComponent>
                    {
                      messageData.map((item) => item.me ? 
                        <RightMessageBody  key={item.createdAt}>
                            <RightMessage>
                              {item.message}
                            </RightMessage>
                            <MessageTime>
                              {
                                formatDate(item.createdAt)
                              }
                            </MessageTime>
                        </RightMessageBody> 
                          : 
                        <LeftMessageBody key={item.createdAt}>
                            <LeftMessage>
                              {item.message}
                            </LeftMessage>
                            <MessageTime>
                              {
                                formatDate(item.createdAt)
                              }
                            </MessageTime>
                        </LeftMessageBody>)
                    }
              </MessagesBody>

              <SendMessageBody>
                <LoadingComponent>
                        {
                            messageLoading ? "Sending Message": ""
                        }
                </LoadingComponent>
                <SendMessage handleData={handleData} />
              </SendMessageBody>
          </Bottom>
      </>
    )
}

export default Messages

const Top = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 24px 48px 24px 24px;
`

const Left = styled.div`
    display:flex;
    justify-content: space-between;
    gap: 16px;
`

const UserImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 10px;
`

const Right = styled.div``

const UserName = styled.p`
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%; 
    align-items:center;
    display:flex;
`

const CallButton = styled.div`
    padding: 10px 16px;
    display:flex;
    gap: 8px;
    border-radius: 8px;
    background: var(--primary-10, rgba(97, 94, 240, 0.10));
    color: #615EF0;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%; 
`

const Bottom = styled.div``

const SendMessageBody = styled.div`
    padding: 24px 48px 24px 24px;
`

const MessagesBody = styled.div`
    padding: 24px 48px 24px 24px;
`

const RightMessageBody = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 8px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: end;
`

const LeftMessageBody = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 8px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
`

const RightMessage = styled.p`
    width: fit-content;
    border-radius: 12px;
    background: #615EF0;
    padding: 8px 16px;
    color: #FFF;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; 
`

const LeftMessage = styled.p`
    width: fit-content;
    padding: 8px 16px;
    border-radius: 12px;
    background: #F1F1F1;
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; 
`

const MessageTime = styled.p`
    color: #000;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    opacity: .3;
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