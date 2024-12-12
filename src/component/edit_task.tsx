import { LuCalendarClock } from "react-icons/lu";
import { GrStatusGoodSmall } from "react-icons/gr";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";
import { editTask } from "../services/api";

interface Datas {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  createdAt: string;
}

interface EditTaskProps {
  datas: Datas;
  action: () => void;
  update: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ datas, action, update }) => {
  let statColor = "text-black";
  if (datas.status == "Pending") {
    statColor = "text-gray-600";
  } else if (datas.status == "In Progress") {
    statColor = "text-yellow-600";
  } else if (datas.status == "Complete") {
    statColor = "text-green-600";
  } else if (datas.status == "Late") {
    statColor = "text-red-600";
  }

  const [updateForm, setUpdateForm] = useState({
    title: datas.title,
    description: datas.description,
    dueDate: "2024-10-12",
  });

  const inputUpdateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateForm((updateForm) => ({
      ...updateForm,
      [e.target.name]: e.target.value,
    }));
  };

  const submitEditHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await editTask(datas.id, updateForm);
    if (!response.success) {
      alert("Failed edit task");
    } else {
      alert("Task edited succesfully");
      update();
    }
  };

  return (
    <div className="flex justify-center items-center absolute left-0 top-0 bottom-0 right-0 z-50 bg-black bg-opacity-80 text-white">
      <div className="relative flex flex-col p-4 rounded-lg bg-white text-black">
        <form
          className="w-fit flex flex-col gap-4 p-3 *:flex *:flex-col *:items-start"
          onSubmit={submitEditHandler}
        >
          <div>
            <label htmlFor="Title">Task Title</label>
            <input
              type="text"
              name="title"
              value={updateForm.title}
              onChange={inputUpdateHandler}
            />
          </div>
          <div>
            <label htmlFor="Description">Task Description</label>
            <input
              type="text"
              name="description"
              value={updateForm.description}
              onChange={inputUpdateHandler}
            />
          </div>
          <button className="bg-green-600 text-white px-2 rounded mx-auto">
            Edit Task
          </button>
        </form>
        <span className="flex items-center gap-1 text-sm">
          <LuCalendarClock />
          {datas.dueDate}
        </span>
        <span className={`flex gap-1 items-center text-sm ${statColor}`}>
          <GrStatusGoodSmall />
          {datas.status}
        </span>
        {/* <span>{datas.createdAt}</span> */}
        <button className="absolute right-0 -top-[.5px]" onClick={action}>
          <IoIosCloseCircle />
        </button>
      </div>
    </div>
  );
};

export default EditTask;
