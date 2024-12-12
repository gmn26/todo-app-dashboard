import { useEffect, useState } from "react";
import { addTask, delTask, fetchTasks } from "./services/api";
import DetailTask from "./component/detail_task";

import { FaBookOpen } from "react-icons/fa";
import { MdEditSquare, MdDelete } from "react-icons/md";
import EditTask from "./component/edit_task";

function App() {
  interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
    createdAt: string;
  }

  interface FetchReturn {
    tasks: Task[];
    totalTask: number;
  }

  const [counter, setCounter] = useState(0);

  const [datas, setDatas] = useState<FetchReturn>({
    tasks: [],
    totalTask: 0,
  });

  const [detail, setDetail] = useState<Task>({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    status: "",
    createdAt: "",
  });

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetchTasks();
        setDatas(response);
      } catch (error) {
        console.error(error);
      }
    };
    getTasks();
  }, [counter]);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showEditState, setShowEditState] = useState<boolean>(false);

  const showDetailAction = (detail?: Task) => {
    if (!showDetail && detail) {
      setDetail(detail);
    } else {
      setDetail({
        id: "",
        title: "",
        description: "",
        dueDate: "",
        status: "",
        createdAt: "",
      });
    }
    setShowDetail(!showDetail);
  };

  const showEditAction = (detail?: Task) => {
    if (!showEditState && detail) {
      setDetail(detail);
    } else {
      setDetail({
        id: "",
        title: "",
        description: "",
        dueDate: "",
        status: "",
        createdAt: "",
      });
    }
    setShowEditState(!showEditState);
  };

  const showEdit = (detail?: Task) => {
    if (!showEditState && detail) {
      setDetail(detail);
    } else {
      setDetail({
        id: "",
        title: "",
        description: "",
        dueDate: "",
        status: "",
        createdAt: "",
      });
    }
    setShowEditState(!showDetail);
  };

  const delAction = async (id: string) => {
    try {
      const response = await delTask(id);

      if (response.success.toString() == "false") {
        alert("Gagal hapus data");
      } else {
        alert("Berhasil hapus data");
        setCounter(counter + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "2024-10-12",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await addTask(formData);
    if (!response.success) {
      alert("Fail to add task");
    } else {
      alert("Task added succesfully");
      updateCounter();
    }
  };

  const updateCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 gap-8">
      {showDetail ? (
        <DetailTask datas={detail} action={showDetailAction} />
      ) : null}
      {showEditState ? (
        <EditTask
          datas={detail}
          action={showEditAction}
          update={updateCounter}
        />
      ) : null}
      <form
        onSubmit={submitHandler}
        className="border rounded-xl w-fit flex flex-col gap-4 p-3 shadow-xl *:flex *:flex-col *:items-start"
      >
        <div>
          <label htmlFor="Title">Task Title</label>
          <input type="text" name="title" onChange={inputHandler} />
        </div>
        <div>
          <label htmlFor="Description">Task Description</label>
          <input type="text" name="description" onChange={inputHandler} />
        </div>
        <button className="bg-green-600 text-white px-2 rounded mx-auto">
          Add Task
        </button>
      </form>
      Total task : {datas.totalTask}
      <table>
        <thead className="*:border *:p-2">
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.tasks.map((task, index) => (
            <tr className="*:border" key={task.id}>
              <td>{++index}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.status}</td>
              <td className="*:p-1 rounded flex gap-2">
                <button
                  onClick={() => showDetailAction(task)}
                  className="bg-yellow-300"
                >
                  <FaBookOpen />
                </button>
                <button onClick={() => showEdit(task)} className="bg-green-300">
                  <MdEditSquare />
                </button>
                <button
                  onClick={() => delAction(task.id)}
                  className="bg-red-600"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
