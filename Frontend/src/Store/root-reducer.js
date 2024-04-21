import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import messageReducer from './messages/message.reducer';
import socketReducer from './socket/socket.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    messages: messageReducer,
    socket: socketReducer
});
