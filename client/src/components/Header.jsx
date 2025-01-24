import * as React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Button, FormControl, Select, MenuItem } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../store/generalReducer";
import { Trans, useTranslation } from "react-i18next";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

export default function SearchAppBar() {
    let theme = useTheme();
    let t = useSelector((state) => state.general.theme);
    let dispatch = useDispatch();
    let { t: translate, i18n } = useTranslation();
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", sm: "block" },
                            fontFamily: theme.typography.title,
                        }}
                    >
                        <Trans>title</Trans>
                    </Typography>
                    <FormControl variant="standard">
                        <Select
                            value={i18n.language}
                            onChange={(e) =>
                                i18n.changeLanguage(e.target.value)
                            }
                        >
                            <MenuItem value={"en"}>English</MenuItem>
                            <MenuItem value={"uk"}>Українська</MenuItem>
                            <MenuItem value={"fr"}>Francais</MenuItem>
                            <MenuItem value={"de"}>Deutsch</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="text"
                        color="inherit"
                        onClick={() =>
                            dispatch(
                                changeTheme(t === "light" ? "dark" : "light")
                            )
                        }
                    >
                        {t === "light" ? <WbSunnyIcon /> : <ModeNightIcon />}
                    </Button>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder={translate("search")}
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
