export let accessToken = "";

export const getAccessToken = () => {
  return accessToken;
};
export const setAccessToken = (x: string) => {
  accessToken = x;
};
