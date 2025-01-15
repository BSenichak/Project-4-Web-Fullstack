import { Grid2 } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Main() {
  const movies = useSelector(state => state.api.movies)
  return (
    <Grid2 container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
      {movies.map((movie) => (
        <Grid2 xs={12} sm={6} md={4} lg={3} key={movie._id}>
          <img src={movie.poster} alt={movie.title} />
        </Grid2>
      ))}
    </Grid2>
  )
}
