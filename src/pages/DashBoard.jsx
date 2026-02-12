import React, { useState } from "react";
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
import { FaTrashAlt } from "react-icons/fa";
import ConfirmModal from "../components/ui/ConfirmModal";

const DashBoard = () => {
  const {
    filteredData,
    setFilters,
    filters,
    totalFilteredCount,
    selectedRows,
    setSelectedRows,
    handleDeleteRows,
    tableData,
  } = useCameraTable();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const handleSelectRow = (e, id) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((item) => item !== id));
    }
  };

  const checkAllRowsSelected = () => {
    if (filteredData?.length === 0) return false;
    let tmp = filteredData.every((item) => selectedRows.includes(item.id));
    console.log("tmp", tmp);
    return tmp;
  };

  const handleSelectAllRows = (e) => {
    const checked = e.target.checked;
    const visibleIds = new Set(filteredData?.map((item) => item.id) ?? []);

    if (checked) {
      setSelectedRows((prev) => [...new Set([...prev, ...visibleIds])]);
    } else {
      setSelectedRows((prev) => prev.filter((id) => !visibleIds.has(id)));
    }
  };

  const onClickDeleteRows = () => {
    if (selectedRows.length === 0) return;
    setIsDeleteModalOpen(true);
  };

  const onConfirmDeleteRows = () => {
    handleDeleteRows();
    setIsDeleteModalOpen(false);
  };

  const onClickCameraStatus = (id, status) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

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
            <option value="all">Location</option>
            {tableData?.length &&
              tableData.map((item) => (
                <option value={item.location} key={item.id}>
                  {item.location}
                </option>
              ))}
          </select>
        </div>
        <div className="dash-select">
          <FaWifi className="dash-select-icon tilted" />
          <select
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            value={filters.status}
          >
            <option value="all">Status</option>
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
              <input
                type="checkbox"
                className="table-checkbox"
                checked={checkAllRowsSelected()}
                onChange={handleSelectAllRows}
              />
            </th>
            {columns.map((column) => (
              <th className="table-head-item" key={column.id}>
                {column.label}
              </th>
            ))}
          </thead>
          <tbody>
            {filteredData?.length > 0 ? (
              filteredData.map((item, index) => (
                <tr className="table-row" key={item.id}>
                  <td className="table-cell">
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={(e) => handleSelectRow(e, item.id)}
                    />
                  </td>
                  <td className="table-cell">
                    Camera {index + 1 + (filters.page - 1) * filters.limit}{" "}
                  </td>
                  <td className="table-cell">{item.health}</td>
                  <td className="table-cell">{item.location}</td>
                  <td className="table-cell">{item.name}</td>
                  <td className="table-cell">3 Tasks</td>
                  <td className="table-cell table-status">
                    <button className={`table-status-btn ${item.status.toLowerCase() === "active" ? "active-btn" : "inactive-btn"}`} 
                      onClick={() => onClickCameraStatus(item.id, item.status)}
                    > 
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </button>
                  </td>
                  <td className="table-cell ">
                    {selectedRows.includes(item.id) ? (
                      <button className="trash-btn" onClick={onClickDeleteRows}>
                        <FaTrashAlt className="table-icon" />
                      </button>
                    ) : (
                      <IoBan className="table-icon" />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="table-row">
                <td className="table-cell" colSpan={columns.length + 1}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* pagination */}
      <div className="dash-pagination">
        <select
          onChange={(e) => setFilters({ ...filters, limit: e.target.value })}
          value={filters.limit}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>

        <p className="dash-pagination-count">
          {totalFilteredCount === 0
            ? "0 - 0 of 0"
            : `${(filters.page - 1) * filters.limit + 1}-${Math.min(filters.page * filters.limit, totalFilteredCount)} of ${totalFilteredCount}`}
        </p>

        <div className="dash-pagination-buttons">
          <button onClick={() => setFilters({ ...filters, page: 1 })}>
            <RiArrowLeftDoubleFill />
          </button>
          <button
            onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
          >
            <RiArrowLeftSLine />
          </button>
          <button
            onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
          >
            <MdKeyboardArrowRight />
          </button>
          <button
            onClick={() =>
              setFilters({
                ...filters,
                page: Math.ceil(totalFilteredCount / filters.limit),
              })
            }
          >
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete selected cameras?"
        message={`This will delete ${selectedRows.length} selected ${
          selectedRows.length === 1 ? "camera" : "cameras"
        }.`}
        confirmText="Delete"
        cancelText="Cancel"
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onConfirmDeleteRows}
      />
    </div>
  );
};

export default DashBoard;
