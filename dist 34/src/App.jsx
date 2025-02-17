import { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Debouncing: оновлює debouncedTerm через 500 мс після останнього введення
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Виконання API-запиту при зміні debouncedTerm
    useEffect(() => {
        if (!debouncedTerm) {
            setResults([]);
            return;
        }

        setLoading(true);
        axios({
            url: "https://openlibrary.org/search.json",
            method: "GET",
            params: { title: debouncedTerm, limit: 10 },
        })
            .then((response) => {
                setResults(response.data.docs.map((book) => book.title) || []);
            })
            .catch((error) => {
                console.error("Помилка запиту:", error);
                setResults([]);
            })
            .finally(() => setLoading(false));
    }, [debouncedTerm]);

    return (
        <Autocomplete
            freeSolo
            options={results}
            loading={loading}
            onInputChange={(_, newValue) => setSearchTerm(newValue)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Пошук книг..."
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
}

export default SearchBar;


