import Header from "../../components/Header";
import Result from "../../components/Result";
import iconCompleted from "../../assets/images/icon-completed.svg";
import patternStar1 from "../../assets/images/pattern-star-1.svg";
import patternStar2 from "../../assets/images/pattern-star-2.svg";
import { useSearchParams } from "react-router-dom";

function BaselineEstabilished() {
  const [searchParams] = useSearchParams();
  const wpm = searchParams.get('wpm');
  const accuracy = searchParams.get('accuracy');
  const correctedCharacters = searchParams.get('correctedCharacters');
  const incorrectedCharacters = searchParams.get('incorrectedCharacters');

  const bestWpm = localStorage.getItem("bestWpm");

  return(
    <div className="flex flex-col items-center px-4 pt-4 pb-8 width-670:px-8 width-670:pt-8 width-670:pb-10 xl:px-28 xl:py-8 bg-(--neutral-900) min-h-screen gap-18 width-670:gap-13">
      <Header bestWpm={bestWpm} />
      <div className="flex flex-col items-center gap-8">
        <img src={iconCompleted} alt="" className="w-16 h-16 ring-offset-16 ring-offset-(--green-500)/20 ring-16 ring-(--green-500)/10 rounded-full" />
        <Result 
          title={"Baseline Estabilished!"} 
          subtitle={"You've set the bar. Now the real challenge begins - time to beat it."} 
          textButton={"Beat This Score"}
          wpm={wpm}
          accuracy={accuracy}
          correctedCharacters={correctedCharacters}
          incorrectedCharacters={incorrectedCharacters}
        />
      </div>
      <img src={patternStar1} alt="" className="fixed w-9.75 h-9.75 left-[calc(100vw*0.8)] top-190 width-550:w-18.5 width-550:h-18.5 width-550:left-[calc(100vw*0.84)] width-550:top-140 " />
      <img src={patternStar2} alt="" className="fixed w-5.25 h-5.25 left-[calc(100vw*0.07)] top-32 width-550:w-8 width-550:h-8 width-550:left-[calc(100vw*0.085)] width-550:top-55" />
    </div>
  );
}

export default BaselineEstabilished;