import { toast } from 'react-toastify';
import { apiSlice } from "../api/apiSlice";

const onQueryStarted = async (arg, { queryFulfilled, dispatch }) => {
    const update = dispatch(apiSlice.util.updateQueryData("getProjects", undefined, draft => {
        const selectedProject = draft.find(({ id }) => id === arg.id);
        selectedProject.status = arg.status;
        selectedProject.isSyncing = true;
    }));

    try {
        await queryFulfilled;
        dispatch(apiSlice.util.updateQueryData("getProjects", undefined, draft => {
            const selectedProject = draft.find(({ id }) => id === arg.id);
            selectedProject.isSyncing = false;
        }));

    } catch (err) {
        update.undo();
        toast.error("Network Error!");
    }
}

const updateProject = (builder) => {
    return builder.mutation({
        query: ({ id, ...data }) => ({
            url: `/projects/${id}`,
            method: "PUT",
            body: data,
        }),
        onQueryStarted,
    })
}

export default updateProject;