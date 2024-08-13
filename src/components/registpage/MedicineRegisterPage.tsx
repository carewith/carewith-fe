"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MedicineCard from "./MedicineCard";
import AddButton from "./AddButton";
import { getAllCatridge, TodayList } from "@/service/cartridge";

const MedicineRegisterPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fbfcff;
  padding: 0 1rem;
  padding-top: 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 21px;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const MedicineRegisterPage = () => {
  const [medicines, setMedicines] = useState<TodayList[]>([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await getAllCatridge(
          localStorage.getItem("dispenserId") || ""
        );
        setMedicines(response.statuses);
      } catch (error) {
        console.error("Failed to fetch medicines:", error);
      }
    };

    fetchMedicines();
  }, []);

  return (
    <MedicineRegisterPageContainer>
      <Header>등록된 약 목록</Header>
      {medicines.map((medicine) => (
        <MedicineCard
          key={medicine.cartridgeId}
          cartridgeId={medicine.cartridgeId}
          drugImage={medicine.drugImage}
          drugName={medicine.drugName}
          expectedTime={medicine.expectedTime}
          status={medicine.status}
          expectedDayOfWeek={medicine.expectedDayOfWeek}
          cartridgeNumber={medicine.cartridgeNumber}
          drugDescription={medicine.drugDescription}
        />
      ))}
      <AddButton />
    </MedicineRegisterPageContainer>
  );
};

export default MedicineRegisterPage;
