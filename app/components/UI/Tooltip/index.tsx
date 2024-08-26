import { useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { TooltipProps } from '@/app/interfaces';

const Tooltip = ({ text, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setIsVisible(!isVisible)} className="cursor-pointer">
        {children}
      </div>
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-xs rounded py-6 px-4 bg-stone-200 text-black z-50">
          {text}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-0 right-0 mt-1 mr-1 text-black"
          >
            <IoMdCloseCircleOutline className="text-[1.2rem]" />
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-8 border-t-stone-200 border-x-8 border-x-transparent top-full"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
