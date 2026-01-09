import logoLarge from '../../assets/images/logo-large.svg';
import iconPersonalBest from '../../assets/images/icon-personal-best.svg'
import iconRestart from '../../assets/images/icon-restart.svg'
import { useState } from 'react';
import NotStarted from '../NotStarted/NotStarted'

function Home() {
  const [itStarted, setItStarted] = useState(false);

  function startTyping() {
    setItStarted(true);
  }

  return(
    <div className="flex flex-col items-center px-28 py-8 bg-(--neutral-900) min-h-screen gap-9">
      <div className="flex w-full justify-between items-center">
        <img src={logoLarge} alt="" className='w-66.75 h-10' />
        <div className='flex items-center gap-2.5'>
          <img src={iconPersonalBest} alt="" className='w-[20.25px] h-4.5' />
          <p className='text-[18px] leading-[120%] tracking-[-0.6px] text-(--neutral-400)'>Personal best: <span className='text-(--neutral-0)'>92 WPM</span></p>
        </div>
      </div>
      <div className='flex flex-col w-full gap-6'>
        <div className='flex justify-between items-center pb-3 border-b border-(--neutral-700)'>
          <div className='flex h-6 gap-4'>
            <p className='text-[20px] leading-[120%] tracking-[-0.6px] text-(--neutral-400)'>WPM:<span className='font-bold leading-[100%] tracking-[0%] text-[24px] text-(--neutral-0) ml-3'>40</span></p>
            <div className='w-px h-full bg-(--neutral-700)'></div>
            <p className='text-[20px] leading-[120%] tracking-[-0.6px] text-(--neutral-400)'>Accuracy:<span className='font-bold leading-[100%] tracking-[0%] text-[24px] text-(--red-500) ml-3'>94%</span></p>
            <div className='w-px h-full bg-(--neutral-700)'></div>
            <p className='text-[20px] leading-[120%] tracking-[-0.6px] text-(--neutral-400)'>Time:<span className='font-bold leading-[100%] tracking-[0%] text-[24px] text-(--yellow-400) ml-3'>0:46</span></p>
          </div>
          <div className='flex h-7.75 gap-3'>
            <div className='flex gap-1.5 items-center'>
              <p className='pr-2 text-[16px] leading-[120%] tracking-[-0.48px] text-(--neutral-400)'>Difficulty:</p>
              <button className='text-[16px] leading-[120%] tracking-[-0.48px] text-(--neutral-0) px-2.5 py-1.5 border rounded-lg border-(--neutral-500)'>Easy</button>
              <button className='text-[16px] leading-[120%] tracking-[-0.48px] text-(--neutral-0) px-2.5 py-1.5 border rounded-lg border-(--neutral-500)'>Medium</button>
              <button className='text-[16px] leading-[120%] tracking-[-0.48px] text-(--blue-400) px-2.5 py-1.5 border rounded-lg border-(--blue-400)'>Hard</button>
            </div>
            <div className='w-px h-full bg-(--neutral-700)'></div>
            <div className='flex items-center gap-1.5'>
              <p className='pr-1.5 text-[16px] leading-[120%] tracking-[-0.48px] text-(--neutral-400)'>Mode:</p>
              <button className='text-[16px] leading-[120%] tracking-[-0.48px] text-(--blue-400) px-2.5 py-1.5 border rounded-lg border-(--blue-400)'>Timed (60s)</button>
              <button className='text-[16px] leading-[120%] tracking-[-0.48px] text-(--neutral-0) px-2.5 py-1.5 border rounded-lg border-(--neutral-500)'>Passage</button>
            </div>
          </div>
        </div>
        <div className={`relative ${!itStarted && 'px-1.25'}`}>
          {!itStarted && <NotStarted startTyping={startTyping}/>}
          <p className='text-[30px] leading-[136%] tracking-[0.4px] text-(--neutral-400)'>
            The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb—suggested commercial connections far more extensive than previously hypothesized. "We've underestimated ancient peoples' navigational capabilities and their appetite for luxury goods," the lead researcher observed. "Globalization isn't as modern as we assume."
          </p>
        </div>
      </div>
      <div className={`pt-7 flex justify-center w-full border-t border-(--neutral-700) ${!itStarted && 'hidden'}`}>
        <button className='flex justify-center items-center gap-2.5 bg-(--neutral-800) text-(--neutral-0) rounded-xl px-4 py-2.5 font-semibold'>
          <p className='leading-[120%] tracking-[-0.3px]'>Restart Test</p>
          <img src={iconRestart} alt="" className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
}

export default Home;