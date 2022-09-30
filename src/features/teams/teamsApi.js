import { toast } from 'react-toastify';
import { apiSlice } from "../api/apiSlice";
import addTeam from "./addTeam";
import updateTeam from "./updateTeam";

export const teamsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: () => ({
                url: `/teams`
            }),
            onQueryStarted: async (arg, { queryFulfilled }) => {
                try {
                    await queryFulfilled
                } catch (err) {
                    toast.error("Network Error!");
                }
            }
        }),
        addTeam: addTeam(builder),
        updateTeam: updateTeam(builder),
    })
})

export const { useGetTeamsQuery, useAddTeamMutation, useUpdateTeamMutation } = teamsApi; 