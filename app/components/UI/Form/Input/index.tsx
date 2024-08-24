import { InputProps } from '@/app/interfaces';

const Index = ({ value, onChange, placeholder }: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border p-2 rounded text-secondaryBackground"
    />
  );
};

export default Index;
