"use client";
import { useState } from "react";
import styled from "styled-components";
import AddedMedicines from "@/components/registpage/search/AddedMedicines";
import SearchResults from "@/components/registpage/search/SearchResults";
import SearchBar from "@/components/registpage/search/SearchBar";
import NextButton from "@/components/registpage/search/NextButton";

type Medicine = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

const SearchRegisterPage = () => {
  //FIXME - USESTATE 대신 데이터 요청으로 변경 예정
  const [addedMedicines, setAddedMedicines] = useState<Medicine[]>([
    {
      id: 1,
      name: "아리셉트 정 5mg",
      description: "도네페질염산염으로서 1일 1회 5mg씩 취침전 투여한다.",
      imageUrl: "/images/mediblock.png",
    },
    {
      id: 2,
      name: "아리셉트 정 10mg",
      description: "도네페질염산염으로서 1일 1회 10mg씩 취침전 투여한다.",
      imageUrl: "/images/mediblock.png",
    },
    {
      id: 3,
      name: "네오마켓 정 5mg",
      description: "도네페질염산염으로서 1일 1회 5mg씩 취침전 투여한다.",
      imageUrl: "/images/mediblock.png",
    },
  ]);
  const [searchResults, setSearchResults] = useState<Medicine[]>([
    {
      id: 1,
      name: "아리셉트 정 5mg",
      description: "도네페질염산염으로서 1일 1회 5mg씩 취침전 투여한다.",
      imageUrl: "/images/mediblock.png",
    },
    {
      id: 2,
      name: "아리셉트 정 10mg",
      description: "도네페질염산염으로서 1일 1회 10mg씩 취침전 투여한다.",
      imageUrl: "/images/mediblock.png",
    },
    {
      id: 3,
      name: "네오마켓 정 5mg",
      description: "도네페질염산염으로서 1일 1회 5mg씩 취침전 투여한다.",
      imageUrl: "/images/mediblock.png",
    },
    {
      id: 4,
      name: "네오마켓 정 5mg",
      description: "도네페질염산염으로서 1일 1회 5mg씩 취침전 투여한다.",
      imageUrl: "/images/mediblock.png",
    },
    {
      id: 5,
      name: "네오마켓 정 5mg",
      description: "도네페질염산염으로서 1일 1회 5mg씩 취침전 투여한다.",
      imageUrl: "/images/mediblock.png",
    },
    {
      id: 6,
      name: "네오마켓 정 5mg",
      description: "도네페질염산염으로서 1일 1회 5mg씩 취침전 투여한다.",
      imageUrl: "/images/mediblock.png",
    },
  ]);

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
      <SearchResults
        searchResults={searchResults}
        addedMedicines={addedMedicines}
        onAdd={handleAddMedicine}
        onRemove={handleRemoveMedicine}
      />
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
