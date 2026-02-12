import React, { useEffect, useState, useMemo } from "react";
import { cameraApi } from "../services/cameraApi";

const useCameraTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    location: "all",
    status: "all",
    search: "",
    page: 1,
    limit: 10,
  });

  console.log("selectedRows", selectedRows);

  const handleDeleteRows = () => {
    setTableData((prev) =>
      prev?.filter((item) => !selectedRows.includes(item.id)),
    );
  };

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
        if (
          filters.location !== "all" &&
          item.location.toLowerCase() !== filters.location.toLowerCase()
        ) {
          return;
        }
        if (
          filters.status !== "all" &&
          item.status.toLowerCase() !== filters.status.toLowerCase()
        ) {
          return;
        }
        if (
          filters.search !== "" &&
          !item.name.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return;
        }
        filteredOnly.push(item);
      });

      const total = filteredOnly.length;
      const data = filteredOnly.slice(
        (filters.page - 1) * filters.limit,
        filters.page * filters.limit,
      );
      return { data, totalFilteredCount: total };
    }
    return { data: [], totalFilteredCount: 0 };
  }, [tableData, filters]);

  const getCameraData = async () => {
    setIsLoading(true);
    try {
      const { data, status } = await cameraApi("/fetch/cameras");
      if (status != "success") {
        throw new Error("Failed to fetch camera data. Please try again later");
      }
// some data is missing from the api response, so i am adding it manually
       const updatedData  = data?.cameras?.map((item)=>{
            
        const cloudPercentage = Math.floor(Math.random() * 100);
        const dbPercentage = Math.floor(Math.random() * 100);
        const email = `${item.id}@example.com`;
        const tasks = Math.floor(Math.random() * 10);
        return {
          ...item,
          cloudPercentage,
          dbPercentage,
          email,
          tasks,
        }
       })

      setTableData(updatedData);
      console.log(data);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCameraData();
  }, []);

  return {
    setFilters,
    filters,
    isLoading,
    error,
    filteredData,
    totalFilteredCount,
    selectedRows,
    setSelectedRows,
    handleDeleteRows,
    tableData,

  };
};

export default useCameraTable;
