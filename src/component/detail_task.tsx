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
}

const DetailTask: React.FC<DetailTaskProps> = ({ datas }) => {
  return (
    <div className="flex justify-center items-center absolute left-0 top-0 bottom-0 right-0 z-50 bg-black bg-opacity-80 text-white">
      <div className="flex flex-col bg-white text-black">
        <span>{datas.title}</span>
        <span>{datas.description}</span>
        <span>{datas.dueDate}</span>
        <span>{datas.status}</span>
        <span>{datas.createdAt}</span>
      </div>
    </div>
  );
};

export default DetailTask;
