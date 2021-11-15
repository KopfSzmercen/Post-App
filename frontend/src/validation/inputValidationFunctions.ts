export const isEmail = (value: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};

export const isLength = (value: string, min: number, max?: number) => {
  if (min < 0) return { error: "Invalid minimum value" };
  const valueLength = value.trim().length;

  if (!max) {
    if (valueLength < min) return false;
    else return true;
  } else {
    if (valueLength >= min && valueLength <= max) return true;
  }
  return false;
};
