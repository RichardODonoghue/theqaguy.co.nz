import { useState } from "react";
import { Button } from "../ui/button";

interface EditorDropdownProps {
  options: string[];
  label: string;
  onClick: (arg0: string) => void;
  disabled: boolean;
  defaultValue: string;
}

export const EditorDropdown = ({
  options,
  label,
  onClick,
  disabled = false,
  defaultValue,
}: EditorDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>(defaultValue || "");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelection = (option: string) => {
    console.log(option);
    setSelection(option);

    if (onClick) onClick(option);
    setShowDropdown(false);
  };

  return (
    <Button onClick={toggleDropdown} disabled={disabled} className="relative">
      {`${label}: ${selection}`}
      {showDropdown && (
        <div className="bg-slate-700 absolute top-9 w-full z-50 rounded-sm">
          {options.map((option, index) => (
            <option
              key={`${option}-${index}`}
              onClick={() => handleSelection(option)}
              className="p-2 hover:bg-accent rounded-sm"
              value={option}
            >
              {option}
            </option>
          ))}
        </div>
      )}
    </Button>
  );
};
