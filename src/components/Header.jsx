import logoLarge from '../assets/images/logo-large.svg';
import logoSmall from '../assets/images/logo-small.svg';
import iconPersonalBest from '../assets/images/icon-personal-best.svg'
import { ChartNoAxesColumn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Header({ bestWpm, itStarted=false, hasLeaderborder=false }) {
  const navigate = useNavigate();

  function goToLeaderboard() {
    if(!itStarted) navigate('/leaderboard');
  }

  return (
    <div className="flex w-full justify-between items-center">
      <img src={logoLarge} alt="" className='w-66.75 h-10 hidden width-500:block' />
      <img src={logoSmall} alt="" className='w-8 h-8 width-500:hidden' />
      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-2.5'>
          <img src={iconPersonalBest} alt="" className='w-[20.25px] h-4.5' />
          <p className='text-[18px] leading-[120%] tracking-[-0.6px] text-(--neutral-400)'><span className='hidden width-590:inline'>Personal</span> <span className='width-590:hidden'>B</span><span className='hidden width-590:inline'>b</span>est: <span className='text-(--neutral-0)'>{bestWpm} WPM</span></p>
        </div>
        {hasLeaderborder && 
          <button onClick={goToLeaderboard} className={`px-2 py-1.5 border rounded-lg border-(--neutral-500) text-(--neutral-0) ${itStarted ? 'hover:cursor-not-allowed' : 'hover:hover:cursor-pointer hover:text-(--blue-400) hover:border-(--blue-400)'}`}>
            <ChartNoAxesColumn size={16} />
          </button>
        }
      </div>
      
    </div>
  );
}

export default Header;