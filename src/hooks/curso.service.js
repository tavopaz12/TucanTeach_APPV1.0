import axios from "axios";

const BASE_URL = "https://tavopaz12.ml/api/v1/cursos";

export async function getCursos() {
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
