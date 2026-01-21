import iconRestart from '../../assets/images/icon-restart-white.svg'
import iconDownArrowWhite from '../../assets/images/icon-down-arrow-white.svg'
import iconDownArrowBlue from '../../assets/images/icon-down-arrow-blue.svg'
import { useEffect, useMemo, useRef, useState } from 'react';
import NotStarted from '../NotStarted/NotStarted'
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../components/Dropdown';

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
    if(mode === "timed120") return 120;
  });
  const [time, setTime] = useState(60);
  const [wrongCharactersUncorrected, setWrongCharactersUncorrected] = useState(0);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [wrongCharactersTotal, setWrongCharactersTotal] = useState(0);
  const [bestWpm, setBestWpm] = useState(localStorage.getItem("bestWpm") || 0);
  const [difficulty, setDifficulty] = useState(sessionStorage.getItem("difficulty") || "medium");
  const [mode, setMode] = useState(sessionStorage.getItem("mode") || "timed60");
  const [text, setText] = useState(`Learning a new skill takes patience and consistent practice. Whether you're studying a language, picking up an instrument, or mastering a sport, the key is to show up every day. Small improvements compound over time, and before you know it, you'll have made remarkable progress.`);
  const [timedMode, setTimedMode] = useState(sessionStorage.getItem("timedMode") || "60");
  const [hoverDifficulty, setHoverDifficulty] = useState(false);
  const [hoverMode, setHoverMode] = useState(false);
  const [isModeDropdown, setIsModeDropdown] = useState(false);
  const [isDifficultyDropdown, setIsDifficultyDropdown] = useState(false);

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
    setIsDifficultyDropdown(false);
  } 

  function changeMode(newMode) {
    sessionStorage.setItem("mode", newMode);
    if(newMode === "passage") setChosenTime(0);

    if(newMode === "timed15") {
      setChosenTime(15);
      setTimedMode(15);
      sessionStorage.setItem("timedMode", 15);
    } else if(newMode === "timed30") {
      setChosenTime(30);
      setTimedMode(30);
      sessionStorage.setItem("timedMode", 30);
    } else if(newMode === "timed60") {
      setChosenTime(60);
      setTimedMode(60);
      sessionStorage.setItem("timedMode", 60);
    } else if(newMode === "timed120") {
      setChosenTime(120);
      setTimedMode(120);
      sessionStorage.setItem("timedMode", 120);
    }
    setMode(newMode);
    setIsModeDropdown(false);
  }

  function formatDifficulty(difficulty) {
    if(difficulty === "") return "";
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
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
    <div className="flex flex-col items-center px-4 pt-4 pb-8 width-670:px-8 width-670:pt-8 width-670:pb-10 xl:px-28 xl:py-8 bg-(--neutral-900) min-h-screen gap-9">
      <Header bestWpm={bestWpm} />
      <div className='flex flex-col w-full gap-6'>
        <div className='flex flex-col justify-start items-start gap-4 width-1120:gap-0 width-1120:flex-row width-1120:justify-between width-1120:items-center pb-4 border-b border-(--neutral-700)'>
          <div className='w-full h-12 flex justify-around items-center gap-4 width-450:w-auto width-450:h-6 width-450:gap-4'>
            <div className='flex flex-col justify-start items-center width-450:flex-row width-450:gap-3 text-[20px] leading-[120%] tracking-[-0.6px] text-(--neutral-400) '>
              <p>WPM:</p>
              <p className='font-bold leading-[100%] tracking-[0%] text-[24px] text-(--neutral-0)'>{wpm}</p>
            </div>
            <div className='w-px h-full bg-(--neutral-700)'></div>
            <div className='flex flex-col justify-center items-center width-450:flex-row width-450:gap-3 text-[20px] leading-[120%] tracking-[-0.6px] text-(--neutral-400)'>
              <p>Accuracy:</p>
              <p className={`font-bold leading-[100%] tracking-[0%] text-[24px] ${itStarted? (accuracy >= 90 ? (accuracy >= 95 ? 'text-(--green-500)' : 'text-(--yellow-400)') : 'text-(--red-500)') : 'text-(--neutral-0)'}`}>{accuracy}%</p>
            </div>
            <div className='w-px h-full bg-(--neutral-700)'></div>
            <div className='flex flex-col width-450:flex-row width-450:gap-3 text-[20px] leading-[120%] tracking-[-0.6px] text-(--neutral-400)'>
              <p>Time:</p>
              <p className={`font-bold leading-[100%] tracking-[0%] text-[24px] ${itStarted && mode !== "passage"? (time>=10 ? 'text-(--yellow-400)' : 'text-(--red-500)') : 'text-(--neutral-0)'}`}>{formatTime(time)}</p>
            </div>
          </div>
          {/* Screen width greater than or equal to 640px*/}
          <div className='hidden width-640:flex h-7.75 gap-3'>
            <div className='flex gap-1.5 items-center'>
              <p className='pr-2 text-[16px] leading-[120%] tracking-[-0.48px] text-(--neutral-400)'>Difficulty:</p>
              <button onClick={() => changeDifficulty('easy')} className={`text-[16px] leading-[120%] tracking-[-0.48px] px-2.5 py-1.5 border rounded-lg ${difficulty === 'easy' ? 'border-(--blue-400) text-(--blue-400)' : 'border-(--neutral-500) text-(--neutral-0)'} hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer`}>Easy</button>
              <button onClick={() => changeDifficulty('medium')} className={`text-[16px] leading-[120%] tracking-[-0.48px] px-2.5 py-1.5 border rounded-lg ${difficulty === 'medium' ? 'border-(--blue-400) text-(--blue-400)' : 'border-(--neutral-500) text-(--neutral-0)'} hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer`}>Medium</button>
              <button onClick={() => changeDifficulty('hard')} className={`text-[16px] leading-[120%] tracking-[-0.48px] px-2.5 py-1.5 border rounded-lg ${difficulty === 'hard' ? 'border-(--blue-400) text-(--blue-400)' : 'border-(--neutral-500) text-(--neutral-0)'} hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer`}>Hard</button>
            </div>
            <div className='w-px h-full bg-(--neutral-700)'></div>
            <div className='flex items-center gap-1.5'>
              <p className='pr-1.5 text-[16px] leading-[120%] tracking-[-0.48px] text-(--neutral-400)'>Mode:</p>
              <div className='relative'>
                <button 
                  id="button-mode-dropdown"
                  onClick={() => setIsModeDropdown(isModeDropdown => !isModeDropdown)}
                  onMouseEnter={() => setHoverMode(true)}
                  onMouseLeave={()=> setHoverMode(false)}
                  className={`flex gap-2.5  text-[16px] leading-[120%] tracking-[-0.48px] px-2.5 py-1.5 border rounded-lg ${mode !== 'passage' ? 'border-(--blue-400) text-(--blue-400)' : 'border-(--neutral-500) text-(--neutral-0)'} hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer`}
                >
                  <p>Timed ({`${timedMode}`}s)</p>
                  <img 
                    src={mode !== "passage" || hoverMode ? iconDownArrowBlue : iconDownArrowWhite} 
                    alt="" 
                  />
                </button>
                {isModeDropdown &&
                  <Dropdown
                    textList={['Timed (15s)', 'Timed (30s)', 'Timed (60s)', 'Timed (120s)']}
                    textItem = {['timed15', 'timed30', 'timed60', 'timed120']}
                    chosenItem={mode}
                    changeItem={changeMode}
                    setItem={setIsModeDropdown}
                  />
                }
              </div>
              <button id="passage-mode" onClick={() => changeMode('passage')} className={`text-[16px] leading-[120%] tracking-[-0.48px] px-2.5 py-1.5 border rounded-lg ${mode === 'passage' ? 'border-(--blue-400) text-(--blue-400)' : 'border-(--neutral-500) text-(--neutral-0)'} hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer`}>Passage</button>
            </div>
          </div>
          {/*Screen width less than 640px*/}
          <div className='grid grid-cols-2 w-full width-640:hidden h-7.75 gap-2.5'>
            <div className='relative'>
              <button
                id='button-difficulty-dropdown'
                onClick={() => setIsDifficultyDropdown(!isDifficultyDropdown)}
                onMouseEnter={() => setHoverDifficulty(true)}
                onMouseLeave={()=> setHoverDifficulty(false)}
                className='w-full flex justify-center items-center py-1.5 gap-2.5 border border-(--neutral-500) rounded-lg text-(--neutral-0) hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer'
              >
                <p>{formatDifficulty(difficulty)}</p>
                <img 
                  src={hoverDifficulty ? iconDownArrowBlue : iconDownArrowWhite} 
                  alt="" 
                />
              </button>
              {isDifficultyDropdown &&
                <Dropdown 
                  textList={['Easy', 'Medium', 'Hard']}
                  textItem = {['easy', 'medium', 'hard']}
                  chosenItem={difficulty}
                  changeItem={changeDifficulty}
                  setItem={setIsDifficultyDropdown}
                />
              }
            </div>
            <div className='relative'>
              <button
              id='button-mode-dropdown-640'
                onClick={() => setIsModeDropdown(isModeDropdown => !isModeDropdown)}
                onMouseEnter={() => setHoverMode(true)}
                onMouseLeave={()=> setHoverMode(false)}
                className='w-full flex justify-center items-center py-1.5 gap-2.5 border border-(--neutral-500) rounded-lg text-(--neutral-0) hover:text-(--blue-400) hover:border-(--blue-400) hover:cursor-pointer'
              >
                <p>Timed ({`${timedMode}`}s)</p>
                <img 
                  src={hoverMode ? iconDownArrowBlue : iconDownArrowWhite} 
                  alt="" 
                />
              </button>
              {isModeDropdown &&
                <Dropdown 
                  textList={['Timed (15s)', 'Timed (30s)', 'Timed (60s)', 'Timed (120s)', 'Passage']}
                  textItem = {['timed15', 'timed30', 'timed60', 'timed120', 'passage']}
                  chosenItem={mode}
                  changeItem={changeMode}
                  setItem={setIsModeDropdown}
                />
              }
            </div>
          </div>
        </div>
        <div className={`relative ${!itStarted && 'px-1.25'}`}>
          {!itStarted && text !== '' && <NotStarted startTyping={startTyping}/>}
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
