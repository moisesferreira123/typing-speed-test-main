import Header from "../../components/Header";
import Result from "../../components/Result";
import iconCompleted from "../../assets/images/icon-completed.svg";
import patternStar1 from "../../assets/images/pattern-star-1.svg";
import patternStar2 from "../../assets/images/pattern-star-2.svg";

function BaselineEstabilished() {
  return(
    <div className="flex flex-col items-center px-28 py-8 bg-(--neutral-900) min-h-screen gap-13">
      <Header />
      <div className="flex flex-col items-center gap-8">
        <img src={iconCompleted} alt="" className="w-16 h-16 ring-offset-16 ring-offset-(--green-500)/20 ring-16 ring-(--green-500)/10 rounded-full" />
        <Result 
          title={"Baseline Estabilished!"} 
          subtitle={"You've set the bar. Now the real challenge begins - time to beat it."} 
          textButton={"Beat This Score"}
          isHighScore={false}
        />
      </div>
      <img src={patternStar1} alt="" className="fixed left-[calc(100vw*0.87)] top-115 " />
      <img src={patternStar2} alt="" className="fixed left-[calc(100vw*0.085)] top-55 " />
    </div>
  );
}

export default BaselineEstabilished;