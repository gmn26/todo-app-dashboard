import { LuCalendarClock } from "react-icons/lu";
import { GrStatusGoodSmall } from "react-icons/gr";
import { IoIosCloseCircle } from "react-icons/io";

interface Datas {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  createdAt: string;
}

interface DetailTaskProps {
  datas: Datas;
  action: () => void;
}

const DetailTask: React.FC<DetailTaskProps> = ({ datas, action }) => {
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

  return (
    <div className="flex justify-center items-center absolute left-0 top-0 bottom-0 right-0 z-50 bg-black bg-opacity-80 text-white">
      <div className="relative flex flex-col p-4 rounded-lg bg-white text-black">
        <img
          src="https://placehold.jp/150x150.png"
          className="mb-5"
          alt="Image"
        />
        <span className="text-xl font-bold underline">{datas.title}</span>
        <span className="text-slate-600 text-xs">{datas.description}</span>
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

export default DetailTask;
