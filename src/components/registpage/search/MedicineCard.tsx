"use client";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

type Medicine = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

type MedicineCardProps = {
  medicine: Medicine;
  onRemove: (id: number) => void;
};

const MedicineCard = ({ medicine, onRemove }: MedicineCardProps) => (
  <MedicineCardContainer>
    <MedicineCardHeader>
      <MedicineImage src={medicine.imageUrl} alt={medicine.name} />
      <RemoveButton onClick={() => onRemove(medicine.id)}>
        <FaTimes />
      </RemoveButton>
    </MedicineCardHeader>
    <MedicineDetails>
      <MedicineName>{medicine.name}</MedicineName>
      <MedicineDescription>{medicine.description}</MedicineDescription>
    </MedicineDetails>
  </MedicineCardContainer>
);

export default MedicineCard;

const MedicineCardContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
  width: 140px;
  margin-right: 12px;
`;

const MedicineCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MedicineImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 4px;
`;

const MedicineDetails = styled.div`
  margin-top: 12px;
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

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff4d4f;
  font-size: 18px;
  cursor: pointer;
`;
