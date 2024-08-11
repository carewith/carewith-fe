import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { IoSearch, IoClose } from "react-icons/io5";
import { useDrugStore, useSearchStore } from "@/store/drugStore";
import debounce from "lodash.debounce";

type AutocompleteResult = string;

type SearchBarProps = {
  initialValue?: string;
  onSearch?: (keyword: string) => void;
};

const SearchBar = ({ initialValue = "", onSearch }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [suggestions, setSuggestions] = useState<AutocompleteResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setKeyword, clearKeyword } = useSearchStore();
  const { searchDrugs } = useDrugStore();

  const fetchSuggestions = async (keyword: string) => {
    if (keyword) {
      try {
        const response = await fetch(
          `https://api.carewith.life/api/v1/drug/autocomplete?keyword=${keyword}`
        );
        const data = await response.json();
        setSuggestions(data.data.names || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const debouncedFetchSuggestions = useRef(
    debounce((keyword: string) => fetchSuggestions(keyword), 300)
  ).current;

  useEffect(() => {
    debouncedFetchSuggestions(inputValue);
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (suggestion: AutocompleteResult) => {
    setKeyword(suggestion);
    searchDrugs(suggestion);
    if (onSearch) {
      onSearch(suggestion);
    }
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setShowSuggestions(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(e.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  const clearInput = () => {
    setInputValue("");
    clearKeyword();
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const highlightMatch = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Highlight key={index}>{part}</Highlight>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <SearchBarWrapper ref={searchBarRef}>
      <SearchBarContainer>
        <IoSearch color="#808AAB" />
        <SearchInput
          ref={inputRef}
          placeholder="약 이름, @@, @@으로 검색"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
        />
        {inputValue && (
          <ClearIcon onClick={clearInput}>
            <IoClose size={20} color="#35373e" />
          </ClearIcon>
        )}
      </SearchBarContainer>
      {showSuggestions && suggestions.length > 0 && (
        <SuggestionsContainer>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {highlightMatch(suggestion, inputValue)}
            </SuggestionItem>
          ))}
        </SuggestionsContainer>
      )}
    </SearchBarWrapper>
  );
};

export default SearchBar;

const SearchBarWrapper = styled.div`
  position: relative;
`;

const SearchBarContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grey.background};
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey.grey01};
`;

const ClearIcon = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px;
`;

const SuggestionsContainer = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem 0;
  margin: 0;
`;

const SuggestionItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey.background};
  }
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary.blue02};
  font-weight: 500;
`;
