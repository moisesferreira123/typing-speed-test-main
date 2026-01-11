import Header from "../../components/Header";
import Result from "../../components/Result";

function TestComplete() {
  return(
    <div className="flex flex-col items-center px-28 py-8 bg-(--neutral-900) min-h-screen gap-9">
      <Header></Header>
      <Result></Result>
    </div>
  );
}

export default TestComplete;