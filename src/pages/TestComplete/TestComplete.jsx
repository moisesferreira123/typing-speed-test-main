import Header from "../../components/Header";
import Result from "../../components/Result";
import iconCompleted from "../../assets/images/icon-completed.svg"

function TestComplete() {
  return(
    <div className="flex flex-col items-center px-28 py-8 bg-(--neutral-900) min-h-screen gap-13">
      <Header />
      <div className="flex flex-col items-center gap-8">
        <img src={iconCompleted} alt="" className="w-16 h-16 ring-offset-16 ring-offset-(--green-500)/20 ring-16 ring-(--green-500)/10 rounded-full" />
        <Result 
          title={"Test Complete!"} 
          subtitle={"Solid run. Keep pushing to beat your high score."} 
          textButton={"Go Again"}
          isHighScore={false}
        />
      </div>
    </div>
  );
}

export default TestComplete;