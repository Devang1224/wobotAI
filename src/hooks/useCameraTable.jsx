import React, { useEffect, useState, useMemo } from 'react'
import { fetchCameraData } from '../services/cameraApi';

const useCameraTable = () => {

  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);
  const [tableData,setTableData] = useState(null);
  const [filters,setFilters] = useState({});

  
  
const filteredData = useMemo(()=>{
     if(tableData?.length > 0) {
        return tableData;
     }
     return [];
},[tableData,filters]);


  const getCameraData = async()=>{
     
    setIsLoading(true);
    try{
        const data = await fetchCameraData();
        setTableData(data);
        console.log(data);

    }catch(err){
        console.log(err);
       setError(err);
    }finally{
        setIsLoading(false);
    } 
  }
  
  useEffect(()=>{
    getCameraData();
  },[])
 
    return {
        setFilters,
        filters,
        isLoading,
        error,
        filteredData

    }  
}

export default useCameraTable
