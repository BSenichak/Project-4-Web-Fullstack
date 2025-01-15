import { Route, Routes } from "react-router";
import Movie from "./pages/Movie";
import { useDispatch } from "react-redux";
import { getMovies, searchMovies } from "./store/APIReducer";
import SearchAppBar from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "@mui/material";
import Main from "./pages/Main";

function App() {
    let dispatch = useDispatch();
    dispatch(getMovies({ limit: 10, sort: "rating", sortType: "desc" }));
    // dispatch(searchMovies({ title: "The" }));
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <SearchAppBar />
            <Container sx={{ flexGrow: 1 }}>
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path="/movie/:id" element={<Movie />} />
                    <Route path="/*" element={<h1>Not Found</h1>} />
                </Routes>
            </Container>
            <Footer />
        </div>
    );
}

export default App;
