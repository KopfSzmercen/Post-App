import User from "./index";

const hasTheSameData = async (path: string, value: string) => {
  const query: any = {};
  query[path] = value;
  try {
    const user = await User.findOne(query);
    if (user) return true;
    return false;
  } catch (error) {
    return error;
  }
};

export default hasTheSameData;
