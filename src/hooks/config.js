export default function validateUrl() {
  if (process.env.NODE_ENV === "production") {
    return process.env.REACT_APP_API_PROD;
  }

  if (process.env.NODE_ENV === "development") {
    return process.env.REACT_APP_API_DEV;
  }
}
