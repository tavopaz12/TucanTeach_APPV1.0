import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_DEV}`;

const loginUser = async (URL, body) => {
  try {
    const res = await axios.post(`${BASE_URL}${URL}`, body);

    return res;
  } catch (error) {
    return error;
  }
};

export default { loginUser };
