"use client";
import styled from "styled-components";
import MedicineCard from "./MedicineCard";
import AddButton from "./AddButton";
import { IoSettingsOutline } from "react-icons/io5";

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
  const medicines = [
    {
      id: 1,
      name: "아리셉트 정 5mg",
      time: "오후 7:00",
      status: "missed" as "missed" | "scheduled",
      description: "도네페질염산염으로서 1일 1회 5mg씩...",
      imageUrl: "/images/mediblock.png",
    },
    {
      id: 2,
      name: "아리셉트 정 5mg",
      time: "오후 10:00",
      status: "scheduled" as "missed" | "scheduled",
      description: "도네페질염산염으로서 1일 1회 5mg씩...",
      imageUrl: "/images/mediblock.png",
    },
  ];

  return (
    <MedicineRegisterPageContainer>
      <Header>
        등록된 약 목록
        <IoSettingsOutline />
      </Header>
      {medicines.map((medicine) => (
        <MedicineCard
          key={medicine.id}
          imageUrl={medicine.imageUrl}
          name={medicine.name}
          time={medicine.time}
          status={medicine.status}
          description={medicine.description}
        />
      ))}
      <AddButton />
    </MedicineRegisterPageContainer>
  );
};

export default MedicineRegisterPage;
