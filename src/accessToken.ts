export let accessToken = "";

export const getAccessToken = () => {
  console.log("Getting AT: ", accessToken);
  return accessToken;
};
export const setAccessToken = (x: string) => {
  console.log("Setting AT: ", x);
  accessToken = x;
};
