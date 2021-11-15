import {
  Button,
  Paper,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Alert
} from "@mui/material";
import { useFormik } from "formik";
import { submitRegisterForm } from "./submitRegisterForm";
import { Link } from "react-router-dom";

import registerFormValidationFunction from "./validation";
import { useState } from "react";

export interface registerFormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
const initialValues: registerFormValues = {
  email: "",
  username: "",
  password: "",
  confirmPassword: ""
};

const RegisterForm: React.FC<{}> = () => {
  const [successfulRegister, setSuccessfullRegister] = useState(false);
  const formik = useFormik({
    initialValues: { ...initialValues },
    validate: registerFormValidationFunction,
    onSubmit: async (values: registerFormValues) => {
      formik.isSubmitting = true;
      setSuccessfullRegister(false);
      const fetchResult = await submitRegisterForm(values);
      formik.isSubmitting = false;
      if (fetchResult === true) {
        setSuccessfullRegister(true);
      } else if (fetchResult === false) console.log(fetchResult);
      else {
        formik.setErrors({ ...fetchResult });
      }
    }
  });

  const disableButton =
    formik.errors.email ||
    formik.errors.username ||
    formik.errors.password ||
    formik.errors.confirmPassword
      ? true
      : false;

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
        elevation={3}
      >
        <Typography variant="h4" sx={{ marginTop: "10px" }}>
          Register
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
          label="Username"
          margin="normal"
          fullWidth
          {...formik.getFieldProps("username")}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
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

        <TextField
          variant="outlined"
          label="Confirm password"
          margin="normal"
          fullWidth
          type={"password"}
          autoComplete="off"
          {...formik.getFieldProps("confirmPassword")}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />

        <Box sx={{ m: "15px 0 0 0", textAlign: "center" }}>
          <Typography>Do you already have an account?</Typography>
          <Typography variant="h6">
            <Link to="/login">Log in</Link>
          </Typography>
          {successfulRegister && (
            <Alert severity="success" sx={{ marginTop: "10px" }}>
              Registering successfull
            </Alert>
          )}
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
              Register
            </Button>
          )}
        </Box>
      </Paper>
    </form>
  );
};

export default RegisterForm;
