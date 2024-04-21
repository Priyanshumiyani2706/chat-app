export const getMessages = (data) => {
    return {
        type: "GET_MESSAGES",
        payload: data
    }
}

export const setMessages = (data) => {
    return {
        type: "SET_MESSAGES",
        payload: data
    }
}

export const sendMessage = (data) => {
    return {
        type: "SEND_MESSAGE",
        payload: data
    }
}

export const setReceiver = (data) => {
    return {
        type: "SET_RECEIVER",
        payload: data
    }
}
export const setConvos = (data) => {
    return {
        type: "SET_CONVOS",
        payload: data
    }
}
export const getConvos = (data) => {
    return {
        type: "GET_CONVOS",
        payload: data
    }
}
export const craeteConvos = (data) => {
    return {
        type: "CREATE_CONVOS",
        payload: data
    }
}
export const setConnectedUser = (data) => {
    return {
        type: "SET_CONNECTED_PEOPLE",
        payload: data
    }
}