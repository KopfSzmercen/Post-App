import React, { useEffect } from "react";
import MyDrawer from "../components/drawer/MyDrawer";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Typography } from "@mui/material";

const NotFound = () => {
  const history = useHistory();
  const { authToken, isLoggedIn } = useSelector((state: RootState) => {
    return {
      authToken: state.auth.authToken || "",
      isLoggedIn: state.auth.isLoggedIn
    };
  });

  useEffect(() => {
    if (!isLoggedIn || authToken === "") {
      console.log("ss");
      history.replace("/login");
    }
  }, [history, authToken, isLoggedIn]);

  return (
    <>
      <MyDrawer />
      <Typography
        variant="h5"
        fontWeight="bold"
        align="center"
        sx={{ marginTop: "50px" }}
      >
        Page not found
      </Typography>
    </>
  );
};

export default NotFound;
