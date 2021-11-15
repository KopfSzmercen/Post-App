import React from "react";
import { useFormik } from "formik";
import {
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import validateAddPost from "./validate";
import sendPost from "./sendPost";
import { useHistory } from "react-router-dom";

export interface addPostValues {
  title: string;
  description: string;
}

const initialValues: addPostValues = {
  title: "",
  description: ""
};

const AddPostForm: React.FC<{ authToken: string }> = (props) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: { ...initialValues },
    validate: validateAddPost,
    onSubmit: async (values: addPostValues) => {
      formik.isSubmitting = true;
      const result = await sendPost(
        props.authToken,
        values.title,
        values.description
      );
      formik.isSubmitting = false;
      if (result.success) history.replace("/mainPage");
      if (result.errors) {
        formik.setErrors({ ...result.errors });
      }
    }
  });

  const disableButton =
    formik.errors.title || formik.errors.description ? true : false;

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
        <Typography variant="h5" sx={{ marginTop: "10px" }}>
          Create a new post
        </Typography>

        <TextField
          variant="outlined"
          label="Title"
          margin="normal"
          fullWidth
          {...formik.getFieldProps("title")}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <TextField
          margin="normal"
          label="Description"
          multiline
          fullWidth
          maxRows={10}
          {...formik.getFieldProps("description")}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <Box sx={{ marginTop: "15px" }}>
          {formik.isSubmitting ? (
            <CircularProgress color="purple" />
          ) : (
            <Button
              variant="contained"
              color="purple"
              endIcon={<AddIcon />}
              disabled={disableButton}
              type="submit"
            >
              Add
            </Button>
          )}
        </Box>
      </Paper>
    </form>
  );
};

export default AddPostForm;
