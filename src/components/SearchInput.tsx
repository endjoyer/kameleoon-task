import { Search } from 'lucide-react';
import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  testsCount: number;
  inputRef: React.RefObject<HTMLInputElement>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  testsCount,
  inputRef,
}) => {
  return (
    <div className="dashboard__search">
      <Search className="dashboard__search-icon" />
      <input
        ref={inputRef}
        type="text"
        placeholder="What test are you looking for?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="dashboard__search-count">{testsCount} tests</span>
    </div>
  );
};

export default SearchInput;
