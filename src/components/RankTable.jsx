import { formatDate } from "../utils/formatDate";
import RankRow from "./RankRow";
// 445 de altura
function RankTable({ leaderboard }) {
  return (
    <div>
      <div className="grid grid-cols-12 px-5 py-4 text-(--neutral-400) font-bold border-b border-(--neutral-700)">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-4 text-center">Username</div>
        <div className="col-span-3 text-center">Date</div>
        <div className="col-span-2 text-center">Accuracy</div>
        <div className="col-span-2 text-center">WPM</div>
      </div>
      <div className="max-h-80 [@media(min-height:800px)_and_(max-height:999px)]:max-h-130  [@media(min-height:1000px)]:max-h-none overflow-y-auto">
        {leaderboard.length > 0 ? 
          <RankRow 
            rank={1}
            username={leaderboard[0].username}
            date={formatDate(leaderboard[0].createdAt)}
            accuracy={leaderboard[0].accuracy}
            wpm={leaderboard[0].wpm}
            colorBgRank={'rank-gold'}
            colorTextRank={'text-yellow-900'}
            hoverEffect={'hover:bg-linear-to-r hover:from-yellow-400/10 hover:to-yellow-500/10 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]'}
          />
        : 
          <div className="text-(--neutral-400) flex justify-center pt-4">
            The leaderboard is empty. Be the first to claim your spot!
          </div>
        }
        {leaderboard.length > 1 &&
          <RankRow 
            rank={2}
            username={leaderboard[1].username}
            date={formatDate(leaderboard[1].createdAt)}
            accuracy={leaderboard[1].accuracy}
            wpm={leaderboard[1].wpm}
            colorBgRank={'rank-silver'}
            colorTextRank={'text-gray-700'}
            hoverEffect={'hover:bg-linear-to-r hover:from-slate-300/10 hover:to-slate-400/10 hover:shadow-[0_0_15px_rgba(148,163,184,0.3)]'}
          />
        }
        {leaderboard.length > 2 &&
          <RankRow 
            rank={3}
            username={leaderboard[2].username}
            date={formatDate(leaderboard[2].createdAt)}
            accuracy={leaderboard[2].accuracy}
            wpm={leaderboard[2].wpm}
            colorBgRank={'rank-bronze'}
            colorTextRank={'text-orange-900'}
            hoverEffect={'hover:bg-linear-to-r hover:from-orange-500/10 hover:to-orange-700/10 hover:shadow-[0_0_15px_rgba(154,52,18,0.4)]'}
          />
        }
        {leaderboard.length > 3 &&
          leaderboard.slice(3).map((item, index) => (
              <RankRow 
                key={item.id}
                rank={index+4}
                username={leaderboard[index+3].username}
                date={formatDate(leaderboard[index+3].createdAt)}
                accuracy={leaderboard[index+3].accuracy}
                wpm={leaderboard[index+3].wpm}
                colorBgRank={'bg-(--neutral-700)/80'}
                colorTextRank={'text-(--foreground)'}
                hoverEffect={'hover:bg-white/5'}
              />
            )
          )
        }
      </div>
    </div>
  );
}

export default RankTable;