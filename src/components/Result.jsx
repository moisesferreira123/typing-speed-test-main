import iconRestart from '../assets/images/icon-restart.svg';

function Result({ title, subtitle, isHighScore, textButton }) {
  return(
    <div className="flex flex-col items-center gap-8 ">
      <div className="pt-6 flex flex-col items-center gap-2.5">
        <h1 className="text-(--neutral-0) font-bold text-[30px] leading-[136%] tracking-[0.4px]">{title}</h1>
        <p className="text-(--neutral-400) text-[15px] leading-[120%] tracking-[-0.6px] ">{subtitle}</p>
      </div>
      <div className="pt-5 pb-8 flex justify-center items-center gap-5">
        <div className="px-6 py-4 flex flex-col items-start gap-3 rounded-lg border border-(--neutral-700) w-40 ">
          <p className="text-(--neutral-400) text-[16px] leading-[120%] tracking-[-0.6px] ">WPM:</p>
          <p className="font-bold text-(--neutral-0) text-[22px] leading-[100%] tracking-normal ">85</p>
        </div>
        <div className="px-6 py-4 flex flex-col items-start gap-3 rounded-lg border border-(--neutral-700) w-40 ">
          <p className="text-(--neutral-400) text-[16px] leading-[120%] tracking-[-0.6px] ">Accuracy:</p>
          <p className={`font-bold ${isHighScore ? 'text-(--green-500)' : 'text-(--red-500)'} text-[22px] leading-[100%] tracking-normal `}>90%</p>
        </div>
        <div className="px-6 py-4 flex flex-col items-start gap-3 rounded-lg border border-(--neutral-700) w-40 ">
          <p className="text-(--neutral-400) text-[16px] leading-[120%] tracking-[-0.6px] ">Characters</p>
          <p className="font-bold text-(--neutral-500) text-[22px] leading-[100%] tracking-normal "><span className="text-(--green-500)">120</span>/<span className="text-(--red-500)">5</span></p>
        </div>
      </div>
      <div>
        <button className="flex justify-center items-center gap-2.5 px-4 py-3 bg-(--neutral-0) rounded-xl text-(--neutral-900) font-semibold hover:opacity-90 hover:cursor-pointer ">
          <p className='text-[16px] leading-[120%] tracking-[-0.3px]'>{textButton}</p>
          <img src={iconRestart} alt="" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Result;