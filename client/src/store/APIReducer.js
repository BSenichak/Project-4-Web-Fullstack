import server from "../server.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const APIReducer = createSlice({
    name: "API",
    initialState: {
        movies: [],
        movie: {},
        loading: false,
        error: null,

        limit: 12,
        sort: "rating",
        sortType: "ASC",

        offset: 0,

        totalCount: 0,

        searchMovies: [],
        searchLoading: false,
    },
    reducers: {
        changeLimit: (state, action) => {
            state.limit = action.payload;
        },
        changeSort: (state, action) => {
            state.sort = action.payload;
        },
        changeSortType: (state, action) => {
            state.sortType = action.payload;
        },
        resetState: (state) => {
            state.limit = 12;
            state.sort = "rating";
            state.sortType = "ASC";
        },
        changeOffset: (state, action) => {
            state.offset = action.payload * state.limit;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMovies.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = action.payload.movies;
            state.totalCount = action.payload.total;
        });
        builder.addCase(getMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

builder.addCase(searchMovies.pending, (state) => {
    state.searchLoading = true;
});
builder.addCase(searchMovies.fulfilled, (state, action) => {
    state.searchLoading = false;
    state.searchMovies = action.payload;
});
builder.addCase(searchMovies.rejected, (state, action) => {
    state.searchLoading = false;
    state.error = action.error.message;
});

        builder.addCase(getMovieInfo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMovieInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.movie = action.payload;
        });
        builder.addCase(getMovieInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const getMovies = createAsyncThunk("API/getMovies", async (data) => {
    let response = await server({
        url: "/movies",
        method: "GET",
        params: data,
    });
    return response.data;
});

export const searchMovies = createAsyncThunk(
    "API/searchMovies",
    async (data) => {
        let response = await server({
            url: "/search",
            method: "GET",
            params: data,
        });
        return response.data;
    }
);

export const getMovieInfo = createAsyncThunk("API/getMovieInfo", async (id) => {
    let response = await server({
        url: `/movieinfo/${id}`,
        method: "GET",
    });
    return response.data;
});

export const likeMovie = createAsyncThunk(
    "API/likeMovie",
    async (id, { dispatch }) => {
        let response = await server({
            url: `/like/${id}`,
            method: "post",
            withCredentials: true,
        });
        await dispatch(getMovieInfo(id));
        return response.data;
    }
);

export const {
    changeLimit,
    changeSort,
    changeSortType,
    resetState,
    changeOffset,
} = APIReducer.actions;

export default APIReducer.reducer;
