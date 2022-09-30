import { toast } from 'react-toastify';
import { apiSlice } from "../api/apiSlice";

const onQueryStarted = async (arg, { queryFulfilled, dispatch }) => {
    const update = dispatch(apiSlice.util.updateQueryData("getTeams", undefined, draft => {
        const selectedProject = draft.find(({ id }) => id === arg.id);
        Object.assign(selectedProject, { ...arg, isSyncing: true });
    }));
    try {
        await queryFulfilled;

        dispatch(apiSlice.util.updateQueryData("getTeams", undefined, draft => {
            const selectedProject = draft.find(({ id }) => id === arg.id);
            selectedProject.isSyncing = false;
        }));

    } catch (err) {
        update.undo();
        toast.error("Network Error!");
    }
}

const updateTeam = (builder) => {
    return builder.mutation({
        query: ({ id, ...data }) => ({
            url: `/teams/${id}`,
            method: "PUT",
            body: data,
        }),
        onQueryStarted,
    })
}

export default updateTeam;