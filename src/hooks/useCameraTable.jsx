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

  
  
const { data: filteredData, totalFilteredCount } = useMemo(() => {
     if (tableData?.length > 0) {
        let totalPages = Math.ceil(tableData.length / filters.limit);

        if (filters.page > totalPages) {
          filters.page = totalPages;
        }
        if (filters.page < 1) {
          filters.page = 1;
        }

        const filteredOnly = [];
        tableData.forEach((item) => {
          if (filters.location !== 'all' && item.location.toLowerCase() !== filters.location.toLowerCase()) {
            return;
          }
          if (filters.status !== 'all' && item.status.toLowerCase() !== filters.status.toLowerCase()) {
            return;
          }
          if (filters.search !== '' && !item.name.toLowerCase().includes(filters.search.toLowerCase())) {
            return;
          }
          filteredOnly.push(item);
        });

        const total = filteredOnly.length;
        const data = filteredOnly.slice((filters.page - 1) * filters.limit, filters.page * filters.limit);
        return { data, totalFilteredCount: total };
     }
     return { data: [], totalFilteredCount: 0 };
}, [tableData, filters]);


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
        filteredData,
        totalFilteredCount,
    };  
}

export default useCameraTable
