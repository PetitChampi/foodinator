import React from "react";
import { Icon } from "./Icon";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  "data-testid"?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  "data-testid": testId,
}) => {
  return (
    <div className={`search-input-container ${className}`}>
      <Icon name="search" className="search-input-icon" />
      <input
        type="text"
        className="search-input-field"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid={testId}
      />
    </div>
  );
};
