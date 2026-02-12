import React, { useEffect, useState, useMemo } from 'react'
import { fetchCameraData } from '../services/cameraApi';

const useCameraTable = () => {

  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);
  const [tableData,setTableData] = useState(null);
  const [filters,setFilters] = useState({
    location:'all',
    status:'all',
    search:'',
    page:1,
    limit:10,

  });

  
  
const filteredData = useMemo(()=>{
     if(tableData?.length > 0) {
        return tableData;
     }
     return [];
},[tableData,filters]);


  const getCameraData = async()=>{
     
    setIsLoading(true);
    try{
        const {data,status} = await fetchCameraData('/fetch/cameras');
        if(status!='success'){
          throw new Error("Failed to fetch camera data. Please try again later");
        }
        setTableData(data?.cameras);
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
