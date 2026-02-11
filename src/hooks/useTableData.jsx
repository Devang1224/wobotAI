import React, { useEffect, useState, useMemo } from 'react'
import { fetchTableData } from '../services/tableAPi';

const useTableData = () => {

  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);
  const [tableData,setTableData] = useState(null);
  const [filters,setFilters] = useState({});

  
  
const filteredData = useMemo(()=>{

},[tableData,filters]);


  const getTableData = async()=>{
    
    setIsLoading(true);
    try{
        const data = await fetchTableData();
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
    getTableData();
  },[])
 
    return {
        setFilters,
        filters,
        isLoading,
        error,
        filteredData

    }  
}

export default useTableData
