function DropdownCircle({chosen}) {
  return (
    <div className={`rounded-full flex justify-center items-center ${chosen ? "bg-(--blue-400)" : "border border-(--neutral-0)"} w-4 h-4`}>
      {chosen && <div className="rounded-full bg-(--neutral-900) w-1.5 h-1.5"></div>}
    </div>
  );
};

export default DropdownCircle;