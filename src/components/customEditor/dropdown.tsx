import { useState } from 'react';
import { Button } from '../ui/button';

interface EditorDropdownProps {
  options: string[];
  label: string;
  onClick: (arg0: string) => void;
  disabled?: boolean;
  defaultValue?: string;
}

export const EditorDropdown = ({
  options,
  label,
  onClick,
  disabled = false,
  defaultValue,
}: EditorDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>(defaultValue || '');

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSelection = (option: string) => {
    setSelection(option);
    onClick(option);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <Button onClick={toggleDropdown} disabled={disabled} className="relative">
        {`${label}: ${selection}`}
      </Button>
      {showDropdown && (
        <div className="bg-slate-700 absolute w-full z-50 rounded-sm">
          {options.map((option, index) => (
            <div
              key={`${option}-${index}`}
              onClick={() => handleSelection(option)}
              className="p-2 hover:bg-accent rounded-sm"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
