import { useEffect, useState } from "react";
import { fetchTasks } from "./services/api";
import DetailTask from "./component/detail_task";

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
  }, []);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const showAction = (detail: Task) => {
    if (!showDetail) {
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

  return (
    <div className="flex flex-col items-center min-h-screen p-4 gap-8">
      {showDetail ? <DetailTask datas={detail} /> : null}
      <form className="border rounded-xl w-fit flex flex-col gap-4 p-3 shadow-xl *:flex *:flex-col *:items-start">
        <div>
          <label htmlFor="Title">Task Title</label>
          <input type="text" name="title" />
        </div>
        <div>
          <label htmlFor="Description">Task Description</label>
          <input type="text" name="description" />
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
              <td>
                {showDetail.toString()}
                <button onClick={() => showAction(task)}>Detail</button>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
