import { createSelector } from "@reduxjs/toolkit";

export const selectUserReducer = (state) => state.user;

export const selectUser = createSelector(
    selectUserReducer,
    (user) => user.user
);

export const selectCustomUser = createSelector(
    selectUserReducer,
    (user) => user.customUser
);

export const selectAllUsers = createSelector(
    selectUserReducer,
    (user) => user.users
);