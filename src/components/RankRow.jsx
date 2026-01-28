import { Target } from "lucide-react";

function RankRow({ rank, username, date, accuracy, wpm, colorBgRank, colorTextRank, hoverEffect }) {
  return (
    <div className={`grid grid-cols-12 px-5 py-4 text-(--neutral-400) font-bold border-b border-(--neutral-700) ${hoverEffect} transition-all`}>
        <div className="col-span-1 flex justify-center items-center"><div className={`flex justify-center items-center w-10 h-10 ${colorTextRank} rounded-full ${colorBgRank}`}>{rank}</div></div>
        <div className="col-span-4 flex justify-center items-center">{username}</div>
        <div className="col-span-3 flex justify-center items-center">{date}</div>
        <div className="col-span-2 flex justify-center items-center">
          <div className={`flex gap-1 justify-center items-center px-3 py-1 rounded-full ${accuracy >= 90 ? (accuracy >= 95 ? 'text-(--green-500) bg-(--green-500)/10' : 'text-(--yellow-400) bg-(--yellow-400)/10') : 'text-(--red-500) bg-(--red-500)/10' }`}>
            <Target size={16} />
            <span>{accuracy}%</span>
          </div>
        </div>
        <div className="col-span-2 flex justify-center items-center text-3xl bg-linear-to-r from-(--blue-400) to-(--yellow-400) bg-clip-text text-transparent">
          {wpm}
        </div>
      </div>
  );
}

export default RankRow;