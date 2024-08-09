"use client";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => (
  <SearchBarContainer>
    <IoSearch color="#808AAB" />
    <SearchInput placeholder="약 이름, @@, @@으로 검색" />
  </SearchBarContainer>
);

export default SearchBar;

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
