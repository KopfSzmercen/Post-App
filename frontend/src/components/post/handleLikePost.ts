import { BASE_API_URL } from "../..";

interface handleLikeResponse {
  success: boolean;
  newLikesNumber?: number;
  error?: any;
}

const handleLikePost = async (
  postId: string,
  action: string,
  authToken: string
): Promise<handleLikeResponse> => {
  const fetchUrl = `${BASE_API_URL}/posts/?postId=${postId}&action=${action}`;
  try {
    const response = await fetch(fetchUrl, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${authToken}`
      }
    });

    if (response.status === 403) {
      return { success: false, error: 403 };
    }

    const parsedResponse = await response.json();
    return { success: true, ...parsedResponse };
  } catch (error) {
    return { success: false, error };
  }
};

export default handleLikePost;
