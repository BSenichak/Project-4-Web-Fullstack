import { Route, Routes } from "react-router";
import Movie from "./pages/Movie";
import { useDispatch } from "react-redux";
import { getMovies, searchMovies } from "./store/APIReducer";

function App() {
    let dispatch = useDispatch();
    dispatch(getMovies({ limit: 10, sort: "rating", sortType: "desc" }));
    dispatch(searchMovies({ title: "The" }));
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <header>RoboMovies</header>
            <main style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<h1>Main</h1>} />
                    <Route path="/movie/:id" element={<Movie />} />
                    <Route path="/*" element={<h1>Not Found</h1>} />
                </Routes>
            </main>
            <footer>
                <p>&copy; {new Date().getFullYear()} RoboMovies</p>
            </footer>
        </div>
    );
}

export default App;
