import { apiSlice } from "../api/apiSlice";
import registerUser from "./registerUser";
import userLogin from "./userLogin";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: registerUser(builder),
        login: userLogin(builder),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
