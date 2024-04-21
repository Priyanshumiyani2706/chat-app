import { createSelector } from "@reduxjs/toolkit";

export const selectMessageReducer = (state) => state.messages;

export const selectMessages = createSelector(
    selectMessageReducer,
    (messages) => messages.messages
);

export const selectReceiver = createSelector(
    selectMessageReducer,
    (messages) => messages.receiver
);
export const selectConvos = createSelector(
    selectMessageReducer,
    (messages) => messages.convos
);
export const selectConnectedPeole = createSelector(
    selectMessageReducer,
    (messages) => messages.connectedPeople
);