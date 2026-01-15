import iconRestart from '../../assets/images/icon-restart-white.svg'
import { useEffect, useState } from 'react';
import NotStarted from '../NotStarted/NotStarted'
import Header from '../../components/Header';

function Home() {
  const [itStarted, setItStarted] = useState(false);
  const text = `The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb—suggested commercial connections far more extensive than previously hypothesized. "We've underestimated ancient peoples' navigational capabilities and their appetite for luxury goods," the lead researcher observed. "Globalization isn't as modern as we assume."`;
  const [typedText, setTypedText] = useState([]);
  const [charIndex, setCharIndex] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [time, setTime] = useState(60);
  const [wrongLetters, setWrongLetters] = useState(0);

  function startTyping() {
    setItStarted(true);
  }

  function formatTime(time) {
    const minute = Math.trunc(time/60);
    const sec = time-minute*60;
    return `${minute}:${sec<10 ? `0${sec}` : sec}`;
  }

  useEffect(() => {
    if(!itStarted || time <= 0) return;

    setTimeout(() => {
      setTime(time => time-1);
    }, 1000);

    return () => clearTimeout(time);
  }, [itStarted, time]);

  useEffect(() => {
    console.log(typedText.length, wrongLetters)
    setWpm(Math.floor((typedText.length-wrongLetters)/5));
  }, [typedText, wrongLetters]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if(!itStarted) return;

      if(e.key === " " || e.key === `'` || e.key === "Tab") e.preventDefault();

      if(e.key === "Backspace")  {
        setTypedText(typedText => typedText.slice(0, -1));
        setWrongLetters(wrongLetters => {
          if(typedText[typedText.length-1] !== text[typedText.length-1]) return wrongLetters-1;
          return wrongLetters;
        });
        setCharIndex(charIndex => {
          if(charIndex>0) return charIndex-1;
          return charIndex;
        });
      } else if(e.key !== "Shift" && e.key !== "CapsLock") {
        setTypedText(typedText => [...typedText, e.key]);
        setWrongLetters(wrongLetters => {
          if(e.key !== text[typedText.length]) return wrongLetters+1;
          return wrongLetters;
        });
        setCharIndex(charIndex => charIndex+1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [itStarted, typedText, text]);

  return(
    <div className="flex flex-col items-center px-28 py-8 bg-(--neutral-900) min-h-screen gap-9">
      <Header />
      <div className='flex flex-col w-full gap-6'>
        <div className='flex justify-between items-center pb-3 border-b border-(--neutral-700)'>
          <div className='flex h-6 gap-4'>
            <p className='text-[20px] leading-[120%] tracking-[-0.6px] text-(--neutral-400)'>WPM:<span className='font-bold leading-[100%] tracking-[0%] text-[24px] text-(--neutral-0) ml-3'>{wpm}</span></p>
            <div className='w-px h-full bg-(--neutral-700)'></div>
            <p className='text-[20px] leading-[120%] tracking-[-0.6px] text-(--neutral-400)'>Accuracy:<span className={`font-bold leading-[100%] tracking-[0%] text-[24px] ${itStarted? 'text-(--red-500)' : 'text-(--neutral-0)'} ml-3`}>94%</span></p>
            <div className='w-px h-full bg-(--neutral-700)'></div>
            <p className='text-[20px] leading-[120%] tracking-[-0.6px] text-(--neutral-400)'>Time:<span className={`font-bold leading-[100%] tracking-[0%] text-[24px] ${itStarted? (time>=10 ? 'text-(--yellow-400)' : 'text-(--red-500)') : 'text-(--neutral-0)'} ml-3`}>{formatTime(time)}</span></p>
          </div>
          <div className='flex h-7.75 gap-3'>
            <div className='flex gap-1.5 items-center'>
              <p className='pr-2 text-[16px] leading-[120%] tracking-[-0.48px] text-(--neutral-400)'>Difficulty:</p>
              <button className='text-[16px] leading-[120%] tracking-[-0.48px] text-(--neutral-0) px-2.5 py-1.5 border rounded-lg border-(--neutral-500) hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer'>Easy</button>
              <button className='text-[16px] leading-[120%] tracking-[-0.48px] text-(--neutral-0) px-2.5 py-1.5 border rounded-lg border-(--neutral-500) hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer'>Medium</button>
              <button className='text-[16px] leading-[120%] tracking-[-0.48px] text-(--blue-400) px-2.5 py-1.5 border rounded-lg border-(--blue-400) hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer'>Hard</button>
            </div>
            <div className='w-px h-full bg-(--neutral-700)'></div>
            <div className='flex items-center gap-1.5'>
              <p className='pr-1.5 text-[16px] leading-[120%] tracking-[-0.48px] text-(--neutral-400)'>Mode:</p>
              <button className='text-[16px] leading-[120%] tracking-[-0.48px] text-(--blue-400) px-2.5 py-1.5 border rounded-lg border-(--blue-400) hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer'>Timed (60s)</button>
              <button className='text-[16px] leading-[120%] tracking-[-0.48px] text-(--neutral-0) px-2.5 py-1.5 border rounded-lg border-(--neutral-500) hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer'>Passage</button>
            </div>
          </div>
        </div>
        <div className={`relative ${!itStarted && 'px-1.25'}`}>
          {!itStarted && <NotStarted startTyping={startTyping}/>}
          <p className='text-[30px] leading-[136%] tracking-[0.4px] text-(--neutral-400) whitespace-pre-wrap'>
            {text.split("").map((char, index) => (
              <span key={index} 
                    className={`
                                ${itStarted  && charIndex === index  && 'bg-(--neutral-400)/30'} 
                                ${index < typedText.length && char === typedText[index] && 'text-(--green-500)'}
                                ${index < typedText.length && char !== typedText[index] && 'text-(--red-500) underline'}
                              `}
              >{char}</span>
            ))}
          </p>
        </div>
      </div>
      <div className={`pt-7 flex justify-center w-full border-t border-(--neutral-700) ${!itStarted && 'hidden'}`}>
        <button className='flex justify-center items-center gap-2.5 bg-(--neutral-800) text-(--neutral-0) rounded-xl px-4 py-2.5 font-semibold hover:opacity-90 hover:cursor-pointer'>
          <p className='leading-[120%] tracking-[-0.3px]'>Restart Test</p>
          <img src={iconRestart} alt="" className='w-4 h-4 text-(--neutral-0)' />
        </button>
      </div>
    </div>
  );
}

export default Home;