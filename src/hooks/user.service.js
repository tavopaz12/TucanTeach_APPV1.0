import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_DEV}/users`;

export async function getUser() {
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

export async function getUserById(id) {
  try {
    const res = await axios({
      url: `${BASE_URL}/${id}`,
      method: "GET",
    });

    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function postUser(body) {
  try {
    const formData = new FormData();
    formData.append("name", body.name);

    const res = await axios({
      url: BASE_URL,
      method: "POST",
      data: formData,
    });

    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function updateUser(id, changes) {
  try {
    const res = await axios({
      url: `${BASE_URL}/${id}`,
      method: "PATCH",
      data: changes,
    });

    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteUser(id) {
  try {
    const res = await axios({
      url: `${BASE_URL}/${id}`,
      method: "DELETE",
    });

    return res;
  } catch (err) {
    console.log(err);
  }
}
