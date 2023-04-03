import { getTokenFromStorage } from "src/utils/tokenHandler";
import axios from "axios";
import getHostAPIUrl from "src/appConfig";

const isUserAuthenticated = async () => {
  const token = getTokenFromStorage();
  console.log(token,"tomen  form storage")
  let response;
  response = axios.get(getHostAPIUrl() + "abc", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return response;
};

export default isUserAuthenticated;
