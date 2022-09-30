import { toast } from 'react-toastify';
import generateRandomNumber from "../../utils/generateRandomNumber";
import { apiSlice } from "../api/apiSlice";

const onQueryStarted = async (arg, { queryFulfilled, dispatch }) => {
    const tempId = generateRandomNumber();

    const update = dispatch(apiSlice.util.updateQueryData("getTeams", undefined, draft => {
        draft.push({ ...arg, id: tempId, isSyncing: true })
    }));

    try {
        const result = await queryFulfilled;
        dispatch(apiSlice.util.updateQueryData("getTeams", undefined, draft => {
            const selectedProject = draft.find(({ id }) => id === tempId);
            selectedProject.id = result.data.id;
            selectedProject.isSyncing = false;
        }));
    } catch (err) {
        update.undo();
        toast.error("Network Error!");
    }
}

const addTeam = (builder) => {
    return builder.mutation({
        query: (data) => ({
            url: "/teams",
            method: "POST",
            body: data,
        }),
        onQueryStarted,
    })
}

export default addTeam;