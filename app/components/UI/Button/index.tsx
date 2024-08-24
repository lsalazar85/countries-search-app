import { ButtonProps } from '@/app/interfaces';

const Button = ({ onClick, content }: ButtonProps) => {
  return (
    <button
      className="bg-primary text-slate-200 text-white p-2 rounded ml-2"
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
