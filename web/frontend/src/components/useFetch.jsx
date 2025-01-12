// useFetch.js
import { useState, useRef } from "react";
import axios from "axios";

export const useFetch = () => {
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const controllerRef = useRef(null);
  
    const fetchData = async (url, method = 'GET', body = null) => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
  
      const newController = new AbortController();
      controllerRef.current = newController;
  
      try {
        setLoading(true);
        const config = {
          method,  
          url: `http://localhost:5000${url}`,      
          headers: {
            'Content-Type': 'application/json',
          },
          signal: newController.signal, 
        };
  
        if (method === 'POST' || method === 'PUT') {
          config.data = body;  
        }
  
        const res = await axios(config);
        console.log(res);
  
        if (res.data.status !== "success") {
          setError(res.data.message);  
        } else {
          setData(res.data);  
          setError(null);      
        }

      } catch (e) {
        if (e.name === "AbortError") {
          setError("Request was aborted");
        } else {
          setError(e.message);  
        }

      } finally {
        setLoading(false);  
      }
    };
  
    const getData = (url) => fetchData(url, 'GET');
    const createData = (url, body) => fetchData(url, 'POST', body);
    const updateData = (url, body) => fetchData(url, 'PUT', body);
    const deleteData = (url) => fetchData(url, 'DELETE');
  
    return { data, loading, error, getData, createData, updateData, deleteData };
  };