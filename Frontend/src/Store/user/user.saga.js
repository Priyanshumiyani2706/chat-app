import axios from "axios";
import { all, call, put, takeLatest } from "typed-redux-saga";
import { setAllUsers, setCustomUser, setUser } from "./user.action";

export function* register(userDetail) {

    try {
        console.log("register", userDetail.payload)
        const { data: { success, data } } = yield axios.post(`http://localhost:8080/user/register`, userDetail.payload);
        if (success) {
            yield* put(setUser(data))
        }
    } catch (error) {
        console.log("error", error.message);
    }
}

export function* getUsers(user) {

    try {
        let { data } = yield axios.post(`http://localhost:8080/user/getUser`, user.payload);
        yield* put(setCustomUser(data))
    } catch (error) {
        console.log("error", error.message);
    }
}
export function* getAllUsers(user) {

    try {
        let { data } = yield axios.post(`http://localhost:8080/user/getAllUser`, user.payload);
        yield* put(setAllUsers(data))
    } catch (error) {
        console.log("error", error.message);
    }
}


function* onRegister() {
    yield* takeLatest("REGISTER", register);
}

function* onGetUsers() {
    yield* takeLatest("GET_USER_BY_NAME", getUsers);
}
function* onAllGetUsers() {
    yield* takeLatest("GET_ALL_USERS", getAllUsers);
}


export function* userSagas() {
    yield* all([
        call(onRegister),
        call(onGetUsers),
        call(onAllGetUsers)
    ]);
}