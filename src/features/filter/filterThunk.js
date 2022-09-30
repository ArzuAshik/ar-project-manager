import { createAsyncThunk } from "@reduxjs/toolkit";

const filterSearchedProjects = createAsyncThunk("filter/filterSearchedProjects", async (searchQuery, thunkAPI) => {
    if (searchQuery === "") return [];
    const { api: { queries } } = thunkAPI.getState()
    const projects = queries["getProjects(undefined)"]?.data || []
    const filteredProjects = projects.filter(({ title = "", description }) => {
        return title.toLowerCase().includes(searchQuery.toLowerCase()) || description.toLowerCase().includes(searchQuery.toLowerCase())
    });
    return filteredProjects.map(({ id }) => id);
})

export default filterSearchedProjects;