import logoLarge from '../../assets/images/logo-large.svg';
import iconPersonalBest from '../../assets/images/icon-personal-best.svg'

function Started() {
  return(
    <div className="flex flex-col items-center px-28 py-8 bg-(--neutral-900) min-h-screen gap-16">
      <div className="flex w-full justify-between items-center">
        <img src={logoLarge} alt="" className='w-66.75 h-10' />
        <div className='flex items-center gap-2.5'>
          <img src={iconPersonalBest} alt="" className='w-[20.25px] h-4.5' />
          <p className='text-[18px] leading-[120%] tracking-[-0.6px] text-(--neutral-400)'>Personal best: <span className='text-(--neutral-0)'>92 WPM</span></p>
        </div>
      </div>
      <div className='flex flex-col w-full gap-8'>
        <div>
          {/* TODO: */}
        </div>
        <div></div>
      </div>
      <button></button>
    </div>
  );
}

export default Started;