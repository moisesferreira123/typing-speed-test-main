import Header from "../../components/Header";
import Result from "../../components/Result";
import iconNewPb from "../../assets/images/icon-new-pb.svg"
import patternConfetti from "../../assets/images/pattern-confetti.svg"
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPositionById } from "../../api/leaderboard";
import TransitionOverlay from "../../components/TransitionOverlay";
import LeaderboardRegistrationModal from "../../components/LeaderboardRegistrationModal";

function HighScoreSmashed() {
  const [searchParams] = useSearchParams();
  const wpm = searchParams.get('wpm');
  const accuracy = searchParams.get('accuracy');
  const correctedCharacters = searchParams.get('correctedCharacters');
  const incorrectedCharacters = searchParams.get('incorrectedCharacters');
  const id = searchParams.get('id'); 

  const bestWpm = localStorage.getItem("bestWpm");

  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [isTop10, setIsTop10] = useState(false);
  const [isTransition, setIsTransition] = useState(true);
  const [position, setPosition] = useState('');

  async function getPosition(id) {
    try {
      const position = await getPositionById(id);
      return position;
    } catch(err) {
      console.error(`Error searching for user by ID. ${err}`);
      alert('Error searching for user by ID.');
    }
  }

  function getSubtitleTop10(pos) {
    if (pos === 1) return "UNSTOPPABLE! You just shattered your record and seized the World #1 spot! You are the ultimate typing champion.";
    if (pos === 2) return "LEGENDARY! A new personal best has propelled you to World #2! You're just one breath away from the throne.";
    if (pos === 3) return "ELITE PERFORMANCE! You've crushed your record and secured World #3. The global podium now belongs to you!";
    return `OUTSTANDING! You just smashed your record and entered the Hall of Fame at Rank #${pos}. You are among the fastest souls alive!`;
  }

  function getModalDescriptionTop10(pos) {
    if (pos === 1) return "The World #1 spot is yours! Enter your username to claim your throne and solidify your legend.";
    if (pos === 2) return "You've climbed to World #2! Put your name on the board and let everyone know who's coming for #1.";
    if (pos === 3) return "A global podium finish! Record your name now to secure your bronze-tinted glory in the Top 3.";
    return "Outstanding! You've broken into the World Top 10. Enter your name to join the elite Hall of Fame.";
  }

  useEffect(() => {
      async function handleGetPosition() {
        const data = await getPosition(id);
        const position = data.position;
        if(position === null) {
          setSubtitle("New Personal Best! You're getting closer to the elite with every test.")
        } else if(position <= 10) { 
          setIsTop10(true);
          setSubtitle(getSubtitleTop10(position));
          setDescription(getModalDescriptionTop10(position));
        } else if (position <= 100) {
          setSubtitle(`Incredible! You've crushed your record and seized Rank #${position} on the global stage!`)
        } else {
          setSubtitle(`You're getting faster. That was increadible typing.`)
        }
        setPosition(position);
        setIsTransition(false);
      }
  
      handleGetPosition();
    }, [id]);

  return(
    <div className="flex flex-col items-center px-4 pt-4 pb-8 width-670:px-8 width-670:pt-8 width-670:pb-10 xl:px-28 xl:py-8 bg-(--neutral-900) min-h-screen gap-9 ">
      {isTransition && <TransitionOverlay />}
      {!isTransition && 
        <>
          <Header bestWpm={bestWpm} />
          {isTop10 && 
            <LeaderboardRegistrationModal 
              id={id}
              position={position}
              description={description}
              closeModal = {() => setIsTop10(false)}
            />
          }
          <div className="flex flex-col items-center z-5">
            <img src={iconNewPb} alt="" className="w-20 h-20 " />
            <Result 
              title={"High Scored Smashed!"} 
              subtitle={subtitle} 
              textButton={"Beat This Score"}
              wpm={wpm}
              accuracy={accuracy}
              correctedCharacters={correctedCharacters}
              incorrectedCharacters={incorrectedCharacters}
            />
          </div>
          <img src={patternConfetti} alt="" className="fixed bottom-0 z-1 w-screen object-cover min-h-40" />
        </>
      }
    </div>
  );
}

export default HighScoreSmashed;