import { useState, useEffect } from "react";
import axios from "axios";

const UseFetch = (url) => {
    const [data, setData] = useState(null)
    const [error , setError] = useState(null)
    
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setData(res.data)
                setError(null);
            })
            .catch(err => {
                setError(err.res?.data || 'an error occurred');
            })
        
    }, [url])
    
    return {data ,error};
}

export default UseFetch;