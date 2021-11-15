import { BASE_API_URL } from "../../..";

interface sendingResponse {
  success: boolean;
  errors?: {
    [key: string]: string;
  };
}

const sendPost = async (
  authToken: string,
  postTitle: string,
  postText: string
) => {
  const result: sendingResponse = { success: true };
  const payload = JSON.stringify({
    title: postTitle,
    description: postText
  });

  try {
    const response = await fetch(`${BASE_API_URL}/addPost`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      body: payload
    });
    const parsedResponse = await response.json();

    return parsedResponse;
  } catch (error) {
    const err = error as { [key: string]: string };
    result.success = false;
    result.errors = err;
  }
};

export default sendPost;
