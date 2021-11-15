import React from "react";
import { List } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useHistory, NavLink } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../store/authSlice";
import { RootState } from "../../store/store";
import { BASE_API_URL } from "../..";

const deleteToken = async (authToken: string, refreshToken: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}/logout`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ refreshToken: refreshToken })
    });

    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (error) {
    return { success: false, error };
  }
};

const OptionsList = () => {
  const history = useHistory();
  const pathName = history.location.pathname;
  const dispatch = useDispatch();
  const { messagesNumber, authToken, refreshToken } = useSelector(
    (state: RootState) => {
      return {
        authToken: state.auth.authToken!,
        refreshToken: state.auth.refreshToken!,
        messagesNumber: state.auth.messsages!
      };
    }
  );

  const homeIcon =
    pathName === "/mainPage" ? <HomeIcon color="primary" /> : <HomeIcon />;
  const addIcon =
    pathName === "/addPost" ? <AddCircle color="primary" /> : <AddCircle />;
  const friendsIcon =
    pathName === "/friends" ? <PeopleIcon color="primary" /> : <PeopleIcon />;
  const usersIcon =
    pathName === "/users" ? (
      <AccessibilityNewIcon color="primary" />
    ) : (
      <AccessibilityNewIcon />
    );
  const messagesIcon =
    pathName === "/messages" ? <EmailIcon color="primary" /> : <EmailIcon />;

  const logout = async () => {
    const response = await deleteToken(authToken, refreshToken);
    if (response.success) {
      dispatch(logOutUser);
      history.replace("/login");
    }
  };
  return (
    <List>
      {[
        ["Main page", "/mainPage"],
        ["Friends", "/friends"],
        ["Other users", "/users"],
        ["Add a post", "/addPost"],
        [`Messages: ${messagesNumber}`, "/messages"],
        ["Log out", "/login"]
      ].map((props, index) => (
        <NavLink
          onClick={index === 5 ? logout : () => {}}
          key={props[1]}
          to={props[1]}
          replace
          style={{
            textDecoration: "none",
            color: "inherit"
          }}
        >
          <ListItem button>
            <ListItemIcon key={props[0]}>
              {index === 0 && homeIcon}
              {index === 1 && friendsIcon}
              {index === 2 && usersIcon}
              {index === 3 && addIcon}
              {index === 4 && messagesIcon}
              {index === 5 && <ExitToAppIcon />}
            </ListItemIcon>
            <ListItemText primary={props[0]} />
          </ListItem>
        </NavLink>
      ))}
    </List>
  );
};

export default OptionsList;
