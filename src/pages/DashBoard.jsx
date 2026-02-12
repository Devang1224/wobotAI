import React from "react";
import useCameraTable from "../hooks/useCameraTable";
import { IoSearch } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
// import { FaWifi } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa";
import Table from "../components/ui/Table";
import { IoBan } from "react-icons/io5";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const DashBoard = () => {
  const {
     filteredData,
     isLoading,
     error,
     setFilters,
     filters,
     totalFilteredCount } = useCameraTable();

  const columns = [
    {
      id: "name",
      label: "Name",
    },
    {
      id: "health",
      label: "Health",
    },
    {
      id: "location",
      label: "Location",
    },
    {
      id: "recorder",
      label: "Recorder",
    },
    {
      id: "tasks",
      label: "Tasks",
    },
    {
      id: "status",
      label: "Status",
    },
    {
      id: "actions",
      label: "Actions",
    },
  ];

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
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            value={filters.search}
          />
          <button>
            <IoSearch className="dash-search-icon" />
          </button>
        </div>
      </div>

      {/* filters  */}
      <div className="dash-filters">
        <div className="dash-select">
          <GoLocation className="dash-select-icon" />
          <select
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
            value={filters.location}
          >
            <option value="all" selected>
              Location
            </option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="dash-select">
          <FaWifi className="dash-select-icon tilted" />
          <select
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            value={filters.status}
          >
            <option value="all" selected>
              Status
            </option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* table */}
      <div className="dash-table">
        <Table>
          <thead className="table-head">
            <th className="table-head-item">
              <input type="checkbox" className="table-checkbox" />
            </th>
            {columns.map((column) => (
              <th className="table-head-item" key={column.id}>
                {column.label}
              </th>
            ))}
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr className="table-row" key={item.id}>
                <td className="table-cell">
                  <input type="checkbox" className="table-checkbox" />
                </td>
                <td className="table-cell">Camera {index + 1}</td>
                <td className="table-cell">{item.health}</td>
                <td className="table-cell">{item.location}</td>
                <td className="table-cell">{item.name}</td>
                <td className="table-cell">3 Tasks</td>
                <td className="table-cell">{item.status}</td>
                <td className="table-cell ">
                  <IoBan className="table-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* pagination */}
      <div className="dash-pagination">
        <select
          onChange={(e) => setFilters({ ...filters, limit: e.target.value })}
          value={filters.limit}
        >
          <option value="10" selected>
            10
          </option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>

        <p className="dash-pagination-count">
          {totalFilteredCount === 0
            ? "0 - 0 of 0"
            : `${(filters.page - 1) * filters.limit + 1} - ${Math.min(filters.page * filters.limit, totalFilteredCount)} of ${totalFilteredCount}`}
        </p>

        <div className="dash-pagination-buttons">
          <button>
            <RiArrowLeftDoubleFill />
          </button>
          <button>
            <RiArrowLeftSLine />
          </button>
          <button>
            <MdKeyboardArrowRight />
          </button>
          <button>
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
