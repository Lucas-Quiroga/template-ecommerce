import React from "react";
import { SearchIcon } from "lucide-react";

/**
 * @component : este componente está en desuso, hay que implementar argolia con firebase para la busqueda de productos, será un feature más adelante.
 */

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = "Buscar...",
  className = "",
}) => {
  const [inputValue, setInputValue] = React.useState<string>("");

  const handleSearch = () => {
    onSearch(inputValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  console.log("SearchInput render", inputValue);

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="input w-full pr-10 pl-8 py-2 rounded-md bg-background shadow-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div
        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
        onClick={handleSearch}
      >
        <SearchIcon className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};
