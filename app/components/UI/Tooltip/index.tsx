import { ReactNode, useState } from 'react';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className="relative">
      <div onClick={handleToggle} className="cursor-pointer">
        {children}
      </div>
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-xs rounded py-1 px-2 bg-primary text-white">
          {text}
          <button
            onClick={handleClose}
            className="absolute top-0 right-0 mt-1 mr-1 text-white"
          >
            X
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-8 border-t-primary border-x-8 border-x-transparent top-full"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
