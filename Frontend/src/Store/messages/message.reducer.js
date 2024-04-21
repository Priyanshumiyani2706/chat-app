
const initialState = {
    messages: [],
    receiver: null,
    convos: [],
    connectedPeople: []
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_MESSAGES":
            return { ...state, messages: action.payload };
        case "SET_RECEIVER":
            return { ...state, receiver: action.payload };
        case "SET_CONVOS":
            return { ...state, convos: action.payload }
        case "SET_CONNECTED_PEOPLE":
            return {
                ...state, connectedPeople: action.payload
            }
        default:
            return state;
    }
};

export default messageReducer;
