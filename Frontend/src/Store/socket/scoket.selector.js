import { createSelector } from "@reduxjs/toolkit";

export const selectSocketReducer = (state) => state.socket;

export const selectSocket = createSelector(
    selectSocketReducer,
    (socket) => socket.socket
);
