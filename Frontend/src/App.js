import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import './App.css';
import Chat from './Routes/Home/Home';
import Register from './Routes/Register/Register';
import { getConvos } from './Store/messages/message.action';
import { setSocket } from './Store/socket/socket.action';
import { getAllUsers, setCustomUser } from './Store/user/user.action';
import { selectUser } from './Store/user/user.selector';

function App() {
  const user = useSelector(selectUser);
  const location = useLocation();
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      //passing the user id
      const socket = io('http://localhost:8080', {
        query: {
          userId: user._id
        }
      });
      // setSocket in redux to use from multiple places
      dispatch(setSocket(socket))
      socket.on('connection ', () => {
        console.log('Socket connected');
        // Close the socket connection after it has been established
        socket.close();
      });
    }
  }, [])

  useEffect(() => {
    // after getting the user 
    if (user) {
      dispatch(getConvos({ userId: user._id }))
      dispatch(getAllUsers({ userId: user._id }))
      dispatch(setCustomUser(null))
    }
  }, [user])


  return (
    <>
      {user ? <Routes>
        <Route path='/' element={<Chat />} />
      </Routes> :
        <Routes>
          <Route path='/register' element={<Register />} />
        </Routes>}
        {/* if user want to redirect in other routes without register so it will redirect to the register page */}
      {!user && location.pathname !== "/register" ? (
        <Navigate
          to={{
            pathname: "/register"
          }}
        />
      ) : user && location.pathname === "/register" ? (
        <Navigate
          to={{
            pathname: "/"
          }}
        />
      ) : null}
    </>
  );
}

export default App;
