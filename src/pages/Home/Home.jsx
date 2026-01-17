import iconRestart from '../../assets/images/icon-restart-white.svg'
import { useEffect, useMemo, useRef, useState } from 'react';
import NotStarted from '../NotStarted/NotStarted'
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [itStarted, setItStarted] = useState(false);
  const [typedText, setTypedText] = useState([]);
  const [charIndex, setCharIndex] = useState(0);
  const [chosenTime, setChosenTime] = useState(() => {
    const mode = sessionStorage.getItem('mode');
    if(!mode) return 60;
    if(mode === "passage") return 0;
    if(mode === "timed15") return 15;
    if(mode === "timed30") return 30;
    if(mode === "timed60") return 60;
  });
  const [time, setTime] = useState(60);
  const [wrongCharactersUncorrected, setWrongCharactersUncorrected] = useState(0);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [wrongCharactersTotal, setWrongCharactersTotal] = useState(0);
  const [bestWpm, setBestWpm] = useState(localStorage.getItem("bestWpm") || 0);
  const [difficulty, setDifficulty] = useState(sessionStorage.getItem("difficulty") || "medium");
  const [mode, setMode] = useState(sessionStorage.getItem("mode") || "timed60");
  const [text, setText] = useState('');

  const wpm = useMemo(() => {
    if(mode ===  "passage") {
      if(time === 0) return 0;
      return Math.floor(((typedText.length-wrongCharactersUncorrected)/5)/(time/60));
    } else {
      if(chosenTime-time === 0) return 0;
      return Math.floor(((typedText.length-wrongCharactersUncorrected)/5)/((chosenTime-time)/60));
    }
  }, [typedText, wrongCharactersUncorrected, chosenTime, time, mode]);

  const accuracy = useMemo(() => {
    if(typedCharacters === 0) return 0;
    return Math.floor(((typedCharacters-wrongCharactersTotal)/typedCharacters)*100);
  }, [typedCharacters, wrongCharactersTotal]);
  
  const changePage = useRef(true);

  const navigate = useNavigate();
  
  function startTyping() {
    setItStarted(true);
  }

  function formatTime(time) {
    const minute = Math.trunc(time/60);
    const sec = time-minute*60;
    return `${minute}:${sec<10 ? `0${sec}` : sec}`;
  }

  function resetPage() {
    setItStarted(false);
    setTime(chosenTime);
    setWrongCharactersTotal(0);
    setWrongCharactersUncorrected(0);
    setTypedText([]);
    setTypedCharacters(0);
    setCharIndex(0);
  }

  async function changeText() {
    const response = await fetch('/data.json');
    const data = await response.json();

    let index = Math.floor(Math.random()*data[difficulty].length);
    while(text === data[difficulty][index]["text"]){ 
      index = Math.floor(Math.random()*data[difficulty].length);
    }
    setText(data[difficulty][index]["text"]);
  }

  function restartTest() {
    resetPage();
    changeText();
  }

  function changeDifficulty(newDifficulty) {
    sessionStorage.setItem("difficulty", newDifficulty);
    setDifficulty(newDifficulty);
  } 

  function changeMode(newMode) {
    sessionStorage.setItem("mode", newMode);
    if(newMode === "passage") setChosenTime(0);
    else setChosenTime(newMode.slice(-2));
    setMode(newMode);
  }

  useEffect(() => {
    restartTest();
  }, [difficulty, mode]);

  useEffect(() => {
    if(!itStarted || time <= 0 || mode === "passage") return;

    const timeId = setTimeout(() => {
      setTime(time => time-1);
    }, 1000);

    return () => clearTimeout(timeId);
  }, [itStarted, time, mode]);

  useEffect(() => {
    if(!itStarted || mode !== "passage") return;

    const timeId = setTimeout(() => {
      setTime(time => time+1);
    }, 1000);

    return () => clearTimeout(timeId);
  }, [itStarted, time, mode]);

  useEffect(() => {
    if(itStarted && (time === 0 || typedText.length === text.length) && changePage.current) {
      if(mode === "passage" && time === 0) return;

      changePage.current = false;

      const query = new URLSearchParams();
      query.set('wpm', wpm);
      query.set('accuracy', accuracy);
      query.set('correctedCharacters', typedCharacters-wrongCharactersTotal);
      query.set('incorrectedCharacters', wrongCharactersTotal);
      
      if(wpm > bestWpm) {
        setBestWpm(wpm);
        localStorage.setItem("bestWpm", wpm);
        const isFirstTime = localStorage.getItem("isFirstTime") || "true";
        if(isFirstTime === "true") {
          localStorage.setItem("isFirstTime", "false");
          navigate(`/baseline-estabilished?${query.toString()}`);
        }
        else navigate(`/high-score-smashed?${query.toString()}`);
      } else {
        navigate(`/test-complete?${query.toString()}`);
      }

    }
  }, [itStarted, time, wpm, mode, accuracy, typedCharacters, wrongCharactersTotal, bestWpm, text, typedText, navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if(!itStarted) return;

      if(e.key === " " || e.key === `'` || e.key === "Tab") e.preventDefault();

      if(e.key === "Backspace")  {
        setTypedText(typedText => typedText.slice(0, -1));
        setWrongCharactersUncorrected(wrongCharactersUncorrected => {
          if(typedText[typedText.length-1] !== text[typedText.length-1]) return wrongCharactersUncorrected-1;
          return wrongCharactersUncorrected;
        });
        setCharIndex(charIndex => {
          if(charIndex>0) return charIndex-1;
          return charIndex;
        });
      } else if(e.key !== "Shift" && e.key !== "CapsLock") {
        setTypedText(typedText => [...typedText, e.key]);
        setWrongCharactersUncorrected(wrongCharactersUncorrected => {
          if(e.key !== text[typedText.length]) return wrongCharactersUncorrected+1;
          return wrongCharactersUncorrected;
        });
        setWrongCharactersTotal(wrongCharactersTotal => {
          if(e.key !== text[typedText.length]) return wrongCharactersTotal+1;
          return wrongCharactersTotal;
        });
        setTypedCharacters(typedCharacters => typedCharacters+1);
        setCharIndex(charIndex => charIndex+1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [itStarted, typedText, text]);

  return(
    <div className="flex flex-col items-center px-28 py-8 bg-(--neutral-900) min-h-screen gap-9">
      <Header bestWpm={bestWpm} />
      <div className='flex flex-col w-full gap-6'>
        <div className='flex justify-between items-center pb-3 border-b border-(--neutral-700)'>
          <div className='flex h-6 gap-4'>
            <p className='text-[20px] leading-[120%] tracking-[-0.6px] text-(--neutral-400)'>WPM:<span className='font-bold leading-[100%] tracking-[0%] text-[24px] text-(--neutral-0) ml-3'>{wpm}</span></p>
            <div className='w-px h-full bg-(--neutral-700)'></div>
            <p className='text-[20px] leading-[120%] tracking-[-0.6px] text-(--neutral-400)'>Accuracy:<span className={`font-bold leading-[100%] tracking-[0%] text-[24px] ${itStarted? (accuracy >= 90 ? (accuracy >= 95 ? 'text-(--green-500)' : 'text-(--yellow-400)') : 'text-(--red-500)') : 'text-(--neutral-0)'} ml-3`}>{accuracy}%</span></p>
            <div className='w-px h-full bg-(--neutral-700)'></div>
            <p className='text-[20px] leading-[120%] tracking-[-0.6px] text-(--neutral-400)'>Time:<span className={`font-bold leading-[100%] tracking-[0%] text-[24px] ${itStarted? (time>=10 ? 'text-(--yellow-400)' : 'text-(--red-500)') : 'text-(--neutral-0)'} ml-3`}>{formatTime(time)}</span></p>
          </div>
          <div className='flex h-7.75 gap-3'>
            <div className='flex gap-1.5 items-center'>
              <p className='pr-2 text-[16px] leading-[120%] tracking-[-0.48px] text-(--neutral-400)'>Difficulty:</p>
              <button onClick={() => changeDifficulty('easy')} className={`text-[16px] leading-[120%] tracking-[-0.48px] px-2.5 py-1.5 border rounded-lg ${difficulty === 'easy' ? 'border-(--blue-400) text-(--blue-400)' : 'border-(--neutral-500) text-(--neutral-0)'} hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer`}>Easy</button>
              <button onClick={() => changeDifficulty('medium')} className={`text-[16px] leading-[120%] tracking-[-0.48px] px-2.5 py-1.5 border rounded-lg ${difficulty === 'medium' ? 'border-(--blue-400) text-(--blue-400)' : 'border-(--neutral-500) text-(--neutral-0)'} hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer`}>Medium</button>
              <button onClick={() => changeDifficulty('hard')} className={`text-[16px] leading-[120%] tracking-[-0.48px] px-2.5 py-1.5 border rounded-lg ${difficulty === 'hard' ? 'border-(--blue-400) text-(--blue-400)' : 'border-(--neutral-500) text-(--neutral-0)'} hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer`}>Hard</button>
            </div>
            <div className='w-px h-full bg-(--neutral-700)'></div>
            <div className='flex items-center gap-1.5'>
              <p className='pr-1.5 text-[16px] leading-[120%] tracking-[-0.48px] text-(--neutral-400)'>Mode:</p>
              <button onClick={() => changeMode('timed60')} className={`text-[16px] leading-[120%] tracking-[-0.48px] px-2.5 py-1.5 border rounded-lg ${mode === 'timed60' ? 'border-(--blue-400) text-(--blue-400)' : 'border-(--neutral-500) text-(--neutral-0)'} hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer`}>Timed (60s)</button>
              <button onClick={() => changeMode('passage')} className={`text-[16px] leading-[120%] tracking-[-0.48px] px-2.5 py-1.5 border rounded-lg ${mode === 'passage' ? 'border-(--blue-400) text-(--blue-400)' : 'border-(--neutral-500) text-(--neutral-0)'} hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer`}>Passage</button>
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
        <button onClick={restartTest} className='flex justify-center items-center gap-2.5 bg-(--neutral-800) text-(--neutral-0) rounded-xl px-4 py-2.5 font-semibold hover:opacity-90 hover:cursor-pointer'>
          <p className='leading-[120%] tracking-[-0.3px]'>Restart Test</p>
          <img src={iconRestart} alt="" className='w-4 h-4 text-(--neutral-0)' />
        </button>
      </div>
    </div>
  );
}

export default Home;