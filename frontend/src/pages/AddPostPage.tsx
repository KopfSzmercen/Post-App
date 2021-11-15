import { Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import MyDrawer from "../components/drawer/MyDrawer";
import AddPostForm from "../components/forms/addPostForm/AddPostForm";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const AddPostPage = () => {
  const history = useHistory();
  const { authToken, isLoggedIn } = useSelector((state: RootState) => {
    return {
      authToken: state.auth.authToken || "",
      isLoggedIn: state.auth.isLoggedIn
    };
  });

  useEffect(() => {
    if (!isLoggedIn || authToken === "") {
      history.replace("/login");
    }
  }, [authToken, isLoggedIn, history]);

  return (
    <>
      <MyDrawer />
      <Container sx={{ marginTop: "70px" }}>
        <AddPostForm authToken={authToken} />
      </Container>
    </>
  );
};

export default AddPostPage;
