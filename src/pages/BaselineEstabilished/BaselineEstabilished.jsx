import Header from "../../components/Header";
import Result from "../../components/Result";
import iconCompleted from "../../assets/images/icon-completed.svg";
import patternStar1 from "../../assets/images/pattern-star-1.svg";
import patternStar2 from "../../assets/images/pattern-star-2.svg";
import { useSearchParams } from "react-router-dom";
import { getPosition } from "../../api/leaderboard";
import { useEffect, useState } from "react";
import TransitionOverlay from "../../components/TransitionOverlay";
import LeaderboardRegistrationModal from "../../components/LeaderboardRegistrationModal";

function BaselineEstabilished() {
  const [searchParams] = useSearchParams();
  const wpm = searchParams.get('wpm');
  const accuracy = searchParams.get('accuracy');
  const correctedCharacters = searchParams.get('correctedCharacters');
  const incorrectedCharacters = searchParams.get('incorrectedCharacters');

  const bestWpm = localStorage.getItem("bestWpm");
  const date =  new Date().toISOString();

  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [isTop10, setIsTop10] = useState(false);
  const [isTransition, setIsTransition] = useState(true);
  const [position, setPosition] = useState('');

  function getSubtitleTop10(pos) {
    if (pos === 1) return "UNBELIEVABLE! On your first try, you've just dethroned everyone to become World #1. A new era of typing starts today!";
    if (pos === 2) return "PURE TALENT! You've just stormed the world stage and seized the #2 spot on your very first run. The throne is officially in danger!";
    if (pos === 3) return "STUNNING DEBUT! You've secured a World Top 3 podium on your first attempt. You've officially skipped the line and joined the elite!";
    return `WHAT AN ENTRANCE! You’ve broken into the World Top 10 at Rank #${pos} on your first ever test. A rising star has arrived!`;
  }

  function getModalDescriptionTop10(pos) {
    if (pos === 1) return "A legendary start! You've taken World #1 on your very first try. Enter your name to immortalize this historic debut.";
    if (pos === 2) return "First run, and already World #2! Put your name on the leaderboard to let the world know a new challenger has arrived.";
    if (pos === 3) return "Incredible debut! You've secured a Top 3 spot on your first ever test. Record your name to claim your place on the global podium.";
    return "What an entrance! You're already in the World Top 10. Enter your name to join the elite Hall of Fame on your first try.";
  }

  useEffect(() => {
    async function getPos() {
      try {
        const position = await getPosition(wpm, accuracy, date);
        return position;
      } catch(err) {
        console.error(`Error searching for user by ID. ${err}`);
        alert('Error searching for user by ID.');
      }
    }

    async function handleGetPosition() {
      const data = await getPos();
      const position = data.position;
      if(position === null) {
        setSubtitle(`You've set the bar. Now the real challenge begins - time to beat it.`)
      } else if(position <= 10) { 
        setIsTop10(true);
        setSubtitle(getSubtitleTop10(position));
        setDescription(getModalDescriptionTop10(position));
      } else if (position <= 100) {
        setSubtitle(`What a debut! On your very first run, you've already claimed Rank #${position} worldwide. A natural-born speedster!`);
      } else {
        setSubtitle(`You've set the bar. Now the real challenge begins - time to beat it.`)
      }
      setPosition(position);
      setIsTransition(false);
    }
  
    handleGetPosition();
  }, [wpm, accuracy, date]);

  return(
    <div className="flex flex-col items-center px-4 pt-4 pb-8 width-670:px-8 width-670:pt-8 width-670:pb-10 xl:px-28 xl:py-8 bg-(--neutral-900) min-h-screen gap-18 width-670:gap-13">
      {isTransition && <TransitionOverlay />}
      {!isTransition && 
        <>
          <Header bestWpm={bestWpm} />
          {isTop10 && 
            <LeaderboardRegistrationModal 
              wpm={wpm}
              accuracy={accuracy}
              position={position}
              description={description}
              closeModal = {() => setIsTop10(false)}
            />
          }
          <div className="flex flex-col items-center gap-8">
            <img src={iconCompleted} alt="" className="w-16 h-16 ring-offset-16 ring-offset-(--green-500)/20 ring-16 ring-(--green-500)/10 rounded-full" />
            <Result 
              title={"Baseline Estabilished!"} 
              subtitle={subtitle} 
              textButton={"Beat This Score"}
              wpm={wpm}
              accuracy={accuracy}
              correctedCharacters={correctedCharacters}
              incorrectedCharacters={incorrectedCharacters}
            />
          </div>
          <img src={patternStar1} alt="" className="fixed w-9.75 h-9.75 left-[calc(100vw*0.8)] top-180 width-550:top-130 width-550:w-18.5 width-550:h-18.5 width-550:left-[calc(100vw*0.84)]" />
          <img src={patternStar2} alt="" className="fixed w-5.25 h-5.25 left-[calc(100vw*0.07)] top-32 width-550:w-8 width-550:h-8 width-550:left-[calc(100vw*0.085)] width-550:top-55" />
        </>
      }
    </div>
  );
}

export default BaselineEstabilished;