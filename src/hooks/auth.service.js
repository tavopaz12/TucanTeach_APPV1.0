import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_DEV}/auth`;

export async function login(body) {
  try {
    const res = await axios({
      url: `${BASE_URL}/login`,
      method: "POST",
      data: body,
    });

    return res;
  } catch (err) {
    return err;
  }
}

export async function recovery(email) {
  try {
    const res = await axios({
      url: `${BASE_URL}/recovery`,
      method: "POST",
      data: email,
    });

    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function changePassword(body) {
  try {
    const res = await axios({
      url: `${BASE_URL}/change-password`,
      method: "POST",
      data: body,
    });

    return res;
  } catch (err) {
    console.log(err);
  }
}
