"use client";

import { MedicineData } from "@/app/mediblock/[slug]/page";
import { useState } from "react";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa"; // Import right arrow icon

const MedicineEditDetailContainer = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding-bottom: 2rem;
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 27px;
  font-weight: 500;
  margin: 0;
`;

const SubTitle = styled.h2`
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.grey.grey02};
  margin: 6px 0;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const MedicineImage = styled.img`
  width: 100%;
  max-height: 110px;
  object-fit: cover;
  border-radius: 24px;
  margin-bottom: 1rem;
`;

const Info = styled.div`
  width: 100%;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  margin-bottom: 0.5rem;

  span:first-child {
    flex: 1;
    margin-right: 1rem;
  }

  input,
  select {
    width: 100px;
    padding: 0.25rem;
    font-size: 13px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
  }
`;

const Memo = styled.textarea`
  width: 100%;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.grey.background};
  margin: 1rem 0;
`;

const InfoSection = styled.div`
  font-size: 14px;
`;

const InfoSectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 300;
  font-size: 14px;
  margin-bottom: 11px;

  span:first-child {
    flex: 1;
    margin-right: 1rem;
  }

  span:nth-child(2) {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.grey.grey02};
    cursor: pointer;
  }

  input[type="checkbox"] {
    display: none;
  }

  .toggle-switch {
    position: relative;
    width: 34px;
    height: 14px;
    background-color: ${({ theme }) => theme.colors.grey.background};
    border-radius: 14px;
    cursor: pointer;
  }

  .toggle-switch::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 12px;
    height: 12px;
    background-color: white;
    border-radius: 50%;
    transition: 0.3s;
  }

  input[type="checkbox"]:checked + .toggle-switch::before {
    transform: translateX(20px);
  }

  input[type="checkbox"]:checked + .toggle-switch {
    background-color: ${({ theme }) => theme.colors.primary.blue};
  }
`;

const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-size: 15px;
  margin-top: 1rem;
  width: 100%;
  text-align: center;
`;

const MedicineEditDetail: React.FC<MedicineData> = ({
  id,
  name,
  classification,
  division,
  imageUrl,
  dosage,
  dailyFrequency,
  totalDoses,
  remainingPills,
  times,
  startDate,
  repeatAlarm,
  alarmSound,
  autoExtend,
  memo,
}) => {
  const [editData, setEditData] = useState({
    dosage,
    dailyFrequency,
    totalDoses,
    remainingPills,
    startDate,
    repeatAlarm,
    alarmSound,
    autoExtend,
    memo,
  });

  const handleChange = (field: string, value: any) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const response = await fetch(`/api/medicine/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    });

    if (response.ok) {
      // 저장 성공 시 다른 페이지로 이동하거나, 사용자에게 알림
      console.log("저장 성공");
    } else {
      // 저장 실패 시 사용자에게 알림
      console.log("저장 실패");
    }
  };

  return (
    <MedicineEditDetailContainer>
      <Header>
        <SubTitle>
          {classification} • {division}
        </SubTitle>
        <Title>{name}</Title>
      </Header>
      <ImageContainer>
        <MedicineImage src={imageUrl} alt={name} />
      </ImageContainer>
      <Info>
        <InfoRow>
          <span>투약량</span>
          <input
            type="number"
            value={editData.dosage}
            onChange={(e) => handleChange("dosage", parseFloat(e.target.value))}
          />
        </InfoRow>
        <InfoRow>
          <span>1일 투여 횟수</span>
          <input
            type="number"
            value={editData.dailyFrequency}
            onChange={(e) =>
              handleChange("dailyFrequency", parseInt(e.target.value))
            }
          />
        </InfoRow>
        <InfoRow>
          <span>총 투약 일수</span>
          <input
            type="number"
            value={editData.totalDoses}
            onChange={(e) =>
              handleChange("totalDoses", parseInt(e.target.value))
            }
          />
        </InfoRow>
        <InfoRow>
          <span>남은 알약 갯수</span>
          <input
            type="number"
            value={editData.remainingPills}
            onChange={(e) =>
              handleChange("remainingPills", parseInt(e.target.value))
            }
          />
        </InfoRow>
      </Info>
      <Divider />
      <InfoSection>
        <InfoSectionRow onClick={() => console.log("Edit 주기")}>
          <span>주기</span>
          <span>
            매일 <FaChevronRight />
          </span>
        </InfoSectionRow>
        <InfoSectionRow onClick={() => console.log("Edit 시작")}>
          <span>시작</span>
          <span>
            {editData.startDate} <FaChevronRight />
          </span>
        </InfoSectionRow>
        <InfoSectionRow>
          <span>반복알림</span>
          <span>
            <input
              type="checkbox"
              checked={editData.repeatAlarm}
              onChange={(e) => handleChange("repeatAlarm", e.target.checked)}
            />
            <div className="toggle-switch"></div>
          </span>
        </InfoSectionRow>
        <InfoSectionRow onClick={() => console.log("Edit 알림 사운드")}>
          <span>알림 사운드</span>
          <span>
            {editData.alarmSound} <FaChevronRight />
          </span>
        </InfoSectionRow>
      </InfoSection>
      <Divider />
      <InfoSection>
        <InfoSectionRow>
          <span>자동 연장</span>
          <span>
            <input
              type="checkbox"
              checked={editData.autoExtend}
              onChange={(e) => handleChange("autoExtend", e.target.checked)}
            />
            <div className="toggle-switch"></div>
          </span>
        </InfoSectionRow>
      </InfoSection>
      <Divider />
      <InfoSection>
        <h2 style={{ fontSize: "14px", margin: "1rem 0 0.5rem 0" }}>메모</h2>
        <Memo
          value={editData.memo}
          onChange={(e) => handleChange("memo", e.target.value)}
        />
      </InfoSection>
      <SaveButton onClick={handleSave}>다음</SaveButton>
    </MedicineEditDetailContainer>
  );
};

export default MedicineEditDetail;
