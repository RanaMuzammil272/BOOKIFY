import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addNotifications: (state, { payload }) => {
            if (state.newMessages[payload]) {
                state.newMessages[payload] = state.newMessages[payload] + 1;
            } else {
                state.newMessages[payload] = 1;
            }
        },
        resetNotifications: (state, { payload }) => {
            delete state.newMessages[payload];
        },
        logoutUser: (state) => null,
    },

    extraReducers: (builder) => {
        // save user after signup
        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, { payload }) => payload);
        // save user after login
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => payload);
        // logout: destroy user session
        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, (state, action) => null);
    },
});
export const logout = () => (dispatch) => {
    console.log("Logging out...");
    // Clear user information from local storage
    localStorage.removeItem("userinfo");
    console.log("Userinfo removed from local storage.");
    // Dispatch logout action to Redux store
    dispatch(logoutUser());
    console.log("Logout action dispatched.");
};

export const { logoutUser } = userSlice.actions;
export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;
