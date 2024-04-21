import React, { useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import './chatArea.css'
import { sendMessage } from '../../Store/messages/message.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../Store/user/user.selector';
import { selectReceiver } from '../../Store/messages/message.selector';
const MessageInput = () => {
    const [message, setMessage] = useState('');
    const receiver = useSelector(selectReceiver);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message && message.length > 0) {
            // send message api
            dispatch(sendMessage({
                senderId: user._id,
                receiverId: receiver.users ?? [receiver.id],
                name: receiver.username,
                message
            }))
            setMessage('')
        }
    }

    return (
        <div className='MessageInputContainer'>
            <form className='formCon' onSubmit={(e) => handleSendMessage(e)}>
                <input
                    type='text'
                    className='messsage'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required />
                <button className='sendMessage' type='submit'><BsFillSendFill />Send</button>
            </form>
        </div>
    )
}

export default MessageInput