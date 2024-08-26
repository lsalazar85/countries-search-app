import { ButtonProps } from '@/app/interfaces';

const Button = ({ onClick, content, styles }: ButtonProps) => (
  <button
    className={styles || 'bg-primary text-white py-2 px-4 rounded'}
    onClick={onClick}
  >
    {content}
  </button>
);

export default Button;
