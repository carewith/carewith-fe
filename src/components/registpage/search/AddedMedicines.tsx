"use client";
import styled from "styled-components";
import MedicineCard from "./MedicineCard";

type Medicine = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

type AddedMedicinesProps = {
  addedMedicines: Medicine[];
  onRemove: (id: number) => void;
};

const AddedMedicines = ({ addedMedicines, onRemove }: AddedMedicinesProps) => (
  <AddedMedicinesContainer>
    {addedMedicines.length > 0 ? (
      addedMedicines.map((medicine) => (
        <MedicineCard
          key={medicine.id}
          medicine={medicine}
          onRemove={onRemove}
        />
      ))
    ) : (
      <EmptyMessage>약을 추가해주세요.</EmptyMessage>
    )}
  </AddedMedicinesContainer>
);

export default AddedMedicines;

const AddedMedicinesContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  margin-bottom: 16px;
`;

const EmptyMessage = styled.div`
  font-size: 14px;
  color: #999;
  text-align: center;
`;
