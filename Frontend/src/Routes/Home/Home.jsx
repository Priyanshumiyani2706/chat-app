import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../Store/user/user.selector';
import './Home.css';
import { logOut } from '../../Store/user/user.action';
import { useNavigate } from 'react-router-dom';
import Searchbar from '../../components/serchbar/searchbar.component';
import ChatArea from '../../components/chatArea/chatArea.component';

const Home = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className='Container'>
            <div className='Header'>
                <div>
                    <span className="HeaderName">{user.username}</span>
                </div>
                <div className="HeaderRight">
                    <button className="HeaderLogout" onClick={() => {
                        dispatch(logOut())
                        navigate('/register')
                    }}>Logout</button>
                </div>
            </div>
            <div className='MainContainer'>
                <Searchbar />
                <ChatArea />
            </div>

        </div>
    )
}

export default Home;