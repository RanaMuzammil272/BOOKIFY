import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// define a service user a base URL

const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
    }),

    endpoints: (builder) => ({
        
        signupUser: builder.mutation({
            query: (user) => ({
                url: "/api/user/",
                method: "POST",
                body: user,
            }),
        }),

        
        loginUser: builder.mutation({
            query: (user) => ({
                url: "/api/user/login",
                method: "POST",
                body: user,
            }),
        }),

       

        logoutUser: builder.mutation({
            query: (payload) => ({
                url: "/api/user/logout",
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation } = appApi;

export default appApi;
