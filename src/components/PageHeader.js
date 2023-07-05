import React from "react";
import useStyles from "./layoutStyles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 100,
  width: "400px !important",
  [theme.breakpoints.up("sm")]: {
    marginLeft: 100,
    width: "auto",
  },
  borderRadius: 5,
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    visibility: "hidden",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  width: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const PageHeader = (props) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.pageHeaderContainer}>
      {props.showBack && (
        <ArrowBackIcon fontSize="small" onClick={() => navigate(-1)} />
      )}
      <div className={classes.pageHeader}>{props.title}</div>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          className={classes.searchBox}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <div className={classes.filterContainer}>
        <TuneIcon fontSize="small" color="default" />
        Filter
      </div>
    </div>
  );
};
