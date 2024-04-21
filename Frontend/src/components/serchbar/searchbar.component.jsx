import React, { useEffect, useState } from 'react'
import './searchbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers, selectCustomUser, selectUser } from '../../Store/user/user.selector'
import { craeteConvos, getConvos, getMessages, setMessages, setReceiver } from '../../Store/messages/message.action'
import { selectConnectedPeole, selectConvos, selectReceiver } from '../../Store/messages/message.selector';
import { getUserByName } from '../../Store/user/user.action'
import { selectSocket } from '../../Store/socket/scoket.selector'
const Searchbar = () => {
    const customUser = useSelector(selectCustomUser);
    const currentUser = useSelector(selectUser);
    const receiver = useSelector(selectReceiver);
    const conversations = useSelector(selectConvos);
    const socket = useSelector(selectSocket);
    const [findName, setFindName] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [otherUserList, setOtherUserList] = useState([])
    const [selectedUser, setSelectedUser] = useState([])
    const [groupName, setGroupName] = useState([])
    const connectedPeople = useSelector(selectConnectedPeole);
    const allUsers = useSelector(selectAllUsers)
    const dispatch = useDispatch()
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    const handleSearch = () => {
        if (findName) {
            dispatch(getUserByName({ name: findName }))
        }
    }

    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);

    useEffect(() => {
        // set other user list 
        if (allUsers && allUsers.length > 0 && connectedPeople) {
            let otherUsers = [];
            for (const user of allUsers) {
                // if user is already connected with some people than it will not be added in other user list
                if (!connectedPeople.includes(user._id)) {
                    otherUsers.push(user)
                }
            }
            setOtherUserList(otherUsers)
        } else {
            // if user is not connected with any one than it will set all user 
            setOtherUserList(allUsers)
        }
    }, [connectedPeople, allUsers])

    useEffect(() => {
        if (currentUser) {
            // if user want to create a new group than user is in seleceted user
            setSelectedUser([currentUser._id])
        }
    }, [currentUser])

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedUser([]);
        setGroupName('');
    };

    useEffect(() => {
        if (socket) {
            socket.on("newChat", () => {
                dispatch(getConvos({ userId: currentUser._id }));
            })
        }
    }, [socket])

    return (
        <div style={{ display: !matches && receiver ? "none" : "block" }} >
            <div className='SearchbarContainer'>
                <div className='searchArea'>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='SearchField'
                        value={findName}
                        onChange={(e) => setFindName(e.target.value)}
                    />
                    <button className='search-btn'
                        onClick={() => {
                            handleSearch()
                        }}
                    >
                        Search
                    </button>
                </div>
                {/* custome user is the person for whom user is searching */}
                {customUser && (
                    <div className="UserCard" style={{ background: receiver && receiver.id === customUser._id ? "#000" : "#fff", color: receiver && receiver.id === customUser._id ? "#fff" : "#000" }} onClick={() => {
                        // set the receiver person
                        dispatch(setReceiver({ id: customUser._id, username: customUser.username }))
                        //getting those conversations message
                        dispatch(getMessages({ users: [customUser._id, currentUser._id] }))
                    }}>
                        <p className="UserName">{customUser.username}</p>
                    </div>
                )}
                {conversations && conversations.length > 0 ? conversations.map((convo) => {
                    const isGroup = convo && convo.participants.length > 2;
                    let name = convo && convo.name
                    if (!isGroup && !name) {
                        const oppId = convo.participants.find((opp) => opp !== currentUser._id);
                        const findUser = allUsers && allUsers.find((user) => user._id === oppId)
                        name = findUser && findUser.username
                    }
                    return (
                        <div className="UserCard" style={{ background: receiver && receiver.id === convo._id ? "#000" : "#fff", color: receiver && receiver.id === convo._id ? "#fff" : "#000" }} onClick={() => {
                            // set the receiver person or group
                            dispatch(setReceiver({ id: convo._id, users: convo.participants, username: name, isGroup: isGroup || convo.name ? true : false }))
                            // get messages of receiver if it is user than it will pass participant or if it is group than it will pass group name
                            dispatch(getMessages({ [convo.name ? "name" : "users"]: convo[convo.name ? "name" : "participants"] }))
                            dispatch(setMessages([]))
                        }}>
                            <p className="UserName">{name}</p>
                        </div>
                    )
                })
                    : <div className='EmptyBox'>
                        No Other Users Yet
                    </div>}
            </div>
            {/* other user list */}
            <div style={{ margin: "10px" }}>
                <div>User List</div>
                {
                    otherUserList && otherUserList.length > 0 && otherUserList.map((user) => {
                        return (
                            <div className="UserCard" style={{ background: receiver && receiver.id === user._id ? "#000" : "#fff", color: receiver && receiver.id === user._id ? "#fff" : "#000" }} onClick={() => {
                                dispatch(setReceiver({ id: user._id, username: user.username }))
                                dispatch(getMessages({ users: [user._id, currentUser._id] }))
                            }}>
                                <p className="UserName">{user.username}</p>
                            </div>
                        )
                    })
                }
                <button className='create-group'
                    onClick={() => {
                        openModal()
                    }}
                >
                    + Create Group
                </button>
                {
                    isOpen && (
                        <div className="modal">
                            <div className='modal-container'>
                                <span className="close-btn" onClick={closeModal}>X</span>
                                <div>Group Name</div>
                                <input type='text' className='groupName' value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                                <div>User List</div>
                                <div className="modal-content">
                                    {allUsers && allUsers.map((user) => {
                                        const selected = selectedUser.includes(user._id);
                                        return (<div className="UserList" style={{ background: selected ? "#000" : "#fff", color: selected ? "#fff" : "#000" }}
                                            onClick={() => {
                                                if (selected) {
                                                    const removeUser = selectedUser.filter(id => id != user._id);
                                                    setSelectedUser(removeUser)
                                                } else {
                                                    setSelectedUser([...selectedUser, user._id])
                                                }
                                            }}>
                                            <p className="UserName">{user.username}</p>
                                        </div>
                                        )
                                    })}
                                </div>
                                <button className='group-btn' onClick={() => {
                                    if (selectedUser && selectedUser.length > 0 && groupName) {
                                        dispatch(craeteConvos({ users: selectedUser, name: groupName }))
                                        closeModal()
                                    }
                                }}>+ Create Group</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Searchbar