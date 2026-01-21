import React, { useEffect, useRef } from "react";
import DropdownCircle from "./DropdownCircle";

function Dropdown({ textList, textItem, chosenItem, changeItem, setItem }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        const button = event.target.closest("button");
        if(!button || 
          (button.id !== "button-mode-dropdown" && 
            button.id !== "button-difficulty-dropdown" &&
            button.id !== "button-mode-dropdown-640" && 
            event.target.id !== "passage-mode" 
          )) {
          setItem(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setItem]);

  return (
    <div ref={dropdownRef} className="absolute min-w-full z-50 bg-(--neutral-800) rounded-lg width-640:top-9 top-10 ">
      {textList.map((item, index) => (
        <React.Fragment key={index}>
          <button onClick={() => changeItem(textItem[index])} key={index} className={`min-w-full w-40 flex items-center gap-3 px-2.5 ${index === 0 ? 'pt-2.5 rounded-t-lg' : 'pt-2'} ${index === textList.length-1 ? 'pb-2.5 rounded-b-lg' : 'pb-2'} hover:bg-(--neutral-700) hover:cursor-pointer`}>
            <DropdownCircle chosen={textItem[index] === chosenItem ? true : false} />
            <p className="leading-[120%] tracking-[-0.3px] text-(--neutral-0)">{item}</p>
          </button>
          {index !== textList.length-1 && <div className="w-full border-t border-(--neutral-700) "></div>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Dropdown;