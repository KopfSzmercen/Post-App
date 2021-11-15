import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MyDrawer from "../components/drawer/MyDrawer";
import NewMessageForm from "../components/forms/newMessageForm/NewMessageForm";
import { RootState } from "../store/store";

const NewMessage = () => {
  const history = useHistory();
  const { authToken, isLoggedIn } = useSelector((state: RootState) => {
    return {
      authToken: state.auth.authToken || "",
      isLoggedIn: state.auth.isLoggedIn
    };
  });
  const receiverId = history.location.pathname.split("/")[2];

  useEffect(() => {
    if (!isLoggedIn || authToken === "") {
      history.replace("/login");
    }
  }, [authToken, isLoggedIn, history]);

  return (
    <>
      <MyDrawer />
      <Box sx={{ marginTop: "60px" }}>
        <NewMessageForm receiverId={receiverId} authToken={authToken} />
      </Box>
    </>
  );
};

export default NewMessage;
