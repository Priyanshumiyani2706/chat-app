
const initialState = {
    user: null,
    users: null,
    customUser: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        case "SET_CUSTOM_USER":
            return { ...state, customUser: action.payload };
        case "SET_ALL_USERS":
            return { ...state, users: action.payload };
        default:
            return state;
    }

};

export default userReducer;
