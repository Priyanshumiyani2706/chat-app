import axios from "axios";
import { all, call, put, takeLatest } from "typed-redux-saga";
import { getMessages, setConnectedUser, setConvos, setMessages } from "./message.action";

export function* getUserMessages(userDetail) {
    try {
        const { data } = yield axios.post(`http://localhost:8080/messages`, userDetail.payload);
        yield* put(setMessages(data))
    } catch (error) {
        console.log("error", error.message);
    }
}

export function* sendMessage(user) {
    try {
        const { data } = yield axios.post(`http://localhost:8080/messages/send`, user.payload);
        yield* put(getMessages(data))
    } catch (error) {
        console.log("error", error.message);
    }
}

export function* getUserConvo(userDetail) {

    try {
        const { data: { conversation, connectedPeople } } = yield axios.post(`http://localhost:8080/messages/getConvo`, userDetail.payload);
        yield* put(setConvos(conversation))
        yield* put(setConnectedUser(connectedPeople))
    } catch (error) {
        console.log("error", error.message);
    }
}

export function* createUserConvo(userDetail) {
    try {
        const { data } = yield axios.post(`http://localhost:8080/messages/createConvo`, userDetail.payload);
        yield* put(setConvos(data))
    } catch (error) {
        console.log("error", error.message);
    }
}

function* onGetMessages() {
    yield* takeLatest("GET_MESSAGES", getUserMessages);
}

function* onSendMessages() {
    yield* takeLatest("SEND_MESSAGE", sendMessage);
}
function* onGetConvos() {
    yield* takeLatest("GET_CONVOS", getUserConvo);
}
function* onCreateConvos() {
    yield* takeLatest("CREATE_CONVOS", createUserConvo);
}


export function* messageSagas() {
    yield* all([
        call(onGetMessages),
        call(onSendMessages),
        call(onGetConvos),
        call(onCreateConvos)
    ]);
}