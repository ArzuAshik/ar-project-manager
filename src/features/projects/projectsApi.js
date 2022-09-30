import { toast } from 'react-toastify';
import { apiSlice } from "../api/apiSlice";
import addProject from "./addProject";
import deleteProject from "./deleteProject";
import updateProject from "./updateProject";

export const projectsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: (email) => ({
                url: `/projects`
            }),
            onQueryStarted: async (arg, { queryFulfilled }) => {
                try {
                    await queryFulfilled
                } catch (err) {
                    toast.error("Network Error!");
                }
            }
        }),
        addProject: addProject(builder),
        updateProject: updateProject(builder),
        deleteProject: deleteProject(builder),
    })
})

export const { useGetProjectsQuery, useUpdateProjectMutation, useAddProjectMutation, useDeleteProjectMutation } = projectsApi; 