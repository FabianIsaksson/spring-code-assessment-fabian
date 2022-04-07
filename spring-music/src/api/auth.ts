import Cookies from "universal-cookie";

export const userIsAuthenticated = () => {
  const cookies = new Cookies();
  if (cookies.get("access_token")) {
    return true;
  } else {
    console.log("User is not signed in");
    return false;
  }
};
