import { useState } from "react";
import { updateUsernameById } from "../api/leaderboard";

function LeaderboardRegistrationModal({ id, position, description, closeModal }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState('');
  const [shake, setShake] = useState(0);

  const rankStyles = {
    1: {
      title: "ULTIMATE CHAMPION",
      color: "text-yellow-300",
      focusColor: "group-focus-within:text-yellow-300",
      focusBorder: "focus:border-yellow-300",
      focusRingInput: "focus:ring-yellow-300",
      shadow: "shadow-[0_0_20px_rgba(250,204,21,0.3)]",
      icon: "🥇",
      bg: "bg-(--yellow-400)/10",
      ring: "ring-(--yellow-400)/30",
      button: "bg-yellow-300 hover:bg-[#fde047] text-black shadow-yellow-500/20"
    },
    2: {
      title: "ELITE CHALLENGER",
      color: "text-slate-300",
      focusColor: "group-focus-within:text-slate-300",
      focusBorder: "focus:border-slate-300",
      focusRingInput: "focus:ring-slate-300",
      shadow: "shadow-[0_0_20px_rgba(203,213,225,0.2)]",
      icon: "🥈",
      bg: "bg-slate-300/10",
      ring: "ring-slate-300/30",
      button: "bg-slate-200 hover:bg-white text-slate-900 shadow-slate-400/20",
    },
    3: {
      title: "MASTER TYPIST",
      color: "text-orange-400",
      focusColor: "group-focus-within:text-orange-400",
      focusBorder: "focus:border-orange-400",
      focusRingInput: "focus:ring-orange-400",
      shadow: "shadow-[0_0_20px_rgba(251,146,60,0.2)]",
      icon: "🥉",
      bg: "bg-orange-400/10",
      ring: "ring-orange-400/30",
      button: "bg-orange-500 hover:bg-orange-400 text-white shadow-orange-600/20"
    },
    default: {
      title: "TOP 10 ELITE",
      color: "text-(--blue-400)",
      focusColor: "group-focus-within:text-(--blue-400)",
      focusBorder: "focus:border-(--blue-400)",
      focusRingInput: "focus:ring-(--blue-400)",
      shadow: "shadow-[0_0_20px_rgba(23,125,255,0.2)]",
      icon: "🎖️",
      bg: "bg-(--blue-600)/10",
      ring: "ring-(--blue-600)/30",
      button: "bg-(--blue-600) hover:bg-(--blue-400) text-white shadow-blue-600/20"
    }
  };

  const style = position < 4 ? rankStyles[position] : rankStyles.default;

  async function handleRegister() {
    if(username.trim() === '') {
      console.log('Please enter a username!');
      setInputError('Please enter a username!');
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    setLoading(true);

    try {
      await updateUsernameById(id, username);
    } catch(err) {
      console.error(`Input invalid: ${err}`);
    } finally {
      setLoading(false);
      closeModal();
    }
  }

  return (
    <dialog className="modal modal-open font-['Sora']">
      <div className="modal-backdrop bg-black/70 backdrop-blur-sm"></div>
      
      {/* Adicionei o shadow dinâmico no modal-box */}
      <div className={`modal-box bg-(--neutral-900) border border-(--neutral-800) p-8 transition-all duration-500 ${style.shadow}`}>
        
        <div className="flex flex-col items-center text-center mb-6">
          {/* Círculo do Ícone Dinâmico */}
          <div className={`w-20 h-20 rounded-full ${style.bg} flex items-center justify-center mb-4 ring-1 ${style.ring} animate-in zoom-in duration-500`}>
             <span className="text-4xl">{style.icon}</span>
          </div>
          
          {/* Título com cor diferenciada */}
          <h2 className={`text-3xl font-black tracking-tighter ${style.color} italic`}>
            {style.title}
          </h2>
          
          <p className="w-full text-(--neutral-400) mt-3 text-sm leading-relaxed ">
            {description}
          </p>
        </div>

        <div className="form-control w-full group">
          <label className="label mb-1">
            <span className={`pl-1 label-text text-[10px] font-black uppercase tracking-[0.2em] ${inputError ? 'text-(--red-500)' : `text-(--neutral-500) ${style.focusColor}`} transition-colors`}>
              PLAYER USERNAME
            </span>
          </label>
          <input 
            type="text"
            value={username}
            placeholder="How should the world call you?" 
            className={`w-full bg-(--neutral-800) border text-(--neutral-0) ${shake ? 'animate-shake' : ''} ${inputError ? `border-(--red-500) focus:ring-(--red-500)` : `border-(--neutral-700) ${style.focusBorder} ${style.focusRingInput}`} focus:ring-1  focus:outline-none rounded-xl px-4 py-3 transition-all placeholder:text-(--neutral-700) font-medium `}
            onChange={(event) => {
              setUsername(event.target.value);
              setInputError('');
            }}
            autoFocus
          />
          {inputError && <span className="pl-1 pt-1 text-(--red-500) text-[12px] font-bold tracking-wide flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200">{inputError}</span>}
        </div>

        <div className="modal-action mt-8">
          <form method="dialog" className="w-full">
            <button 
              onClick={handleRegister} 
              disabled={loading}
              className={`w-full h-13 flex justify-center items-center rounded-xl font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg cursor-pointer ${style.button}`}
            >
              {loading ? 
                <span>Registering<span className="loading loading-dots loading-xs"></span></span>
              : 'Register Score'}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
export default LeaderboardRegistrationModal;
