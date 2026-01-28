import { ArrowLeft, Trophy, Undo2 } from "lucide-react";
import Header from "../../components/Header";
import RankTable from "../../components/RankTable";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const bestWpm = localStorage.getItem("bestWpm");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center px-4 pt-4 pb-8 width-670:px-8 width-670:pt-8 width-670:pb-10 xl:px-28 xl:py-8 bg-(--neutral-900) min-h-screen gap-10">
      <Header bestWpm={bestWpm} />
      <div className="w-full p-6 bg-(--neutral-800) rounded-lg overflow-x-auto ">
        <div className="min-w-130">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-linear-to-r from-(--blue-400) to-(--yellow-400) rounded-lg "><Trophy size={20} /></div>
              <div>
                <h2 className="text-xl font-bold text-(--neutral-0)">Leaderboard</h2>
                <p className="text-sm text-(--neutral-400) ">Best typing perfomances</p>
              </div>
            </div> 
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 px-3 py-2 text-(--neutral-0) border border-(--neutral-500) rounded-lg hover:text-(--blue-400) hover:border-(--blue-400) cursor-pointer ">
              <ArrowLeft size={20} />
              <span className="text-sm">Back</span>
            </button>
          </div>
          <RankTable />
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;