import Header from "../../components/Header";
import Result from "../../components/Result";
import iconNewPb from "../../assets/images/icon-new-pb.svg"
import patternConfetti from "../../assets/images/pattern-confetti.svg"
import { useSearchParams } from "react-router-dom";

function HighScoreSmashed() {
  const [searchParams] = useSearchParams();
  const wpm = searchParams.get('wpm');
  const accuracy = searchParams.get('accuracy');
  const correctedCharacters = searchParams.get('correctedCharacters');
  const incorrectedCharacters = searchParams.get('incorrectedCharacters');

  const bestWpm = localStorage.getItem("bestWpm");

  return(
    <div className="flex flex-col items-center px-28 py-8 bg-(--neutral-900) min-h-screen gap-9 ">
      <Header bestWpm={bestWpm} />
      <div className="flex flex-col items-center z-5">
        <img src={iconNewPb} alt="" className="w-20 h-20 " />
        <Result 
          title={"High Scored Smashed!"} 
          subtitle={"You're getting faster. THat was increadible typing."} 
          textButton={"Beat This Score"}
          wpm={wpm}
          accuracy={accuracy}
          correctedCharacters={correctedCharacters}
          incorrectedCharacters={incorrectedCharacters}
        />
      </div>
      <img src={patternConfetti} alt="" className="fixed bottom-0 z-1 w-screen object-cover" />
    </div>
  );
}

export default HighScoreSmashed;