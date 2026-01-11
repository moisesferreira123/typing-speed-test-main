function NotStarted({startTyping}) {

  function handleClickOnText(e) {
    if(e.target.id === 'not-started-modal') {
      startTyping();
    }
  }
  
  return (
    <div onClick={(e) => handleClickOnText(e)} id="not-started-modal" className='absolute inset-0 flex justify-center items-center bg-(--neutral-900)/40 backdrop-blur-[5px] text-(--neutral-0)'>
      <div className="flex flex-col items-center gap-3.75 ">
        <button onClick={startTyping} className="font-semibold text-base leading-[120%] tracking-[-0.3px] px-5 py-4 rounded-xl bg-(--blue-600) hover:bg-(--blue-400) hover:cursor-pointer">Start Typing Test</button>
        <p className="font-semibold text-base leading-[120%] tracking-[-0.3px]">Or click the text and start typing</p>
      </div>
    </div>
  )
}

export default NotStarted
