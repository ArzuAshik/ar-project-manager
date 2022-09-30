import { apiSlice } from "../api/apiSlice";

const onQueryStarted = async (projectId, { queryFulfilled, dispatch }) => {
    const update = dispatch(apiSlice.util.updateQueryData("getProjects", undefined, draft => {
        return draft.filter(({ id }) => id !== projectId);
    }));

    try {
        await queryFulfilled;
        // do nothing
    } catch (err) {
        update.undo();
    }
}

const deleteProject = (builder) => {
    return builder.mutation({
        query: (id) => ({
            url: `/projects/${id}`,
            method: "DELETE",
        }),
        onQueryStarted,
    })
}

export default deleteProject;