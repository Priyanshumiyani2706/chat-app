import React from 'react'
import './chatArea.css'
import MessageInput from './messageInput'
import Messages from './messages'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { selectReceiver } from '../../Store/messages/message.selector';
import { selectUser } from '../../Store/user/user.selector'
import { setReceiver } from '../../Store/messages/message.action'

const ChatArea = () => {
    const receiver = useSelector(selectReceiver);
    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();

    return (
        <div className='ChatAreaContainer'>
            {receiver ? <div>
                <div className='ReceiverNameContainer'>
                    {/* if user want to close the chat tha it will set null in the receiver  */}
                    <IoIosArrowRoundBack size='26px' onClick={() => {
                        dispatch(setReceiver(null))
                    }} />
                    <div className='ReceiverName'>{receiver && receiver.username}</div>
                </div>
                <div className='MessageInput'>
                    <Messages />
                    <MessageInput />
                </div> </div> :
                <div className="current-user-card">
                    <h2 className="username">{currentUser.username}</h2>
                    <p className="slogan">Text someone</p>
                </div>}
        </div>
    )
}

export default ChatArea