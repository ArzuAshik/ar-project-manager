import { toast } from 'react-toastify';
import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: searchParam => ({
                url: `/users?name_like=${searchParam}&email_like=${searchParam}`
            }),
            onQueryStarted: async (arg, { queryFulfilled }) => {
                try {
                    await queryFulfilled
                } catch (err) {
                    toast.error("Network Error!");
                }
            }
        }),
    })
})

export const { useGetUsersQuery } = usersApi; 