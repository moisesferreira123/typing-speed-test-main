import Header from "../../components/Header";
import Result from "../../components/Result";
import iconCompleted from "../../assets/images/icon-completed.svg";
import patternStar1 from "../../assets/images/pattern-star-1.svg";
import patternStar2 from "../../assets/images/pattern-star-2.svg";
import { useSearchParams } from "react-router-dom";
import { getPosition } from "../../api/leaderboard";
import { useEffect, useState } from "react";
import LeaderboardRegistrationModal from "../../components/LeaderboardRegistrationModal";
import TransitionOverlay from "../../components/TransitionOverlay";

function TestComplete() {
  const [searchParams] = useSearchParams();
  const wpm = searchParams.get('wpm');
  const accuracy = searchParams.get('accuracy');
  const correctedCharacters = searchParams.get('correctedCharacters');
  const incorrectedCharacters = searchParams.get('incorrectedCharacters');
  
  const bestWpm = localStorage.getItem("bestWpm");

  const [subtitle, setSubtitle] = useState('');
  const [isTop10, setIsTop10] = useState(false);
  const [isTransition, setIsTransition] = useState(true);
  const [position, setPosition] = useState('');
  const [date] = useState(new Date().toISOString());

  useEffect(() => {
    async function getPos() {
      try {
        const position = await getPosition(wpm, accuracy, date);
        return position;
      } catch(err) {
        console.error(`Error searching for position. ${err}`);
        alert('Error searching for position.');
      }
    }

    async function handleGetPosition() {
      const data = await getPos();
      const position = data.position;
      if(position === null) {
        setSubtitle("Keep pushing! The leaderboard is just a few words away.")
      } else if(position <= 10) { 
        setIsTop10(true);
        setSubtitle(`Not a new record, but you've proven your speed again by ranking #${position} among the Top 10!`);
      } else if (position <= 100) {
        setSubtitle(`Impressive! You've secured position #${position}. The Top 10 is within your reach!`)
      } else {
        setSubtitle(`Solid run. Keep pushing to beat your high score.`)
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
              description={'Another elite run! Enter your username to log this performance in the Top 10'}
              closeModal={() => setIsTop10(false)}
            />
          }
          <div className="flex flex-col items-center gap-8">
            <img src={iconCompleted} alt="" className="w-12 h-12 ring-offset-8 ring-8 width-450:w-16 width-450:h-16 width-450:ring-offset-16 ring-offset-(--green-500)/20 width-450:ring-16 ring-(--green-500)/10 rounded-full" />
            <Result 
              title={"Test Complete!"} 
              subtitle={subtitle} 
              textButton={"Go Again"}
              wpm={wpm}
              accuracy={accuracy}
              correctedCharacters={correctedCharacters}
              incorrectedCharacters={incorrectedCharacters}
            />
          </div>
          <img src={patternStar1} alt="" className="fixed w-9.75 h-9.75 left-[calc(100vw*0.8)] top-180 width-550:top-130 width-550:w-18.5 width-550:h-18.5 width-550:left-[calc(100vw*0.84)] " />
          <img src={patternStar2} alt="" className="fixed w-5.25 h-5.25 left-[calc(100vw*0.07)] top-32 width-550:w-8 width-550:h-8 width-550:left-[calc(100vw*0.085)] width-550:top-55" />
        </>
      }
    </div>
  );
}

export default TestComplete;