import { createSlice } from "@reduxjs/toolkit";
import filterSearchedProjects from "./filterThunk";

const initialState = {
    searchedProjects: []
};

const filterSlice = createSlice({
    name: "filterSlice",
    initialState,
    reducers: {
        // filterSearchedProjects: (state, action) => {
        //     if (typeof (action.payload) !== "string") return;
        //     if (action.payload === "") {
        //         state.searchedProjects = []
        //     } else {
        //         state.searchedProjects = action.payload
        //     }
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(filterSearchedProjects.fulfilled, (state, action) => {
            state.searchedProjects = action.payload
        })
    }
})

export default filterSlice.reducer;