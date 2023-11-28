import axios from "axios";
import React, { createContext, useState, useContext } from "react";

const BASE_URL = "https://0ad7-116-96-45-57.ngrok-free.app/api/task";

// Set default headers for all axios requests
axios.defaults.headers.common["ngrok-skip-browser-warning"] = "69420";

const TaskContext = createContext();
function TaskProvider({ children }) {
  const [openForm, setOpenForm] = useState(false);
  const [data, setData] = useState([]);
  const [curRowData, setCurRowData] = useState(null);
  const [action, setAction] = useState("None");
  const [rows, setRows] = React.useState([]);
  const [searchedRows, setSearchedRows] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const dataPost = {
      name: curRowData.name,
      priority: curRowData.priority,
      status: curRowData.status,
      note: curRowData.note,
    };

    try {
      const response = await axios.post(BASE_URL, dataPost);
      alert(response.data);
      setIsLoading(false);
      setOpenForm(false);
    } catch (error) {
      alert("Error adding task:", error);
      setIsLoading(false);
    }
  }

  async function updateTask() {
    setIsLoading(true);
    try {
      const response = await axios.put(BASE_URL, curRowData);
      alert(response.data);
      setIsLoading(false);
      setOpenForm(false);
    } catch (error) {
      alert("Error adding task:", error);
      setIsLoading(false);
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
    setIsLoading(true);

    try {
      const response = await axios.delete(`${BASE_URL}`, {
        data: curRowData,
      });
      setIsLoading(false);
      setOpenForm(false);
      alert(response.data);
    } catch (error) {
      alert("Error delete task:", error);
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(BASE_URL)
      .then((response) => {
        // Xử lý dữ liệu trả về từ API
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error fetching data:", error);
        setIsLoading(false);
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
        rows,
        searchedRows,
        isLoading,
        setSearchedRows,
        setRows,
        addTask,
        deleteTask,
        updateTask,
        setCurRowData,
        handleAction,
        handleCloseForm,
        handleOpenForm,
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
