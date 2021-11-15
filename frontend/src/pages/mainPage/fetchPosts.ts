import { BASE_API_URL } from "../..";

export interface post {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
  creatorName: string;
  likes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface fetchResponse {
  success: boolean;
  posts?: post[];
  authToken?: string;
  refreshToken?: string;
  status?: number;
}

const fetchPosts = async (authToken: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    const parsedResponse: fetchResponse = await response.json();
    return { ...parsedResponse, status: response.status };
  } catch (error) {
    return { success: false, posts: [], status: 403 };
  }
};

export default fetchPosts;
