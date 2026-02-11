import React from "react";
import useCameraTable from "../hooks/useCameraTable";

const DashBoard = () => {
  const { 
    filteredData,
    isLoading,
    error,
    setFilters,
    filters } = useCameraTable();

  return <div></div>;
};

export default DashBoard;
