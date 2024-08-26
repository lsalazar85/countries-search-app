import { InputProps } from '@/app/interfaces';

const Input = ({ value, onChange, placeholder }: InputProps) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="border p-2 rounded text-secondaryBackground"
  />
);

export default Input;
