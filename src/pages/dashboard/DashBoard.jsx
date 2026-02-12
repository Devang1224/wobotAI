import React, { useRef, useState } from "react";
import "./dashboard.css";
import useCameraTable from "../../hooks/useCameraTable";
import { IoSearch } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
// import { FaWifi } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa";
import Table, { Tbody, Td, Th, Thead, Tr } from "../../components/ui/Table/Table";
import { IoBan } from "react-icons/io5";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmModal from "../../components/ui/ConfirmModal";
import CircularChart from "../../components/ui/CirculartChart/CircularChart";
import { TiWeatherCloudy } from "react-icons/ti";
import { BiCabinet } from "react-icons/bi";
import { formatCameraName } from "../../helpers/formatCameraName";
import { cameraApi } from "../../services/cameraApi";

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

  const [activeModal, setActiveModal] = useState(null); // delete,status
  const cameraStatusRef = useRef(null); // { id, status }
  

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
    setActiveModal("delete");
  };
  const onConfirmDeleteRows = () => {
    handleDeleteRows();
    setActiveModal(null);
  };

  const onConfirmChangeStatus = async() => {
    try{  
      const tmp = cameraStatusRef.current.id.split("_")[1];
      const id = parseInt(tmp, 10);
      const resp = await cameraApi('/update/camera/status',{
        method: "POST",
        body: {
          id: id,
          status: cameraStatusRef.current.status,
        },
      });

      console.log("resp", resp);
    }catch(err){
      console.log(err);
    }finally{
      setActiveModal(null);
    }
  };
  const onClickCameraStatus = (id, status) => {
    cameraStatusRef.current = { id, status };
    setActiveModal("status");
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
          <Thead>
            <Tr>
              <Th>
                <input
                  type="checkbox"
                  className="table-checkbox"
                  checked={checkAllRowsSelected()}
                  onChange={handleSelectAllRows}
                />
              </Th>
              <Th>NAME</Th>
              <Th>HEALTH</Th>
              <Th>LOCATION</Th>
              <Th>RECORDER</Th>
              <Th>TASKS</Th>
              <Th className="textCenter">STATUS</Th>
              <Th>ACTIONS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData?.length > 0 ? (
              filteredData.map((item) => (
                <Tr key={item.id}>
                  <Td>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={(e) => handleSelectRow(e, item.id)}
                    />
                  </Td>
                  <Td>
                    <div>
                       <div className="table-cell-name">
                          <div className={`active_dot ${item.status.toLowerCase() === "active" ? "active_dot" : "inactive_dot"}`}></div>
                           <p>{formatCameraName(item.id)}</p>
                       </div>
                      <p className="table-cell-email">{item.email ? item.email : 'N/A'}</p>
                    </div>
                    
                    
                  </Td>
                  <Td>
                    <div className="table-cell-chart">
                      <div className="placeItemsCenter gap2">
                        <TiWeatherCloudy size={20} color='var(--color-grey-200)'/>
                         <CircularChart percentage={item.cloudPercentage} color={`${item.cloudPercentage > 50 ? "var(--color-green-300)" : "var(--color-orange-100)"}`}>B</CircularChart>
                      </div>
                      <div className="placeItemsCenter gap2">
                        <BiCabinet size={16} color='var(--color-grey-200)'/>
                        <CircularChart percentage={item.dbPercentage} color={`${item.dbPercentage > 50 ? "var(--color-green-300)" : "var(--color-orange-100)"}`}>A</CircularChart>
                      </div>
                    </div>
                  </Td>
                  <Td>{item.location ? item.location : 'N/A'}</Td>
                  <Td>{item.name ? item.name : 'N/A'}</Td>
                  <Td>{item.tasks ? `${item.tasks} Tasks`: 'N/A'}</Td>
                  <Td className="table-status">
                    <button
                      className={`table-status-btn ${item.status.toLowerCase() === "active" ? "active-btn" : "inactive-btn"}`}
                      onClick={() => onClickCameraStatus(item.id, item.status)}
                    >
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </button>
                  </Td>
                  <Td>
                    {selectedRows.includes(item.id) ? (
                      <button className="trash-btn" onClick={onClickDeleteRows}>
                        <FaTrashAlt className="table-icon" />
                      </button>
                    ) : (
                      <IoBan className="table-icon" />
                    )}
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={columns.length + 1}>
                  No data found
                </Td>
              </Tr>
            )}
          </Tbody>
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
        isOpen={activeModal === "delete"}
        title="Delete selected cameras?"
        message={`This will delete ${selectedRows.length} selected ${
          selectedRows.length === 1 ? "camera" : "cameras"
        }.`}
        confirmText="Delete"
        cancelText="Cancel"
        onClose={() => setActiveModal(false)}
        onConfirm={onConfirmDeleteRows}
      />

      <ConfirmModal
        isOpen={activeModal === "status"}
        title="Change status of selected cameras?"
        message={`This will change the status `}
        confirmText="Change"
        cancelText="Cancel"
        onClose={() => setActiveModal(null)}
        onConfirm={onConfirmChangeStatus}
      />
    </div>
  );
};

export default DashBoard;
