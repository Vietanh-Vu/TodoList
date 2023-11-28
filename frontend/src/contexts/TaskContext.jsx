import axios from "axios";
import React, { createContext, useState, useContext } from "react";

const BASE_URL = "http://localhost:8080/api/task";

const TaskContext = createContext();
function TaskProvider({ children }) {
  const [openForm, setOpenForm] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [data, setData] = useState([]);
  const [curRowData, setCurRowData] = useState(null);
  const [action, setAction] = useState("None");
  const [rows, setRows] = React.useState([]);
  const [searchedRows, setSearchedRows] = useState(null);

  function handleOpenAlertDialog(currentRow) {
    setCurRowData(currentRow);
    setAction("Delete");
    setOpenAlertDialog(true);
  }

  function handleCloseAlertDialog() {
    setOpenAlertDialog(false);
  }

  function handleCloseForm() {
    setOpenForm(false);
  }

  function handleOpenForm(currentRow) {
    setCurRowData(currentRow);
    setOpenForm(true);
  }

  function handleAction(inputAction) {
    setAction(inputAction);
  }

  async function addTask() {
    console.log(curRowData);
    const dataPost = {
      name: curRowData.name,
      priority: curRowData.priority,
      status: curRowData.status,
      note: curRowData.note,
    };

    try {
      const response = await axios.post(BASE_URL, dataPost);
      alert(response.data);
      setOpenForm(false);
    } catch (error) {
      alert("Error adding task:", error);
    }
  }

  async function updateTask() {
    try {
      const response = await axios.put(BASE_URL, curRowData);
      alert(response.data);
      setOpenForm(false);
    } catch (error) {
      alert("Error adding task:", error);
    }
  }

  async function deleteTask() {
    // console.log(curRowData);
    // const dataDelete = {
    //   createAt: curRowData.createAt,
    //   name: curRowData.name,
    //   priority: curRowData.priority,
    //   status: curRowData.status,
    //   note: curRowData.note,
    // };

    // console.log(dataDelete);
    try {
      const response = await axios.delete(`${BASE_URL}`, {
        data: curRowData,
      });
      alert(response.data);
      setOpenAlertDialog(false);
    } catch (error) {
      alert("Error delete task:", error);
    }
  }

  React.useEffect(() => {
    axios
      .get(BASE_URL)
      .then((response) => {
        // Xử lý dữ liệu trả về từ API
        setData(response.data);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error fetching data:", error);
      });

    return () => {};
  }, []);

  return (
    <TaskContext.Provider
      value={{
        openForm,
        action,
        data,
        curRowData,
        openAlertDialog,
        rows,
        searchedRows,
        setSearchedRows,
        setRows,
        addTask,
        deleteTask,
        updateTask,
        setCurRowData,
        handleAction,
        handleCloseForm,
        handleOpenForm,
        handleOpenAlertDialog,
        handleCloseAlertDialog,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined)
    throw new Error("TaskContext is use outside of TaskProvider");
  return context;
}

export { TaskProvider, useTask };
