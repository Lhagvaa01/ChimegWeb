import axios from "axios";
import { APIURL } from "../context/SampleContext";

const authToken = "token 218d68b6dfe280a288a396352f7d720a18a00997";

// let APIURL = "invoice.kacc.mn";
let APIURL2 = "127.0.0.1:8000";

const checkUrl = (url) => {
  if (url.toLowerCase().includes("undefined")) {
    return false;
  } else {
    return true;
  }
};
export function PostApi(url, body) {
  if (checkUrl(url)) {
    return axios
      .post(`https://${APIURL}/${url}`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      })
      .then((response) => {
        // console.log("API Response:", response.data);
        return response.data; // Return the response data
      })
      .catch((error) => {
        console.error("There was a problem with the POST request:", error);
        if (error.response) {
          // console.log("Response data:", error.response.data);
          // console.log("Response status:", error.response.status);
        } else if (error.request) {
          console.log("Request:", error.request);
        } else {
          console.log("Error:", error.message);
        }
        throw error.response.data.dtl; // Re-throw the error to handle it outside
      });
  } else {
    console.log(url);
    return Promise.reject(new Error("Invalid URL"));
  }
}

export function PostApi2(url, body) {
  if (checkUrl(url)) {
    return axios
      .post(`https://${APIURL}/${url}`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken, // Ensure authToken is defined and contains the correct value
        },
      })
      .then((response) => {
        // console.log("API Response:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("There was a problem with the POST request:", error);
        if (error.response) {
          // console.log("Response data:", error.response.data);
          // console.log("Response status:", error.response.status);
        } else if (error.request) {
          console.log("Request:", error.request);
        } else {
          console.log("Error:", error.message);
        }
        throw error; // Re-throw the error for handling outside this function
      });
  } else {
    console.log(url);
    return Promise.reject(new Error("Invalid URL"));
  }
}

export function PutApi(url, body) {
  if (checkUrl(url)) {
    return axios
      .put(`https://${APIURL}/${url}`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      })
      .then((response) => {
        // console.log("API Response:", response.data);
        return response.data; // Return the response data
      })
      .catch((error) => {
        console.error("There was a problem with the POST request:", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
        } else if (error.request) {
          console.log("Request:", error.request);
        } else {
          console.log("Error:", error.message);
        }
        throw error; // Re-throw the error to handle it outside
      });
  } else {
    console.log(url);
    return Promise.reject(new Error("Invalid URL"));
  }
}

export function GetApi(url) {
  if (checkUrl(url)) {
    return axios
      .get(`https://${APIURL}/${url}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((response) => {
        // console.log("API Response:", response.data);
        return response.data; // Return the response data
      })
      .catch((error) => {
        console.error("There was a problem with the GET request:", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
        } else if (error.request) {
          console.log("Request:", error.request);
        } else {
          console.log("Error:", error.message);
        }
        throw error;
      });
  } else {
    console.log(url);
    return Promise.reject(new Error("Invalid URL"));
  }
}

export function GetApi2(url) {
  if (checkUrl(url)) {
    return axios
      .get(`https://${APIURL}/${url}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((response) => {
        // console.log("API Response:", response.data);
        return response.data; // Return the response data
      })
      .catch((error) => {
        console.error("There was a problem with the GET request:", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
        } else if (error.request) {
          console.log("Request:", error.request);
        } else {
          console.log("Error:", error.message);
        }
        throw error;
      });
  } else {
    console.log(url);
    return Promise.reject(new Error("Invalid URL"));
  }
}
