"use client";
import { useState } from "react";
import styled from "styled-components";
import AddedMedicines from "@/components/registpage/search/AddedMedicines";
import SearchResults from "@/components/registpage/search/SearchResults";
import NextButton from "@/components/registpage/search/NextButton";
import { useDrugStore, useSearchStore } from "@/store/drugStore";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

type Medicine = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

const SearchRegisterPage = () => {
  const router = useRouter();
  const { drugs, loading, error } = useDrugStore();
  const { keyword, setKeyword, clearKeyword } = useSearchStore();
  const [addedMedicines, setAddedMedicines] = useState<Medicine[]>([]);

  const handleAddMedicine = (medicine: Medicine) => {
    if (!addedMedicines.find((m) => m.id === medicine.id)) {
      setAddedMedicines([...addedMedicines, medicine]);
    }
  };

  const handleRemoveMedicine = (id: number) => {
    setAddedMedicines(addedMedicines.filter((m) => m.id !== id));
  };

  const handleSearchBarClick = () => {
    router.push("/register/search");
  };

  const handleClearSearch = () => {
    clearKeyword();
  };

  return (
    <Container>
      <SearchBarContainer>
        <SearchInput
          readOnly
          value={keyword}
          placeholder="약물을 검색하세요"
          onClick={handleSearchBarClick}
        />
        {keyword && (
          <ClearIcon onClick={handleClearSearch}>
            <IoClose color="#808AAB" />
          </ClearIcon>
        )}
      </SearchBarContainer>
      <SectionTitle>검색 결과</SectionTitle>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <SearchResults
          searchResults={drugs}
          addedMedicines={addedMedicines}
          onAdd={handleAddMedicine}
          onRemove={handleRemoveMedicine}
        />
      )}
      <SectionTitle>추가된 약</SectionTitle>
      <AddedMedicines
        addedMedicines={addedMedicines}
        onRemove={handleRemoveMedicine}
      />
      <NextButton />
    </Container>
  );
};

export default SearchRegisterPage;

export const Container = styled.div`
  padding: 1.5rem 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
`;

const SearchBarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.grey.background};
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey.grey01};
  width: 100%;
  cursor: pointer;
`;

const ClearIcon = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px; // 'X' 아이콘의 위치를 조정
  display: flex;
  align-items: center;
  justify-content: center;
`;
