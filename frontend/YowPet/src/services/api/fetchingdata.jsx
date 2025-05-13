import { useState } from "react";
import { axiosClient } from './clienteAxios'; // Import the axiosClient instance.

export const useRequest = () => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestData = async (method, endpoint, body = null) => {
    setLoading(true);
    try {
      console.log("Sending request to:", `${endpoint}`);
      console.log("Body being sent:", body); // Ensure the body is correct

      // Axios options
      const axiosOptions = {
        method,  // GET, POST, PUT, DELETE
        url: endpoint,
        headers: {
          "Content-Type": "application/json",  // Ensure the right content type
        },
      };

      // If it's a POST or PUT request, include the body
      if (method !== "GET" && body) {
        axiosOptions.data = body;
      }

      // Make the Axios request
      const response = await axiosClient(axiosOptions);
      console.log("Response data:", response);

      setResponseData(response);
    } catch (err) {
      setLoading(false);
      setError(err.response ? err.response.data : err.message); // Handle error properly
      console.error("Error:", err.message || err.response);
    } finally {
      setLoading(false);
    }
  };

  return { requestData, responseData, loading, error };
};
