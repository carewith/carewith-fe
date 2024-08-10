"use client";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useDrugStore, useSearchStore } from "@/store/drugStore";

type AutocompleteResult = string;

const SearchBar = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<AutocompleteResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // input 필드 참조 생성
  const { setKeyword } = useSearchStore();
  const { searchDrugs } = useDrugStore();

  useEffect(() => {
    if (inputValue) {
      const fetchSuggestions = async () => {
        try {
          const response = await fetch(
            `https://api.carewith.life/api/v1/drug/autocomplete?keyword=${inputValue}`
          );
          const data = await response.json();
          setSuggestions(data.data.names || []);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setShowSuggestions(false);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (suggestion: AutocompleteResult) => {
    setKeyword(suggestion);
    searchDrugs(suggestion);

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
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey.grey01};
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
  max-height: 200px;
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
