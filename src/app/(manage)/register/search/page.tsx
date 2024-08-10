"use client";
import { useState } from "react";
import styled from "styled-components";
import AddedMedicines from "@/components/registpage/search/AddedMedicines";
import SearchResults from "@/components/registpage/search/SearchResults";
import SearchBar from "@/components/registpage/search/SearchBar";
import NextButton from "@/components/registpage/search/NextButton";
import { useDrugStore } from "@/store/drugStore";

type Medicine = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};
const SearchRegisterPage = () => {
  const { drugs, loading, error } = useDrugStore();
  const [addedMedicines, setAddedMedicines] = useState<Medicine[]>([]);

  const handleAddMedicine = (medicine: Medicine) => {
    if (!addedMedicines.find((m) => m.id === medicine.id)) {
      setAddedMedicines([...addedMedicines, medicine]);
    }
  };

  const handleRemoveMedicine = (id: number) => {
    setAddedMedicines(addedMedicines.filter((m) => m.id !== id));
  };

  return (
    <Container>
      <SearchBar />
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

const Container = styled.div`
  padding: 1.5rem 1rem;
`;
const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
`;
