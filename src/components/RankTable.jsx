import RankRow from "./RankRow";

function RankTable() {


  return (
    <div>
      <div className="grid grid-cols-12 px-5 py-4 text-(--neutral-400) font-bold border-b border-(--neutral-700)">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-4 text-center">Username</div>
        <div className="col-span-3 text-center">Date</div>
        <div className="col-span-2 text-center">Accuracy</div>
        <div className="col-span-2 text-center">WPM</div>
      </div>
      {/*  */}
      <RankRow 
        rank={1}
        username={'moisessssssssssss'}
        date={'29/04/2002'}
        accuracy={98}
        wpm={98}
        colorBgRank={'rank-gold'}
        colorTextRank={'text-yellow-900'}
        hoverEffect={'hover:bg-linear-to-r hover:from-yellow-400/10 hover:to-yellow-500/10 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]'}
      />
      {/*  */}
      <RankRow 
        rank={2}
        username={'typingFast'}
        date={'29/04/2002'}
        accuracy={94}
        wpm={95}
        colorBgRank={'rank-silver'}
        colorTextRank={'text-gray-700'}
        hoverEffect={'hover:bg-linear-to-r hover:from-slate-300/10 hover:to-slate-400/10 hover:shadow-[0_0_15px_rgba(148,163,184,0.3)]'}
      />
      {/*  */}
      <RankRow 
        rank={3}
        username={'typingFast2'}
        date={'29/04/2002'}
        accuracy={89}
        wpm={92}
        colorBgRank={'rank-bronze'}
        colorTextRank={'text-orange-900'}
        hoverEffect={'hover:bg-linear-to-r hover:from-orange-500/10 hover:to-orange-700/10 hover:shadow-[0_0_15px_rgba(154,52,18,0.4)]'}
      />
      {/*  */}
      <RankRow 
        rank={4}
        username={'typingFast3'}
        date={'29/04/2002'}
        accuracy={93}
        wpm={91}
        colorBgRank={'bg-(--neutral-700)/80'}
        colorTextRank={'text-(--foreground)'}
        hoverEffect={'hover:bg-white/5'}
      />
    </div>
  );
}

export default RankTable;