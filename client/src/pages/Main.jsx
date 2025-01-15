import { CircularProgress, Grid2, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from "../store/APIReducer";
import { Link } from "react-router";
import { Paper } from "@mui/material";

export default function Main() {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMovies({ limit: 10, sort: "rating", sortType: "desc" }));
    }, []);
    const movies = useSelector((state) => state.api.movies);
    let isLoading = useSelector((state) => state.api.loading);
    return (
        <Grid2 container spacing={2} sx={{ padding: "10px" }}>
            {isLoading ? (
                <Grid2
                    size={{ xs: 12, sm: 12, md: 12 }}
                    sx={{ textAlign: "center", padding: "10px" }}
                >
                    <CircularProgress size={100} />
                </Grid2>
            ) : (
                movies.map((movie, index) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Link
                            to={`/movie/${movie.id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <Paper sx={{ padding: "10px" }}>
                                <img
                                    style={{ width: "100%" }}
                                    src={
                                        "http://localhost:3000/posters/" +
                                        movie.poster_url
                                    }
                                    alt={movie.title}
                                />
                                <Typography variant="h6">
                                    {movie.title}
                                </Typography>
                                <Typography variant="body2">
                                    {new Date(movie.release_data).getFullYear()}
                                </Typography>
                            </Paper>
                        </Link>
                    </Grid2>
                ))
            )}
        </Grid2>
    );
}
