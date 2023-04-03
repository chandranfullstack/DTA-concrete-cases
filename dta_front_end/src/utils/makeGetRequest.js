import { appAxios } from "src/api/AppAxios";
const makeGetRequest = async (endpoint, body) => {
  const { data } = await appAxios.get(endpoint, body);
  console.log(endpoint,body,data,"make get request")
  return data;
};

export default makeGetRequest;
