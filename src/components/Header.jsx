import logoLarge from '../assets/images/logo-large.svg';
import logoSmall from '../assets/images/logo-small.svg';
import iconPersonalBest from '../assets/images/icon-personal-best.svg'

function Header({ bestWpm }) {
  return (
    <div className="flex w-full justify-between items-center">
      <img src={logoLarge} alt="" className='w-66.75 h-10 hidden width-470:block' />
      <img src={logoSmall} alt="" className='w-8 h-8 width-470:hidden' />
      <div className='flex items-center gap-2.5'>
        <img src={iconPersonalBest} alt="" className='w-[20.25px] h-4.5' />
        <p className='text-[18px] leading-[120%] tracking-[-0.6px] text-(--neutral-400)'><span className='hidden width-550:inline'>Personal</span> <span className='width-550:hidden'>B</span><span className='hidden width-550:inline'>b</span>est: <span className='text-(--neutral-0)'>{bestWpm} WPM</span></p>
      </div>
    </div>
  );
}

export default Header;