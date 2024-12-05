import Table from "../../Components/Table/Table";
import "./home.css";
import { getCameraList, updateStatus } from "../../services/tableApi";
import { useEffect, useState } from "react";
import { StatusTag } from "../../Components/Home/StatusTag";
import { Health } from "../../Components/Home/Health";
import { Action } from "../../Components/Home/Action";
import { NameCheckBox } from "../../Components/Home/NameCheckBox";
import { NameTitleCheckBox } from "../../Components/Home/NameTitleCheckBox";
import wobotImg from "../../assets/wobot.png";

const Home = () => {
  const [search, setSearch] = useState("");
  const [cameraList, setCameraList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [checked, setChecked] = useState([]);
  const locationSet = new Set();
  const statusSet = new Set();

  originalList.map((item) => locationSet.add(item.location));
  originalList.map((item) => statusSet.add(item.status));

  const locationList = Array.from(locationSet);
  const statusList = Array.from(statusSet);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setCameraList((prev) =>
      prev.filter((item) => item.location === e.target.value)
    );
    setOriginalList((prev) =>
      prev.filter((item) => item.location === e.target.value)
    );
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setCameraList((prev) =>
      prev.filter((item) => item.status === e.target.value)
    );
    setOriginalList((prev) =>
      prev.filter((item) => item.status === e.target.value)
    );
  };

  const clearFilters = () => {
    setStatus("");
    setSearch("");
    setLocation("");
    fetchCameraList();
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    if (e.target.value === "") {
      setCameraList(originalList);
    }

    setCameraList(
      originalList.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleRowCheck = (e) => {
    const value = Number(e.target.value);
    if (checked.includes(value)) {
      setChecked((prev) => prev.filter((item) => item !== value));
    } else {
      setChecked((prev) => [...prev, value]);
    }
  };

  const toggleCheckAll = () => {
    if (checked.length !== cameraList.length) {
      setChecked(cameraList.map((item) => item.id));
    } else {
      setChecked([]);
    }
  };

  const handleDelete = (id) => {
    setCameraList((prev) => prev.filter((item) => item.id !== id));
    setOriginalList((prev) => prev.filter((item) => item.id !== id));
    setChecked((prev) => prev.filter((item) => item !== id));
  };

  const handleDeleteAll = () => {
    setCameraList((prev) => prev.filter((item) => !checked.includes(item.id)));
    setOriginalList((prev) =>
      prev.filter((item) => !checked.includes(item.id))
    );
    setChecked([]);
  };

  const columns = [
    {
      title: (
        <NameTitleCheckBox
          checked={checked}
          cameraList={cameraList}
          toggleCheckAll={toggleCheckAll}
        />
      ),
      dataIndex: "name",
      key: "name",
      width: 20,
      render: (item, row) => {
        return (
          <NameCheckBox
            item={item}
            data={row}
            checked={checked}
            handleRowCheck={handleRowCheck}
          />
        );
      },
    },
    {
      title: "Health",
      dataIndex: "health",
      key: "health",
      render: (item) => {
        return <Health cloud={item.cloud} device={item.device} />;
      },
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Recorder",
      dataIndex: "recorder",
      key: "recorder",
      render: (value) => {
        if (value == "") {
          return <p>N/A</p>;
        }

        return <p>{value}</p>;
      },
    },
    {
      title: "Tasks",
      dataIndex: "tasks",
      key: "tasks",
      render: (value) => {
        if (value == 0) {
          return <p>N/A</p>;
        }

        return <p>{`${value} Tasks`}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value, data) => (
        <StatusTag status={value} data={data} onClick={handleUpdateStatus} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (data) => (
        <Action
          checked={checked.includes(data.id)}
          handleDelete={handleDelete}
          data={data}
        />
      ),
    },
  ];

  const fetchCameraList = async () => {
    try {
      const response = await getCameraList();
      setCameraList(response);
      setOriginalList(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateStatus = async (payload) => {
    try {
      await updateStatus(payload);
      fetchCameraList();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCameraList();
  }, []);

  return (
    <div className="main-container">
      <div className="img-wrap">
        <img src={wobotImg} className="home-icon" />
      </div>
      <div className="content-wrap">
        <div>
          <p className="camera">Cameras</p>
          <p className="desc">Manage your cameras here</p>
        </div>
        <input
          className="search"
          value={search}
          type="search"
          placeholder="search"
          onChange={handleSearchChange}
        />
      </div>
      <div className="table-top">
        <div className="filters-wrap">
          <select
            value={location}
            className="dropdown"
            onChange={handleLocationChange}
          >
            <option value="" disabled>
              Location
            </option>
            {locationList.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={status}
            className="dropdown status-filter"
            onChange={handleStatusChange}
          >
            <option value="" disabled>
              Status
            </option>
            {statusList.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>

          {(location || status) && (
            <p className="clear" onClick={clearFilters}>
              Clear filters
            </p>
          )}
        </div>

        {checked.length > 1 && (
          <p className="delete delete-all" onClick={handleDeleteAll}>
            Delete multiple
          </p>
        )}
      </div>
      <Table data={cameraList} columns={columns} />
    </div>
  );
};

export default Home;
