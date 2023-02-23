import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_DEV}/sesiones`;

export async function getSesiones() {
  try {
    const res = await axios({
      url: BASE_URL,
      method: "GET",
    });

    return res;
  } catch (err) {
    console.log(err);
  }
}
