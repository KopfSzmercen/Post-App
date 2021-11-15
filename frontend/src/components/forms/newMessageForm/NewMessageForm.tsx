import {
  Paper,
  TextField,
  Typography,
  Box,
  Button,
  CircularProgress
} from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import sendMessage from "./sendMessage";
import { useHistory } from "react-router-dom";

interface formValues {
  text: string;
}

const initialValues = {
  text: ""
};

const NewMessageForm: React.FC<{
  receiverId: string;
  authToken: string;
}> = (props) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: { ...initialValues },
    validate: (values: formValues) => {
      if (values.text.length < 5)
        return {
          text: "Message has to be at least 5 characters long"
        };
    },
    onSubmit: async (values: formValues) => {
      formik.isSubmitting = true;
      const result = await sendMessage(
        props.authToken,
        props.receiverId,
        values.text
      );
      formik.isSubmitting = false;
      if (result.success) {
        history.replace("/friends");
      } else {
        console.log(result.error);
      }
    }
  });

  const buttonDisabled = formik.errors.text ? true : false;

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
        <Typography variant="h5">Send a new message</Typography>
        <TextField
          variant="outlined"
          fullWidth
          label="Text"
          margin="normal"
          {...formik.getFieldProps("text")}
          error={formik.touched.text && Boolean(formik.errors.text)}
          helperText={formik.touched.text && formik.errors.text}
          multiline
          maxRows={12}
          minRows={4}
        />

        <Box sx={{ marginTop: "25px" }}>
          {formik.isSubmitting ? (
            <CircularProgress color="purple" />
          ) : (
            <Button
              variant="contained"
              color="purple"
              endIcon={<SendIcon />}
              disabled={buttonDisabled}
              type="submit"
            >
              Send
            </Button>
          )}
        </Box>
      </Paper>
    </form>
  );
};

export default NewMessageForm;
