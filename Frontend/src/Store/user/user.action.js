export const registerUser = (data) => {
    return {
        type: "REGISTER",
        payload: data
    }
}

export const setUser = (data) => {
    return {
        type: "SET_USER",
        payload: data
    }
}

export const setCustomUser = (data) => {
    return {
        type: "SET_CUSTOM_USER",
        payload: data
    }
}

export const getUserByName = (data) => {
    return {
        type: "GET_USER_BY_NAME",
        payload: data
    }
}
export const getAllUsers = (data) => {
    return {
        type: "GET_ALL_USERS",
        payload: data
    }
}
export const setAllUsers = (data) => {
    return {
        type: "SET_ALL_USERS",
        payload: data
    }
}

export const logOut = () => {
    return {
        type: "LOGOUT",
    }
}