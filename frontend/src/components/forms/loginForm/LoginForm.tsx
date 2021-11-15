import React from "react";
import {
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  CircularProgress
} from "@mui/material";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import validateLoginForm from "./validation";
import submitLoginForm from "./submitLogin";

import { useAppDispatch } from "../../../store/stateHooks";

import { useHistory } from "react-router-dom";
import { logInUser } from "../../../store/authSlice";

export interface loginFormValues {
  email: string;
  password: string;
}
const initialValues: loginFormValues = {
  email: "",
  password: ""
};

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: { ...initialValues },
    validate: validateLoginForm,
    onSubmit: async (values: loginFormValues) => {
      formik.isSubmitting = true;
      const fetchResult = await submitLoginForm(values);

      if (fetchResult.success) {
        dispatch(
          logInUser({
            authToken: fetchResult.authToken!,
            refreshToken: fetchResult.refreshToken!,
            username: fetchResult.username!,
            userId: fetchResult.userId!,
            messages: fetchResult.messagesNumber || 0
          })
        );
        history.replace("/mainPage");
      } else {
        formik.setErrors({ ...fetchResult });
      }
      formik.isSubmitting = false;
    }
  });

  const disableButton =
    formik.errors.email || formik.errors.password ? true : false;
  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper
        sx={{
          display: "grid",
          placeItems: "center",
          maxWidth: "450px",
          margin: "30px auto",
          padding: "30px",
          backgroundColor: "#fafafa"
        }}
        elevation={4}
      >
        <Typography variant="h4" sx={{ marginTop: "10px" }}>
          Log in
        </Typography>

        <TextField
          variant="outlined"
          label="Email"
          margin="normal"
          type={"email"}
          fullWidth
          {...formik.getFieldProps("email")}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          variant="outlined"
          label="Password"
          margin="normal"
          fullWidth
          type={"password"}
          autoComplete="off"
          {...formik.getFieldProps("password")}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Box sx={{ m: "15px 0 0 0", textAlign: "center" }}>
          <Typography>You don't have an account?</Typography>
          <Typography variant="h6">
            <Link to="/">Register</Link>
          </Typography>
        </Box>

        <Box sx={{ height: "60px" }}>
          {formik.isSubmitting ? (
            <CircularProgress color="purple" sx={{ marginTop: "15px" }} />
          ) : (
            <Button
              variant="contained"
              size="large"
              sx={{ marginTop: "20px" }}
              color="purple"
              disabled={disableButton}
              type="submit"
            >
              Log in
            </Button>
          )}
        </Box>
      </Paper>
    </form>
  );
};

export default LoginForm;
