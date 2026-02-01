function LoadingScreen() {
  return (
    <div className="flex items-center justify-center pt-5">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-neutral-300 border-t-(--blue-400)" />
    </div>
  );
}

export default LoadingScreen;