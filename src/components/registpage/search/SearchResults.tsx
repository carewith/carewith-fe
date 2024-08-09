"use client";
import styled from "styled-components";
import { FaPlus, FaTimes } from "react-icons/fa";

type Medicine = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

type SearchResultsProps = {
  searchResults: Medicine[];
  addedMedicines: Medicine[];
  onAdd: (medicine: Medicine) => void;
  onRemove: (id: number) => void;
};

const SearchResults = ({
  searchResults,
  addedMedicines,
  onAdd,
  onRemove,
}: SearchResultsProps) => (
  <SearchResultsContainer>
    {searchResults.map((medicine) => (
      <SearchResult key={medicine.id}>
        <MedicineImage src={medicine.imageUrl} alt={medicine.name} />
        <MedicineDetails>
          <MedicineName>{medicine.name}</MedicineName>
          <MedicineDescription>{medicine.description}</MedicineDescription>
        </MedicineDetails>
        {addedMedicines.find((m) => m.id === medicine.id) ? (
          <RemoveButton onClick={() => onRemove(medicine.id)}>
            <FaTimes />
          </RemoveButton>
        ) : (
          <AddButton onClick={() => onAdd(medicine)}>
            <FaPlus />
          </AddButton>
        )}
      </SearchResult>
    ))}
  </SearchResultsContainer>
);

export default SearchResults;

const SearchResultsContainer = styled.div`
  margin-bottom: 16px;
`;

const SearchResult = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  gap: 0.5rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
`;

const MedicineImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 4px;
`;

const MedicineDetails = styled.div`
  flex: 1;
`;

const MedicineName = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const MedicineDescription = styled.div`
  font-size: 12px;
  color: #666;
`;

const AddButton = styled.button`
  background: none;
  border: none;
  color: #1890ff;
  font-size: 18px;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff4d4f;
  font-size: 18px;
  cursor: pointer;
`;
