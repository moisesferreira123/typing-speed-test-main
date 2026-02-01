function TransitionOverlay() {
  return (
    <div className="fixed inset-0 z-100 bg-(--neutral-900) backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-ring w-10 text-(--blue-600)"></span>
          <h2 className="text-(--neutral-0) font-['Sora'] font-bold tracking-tight animate-pulse">
            Analyzing Performance...
          </h2>
          <p className="text-(--neutral-500) text-sm font-['Sora']">
            Calculating your rank and stats
          </p>
        </div>
      </div>
  );
}

export default TransitionOverlay;