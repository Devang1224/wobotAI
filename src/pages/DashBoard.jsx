import React from "react";
import useCameraTable from "../hooks/useCameraTable";

const DashBoard = () => {
//   const { 
//     filteredData,
//     isLoading,
//     error,
//     setFilters,
//     filters } = useCameraTable();

  return (
    <div className="dash">
        <div className="dash-header">
            <div className="dash-head">
               <p className="dash-title">Cameras</p>
               <p className="dash-desc">Manage your cameras here</p>
            </div>
            <div className="dash-search">
                <input
                  type="text"
                  placeholder="search"

                />
            </div>

        </div>
   </div>
  );
};

export default DashBoard;
