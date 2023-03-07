import axios from "axios";
import validateUrl from "./config";

const baseURL = validateUrl();

export async function getCursos() {
  try {
    const res = await axios({
      url: `${baseURL}/cursos`,
      method: "GET",
    });

    return res;
  } catch (err) {
    console.log(err);
  }
}
