"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import PeriodicityModal from "./PeriodicityModal";
import {
  getUsingCartridge,
  patchCartridgeWithAlarm,
  PatchCartridgeWithAlarmData,
  UsingCartridge,
} from "@/service/cartridge";
import {
  ScrollableAlarmContainer,
  AlarmItem,
  AlarmTime,
  CloseButton,
  AddAlarmButton,
  ButtonContainer,
  NextStepButton,
  PreviousStepButton,
  Spacer,
  ModalOverlay,
  ModalContainer,
  HandleBar,
} from "@/components/registpage/add/RegisterAddPage.styles";
import TimePicker from "../util/TimePicker";
import { useParams, useRouter } from "next/navigation";

interface MedicineEditDetailProps {
  cartridgeNumber: number;
  drugDivision: string;
  drugClassification: string;
  drugName: string;
  drugImage: string;
  drugDosage: number;
  drugDoesPerDay: number;
  drugTotalDoseDay: number;
  drugRemains: number;
  startDate: string;
  repeat: boolean;
  memo: string;
  times: string[];
  dates: string[];
}

const MedicineEditDetailContainer = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 0 1rem;
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
  font-size: 14px;
  margin-bottom: 0.5rem;

  span:first-child {
    flex: 1;
    margin-right: 1rem;
  }

  input,
  select {
    flex: 2;
    text-align: center;
    width: 100px;
    padding: 6px;
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
  }
`;

export const Memo = styled.textarea`
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

export const InfoSection = styled.div`
  font-size: 14px;
`;

export const InfoSectionRow = styled.div`
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
    transition: background-color 0.3s;
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
    transition: transform 0.3s;
  }

  input[type="checkbox"]:checked + .toggle-switch::before {
    transform: translateX(20px);
  }

  input[type="checkbox"]:checked + .toggle-switch {
    background-color: ${({ theme }) => theme.colors.primary.blue01};
  }
`;

const CartridgeSection = styled.div`
  margin-top: 1rem;
`;

const CartridgeTitle = styled.h2`
  font-size: 14px;
  margin: 1rem 0 0.5rem 0;
`;

const CartridgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CartridgeButton = styled.button<{
  isSelected: boolean;
  isUsed: boolean;
  isCurrent: boolean;
}>`
  padding: 1rem;
  font-size: 17px;
  background-color: ${({ isSelected, isUsed, theme }) =>
    isUsed ? "#e0e0e0" : isSelected ? theme.colors.primary.blue02 : "white"};
  color: ${({ isSelected, isUsed }) =>
    isUsed ? "#a0a0a0" : isSelected ? "white" : "#000"};
  border: 2px solid
    ${({ isCurrent, theme }) =>
      isCurrent ? theme.colors.primary.blue01 : "#d9d9d9"};
  border-radius: 12px;
  cursor: ${({ isUsed }) => (isUsed ? "not-allowed" : "pointer")};
  position: relative;
`;

const MedicineEditDetail: React.FC<MedicineEditDetailProps> = ({
  cartridgeNumber,
  drugDivision,
  drugClassification,
  drugName,
  drugImage,
  drugDosage,
  drugDoesPerDay,
  drugTotalDoseDay,
  drugRemains,
  startDate,
  repeat,
  memo,
  times,
  dates,
}) => {
  const [editData, setEditData] = useState({
    drugDosage,
    drugDoesPerDay,
    drugTotalDoseDay,
    drugRemains,
    startDate,
    repeat,
    memo,
    times: times,
    dates,
    cartridgeNumber,
  });
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const [isPeriodicityModalOpen, setIsPeriodicityModalOpen] = useState(false);
  const [usingCartridges, setUsingCartridges] = useState<number[]>([]);
  const [step, setStep] = useState(1);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  useEffect(() => {
    const fetchUsingCartridges = async () => {
      try {
        const data: UsingCartridge = await getUsingCartridge(
          localStorage.getItem("dispenserId")
        );
        setUsingCartridges(data.usingNumbers);
      } catch (error) {
        console.error("Error fetching using cartridges:", error);
      }
    };
    fetchUsingCartridges();
  }, []);

  const handleChange = (field: string, value: any) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePeriodicityChange = (newDates: string[]) => {
    setEditData((prev) => ({ ...prev, dates: newDates }));
  };

  const handleCartridgeChange = (num: number) => {
    if (!usingCartridges.includes(num) || num === cartridgeNumber) {
      handleChange("cartridgeNumber", num);
    }
  };

  const handleAddAlarm = () => {
    setIsTimePickerOpen(true);
  };

  const convertTo24HourFormat = (time: string): string => {
    const [period, hourMinute] = time.split(" ");
    let [hour, minute] = hourMinute.split(":").map(Number);

    if (period === "오후" && hour < 12) {
      hour += 12;
    } else if (period === "오전" && hour === 12) {
      hour = 0;
    }

    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:00`;
  };

  const convertTo12HourFormat = (time: string): string => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "오후" : "오전";
    const displayHour = hour % 12 || 12;
    return `${period} ${displayHour}:${minute.toString().padStart(2, "0")}`;
  };

  const handleTimeSelection = (formattedTime: string) => {
    const time24 = convertTo24HourFormat(formattedTime);
    setEditData((prev) => ({
      ...prev,
      times: [...prev.times, time24],
    }));
    setIsTimePickerOpen(false);
  };
  const handleRemoveAlarm = (index: number) => {
    setEditData((prev) => ({
      ...prev,
      times: prev.times.filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSave = async () => {
    const schedules = editData.dates.flatMap((date) =>
      editData.times.map((time) => ({
        dayOfWeek: date,
        time: time,
      }))
    );

    const updateData: any = {
      number: editData.cartridgeNumber,
      memo: editData.memo,
      dosage: editData.drugDosage,
      doesPerDay: editData.drugDoesPerDay,
      totalDoseDays: editData.drugTotalDoseDay,
      drugRemains: editData.drugRemains,
      repeatable: editData.repeat,
      schedules: schedules,
      since: startDate,
    };

    try {
      const result = await patchCartridgeWithAlarm(
        // editData.cartridgeNumber.toString(),
        slug,
        updateData
      );
      console.log("Save successful:", result);
      router.push(`/cartridge/${slug}`);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  return (
    <MedicineEditDetailContainer>
      {step === 1 && (
        <>
          <Header>
            <SubTitle>
              {drugClassification} • {drugDivision}
            </SubTitle>
            <Title>{drugName}</Title>
          </Header>
          <ImageContainer>
            <MedicineImage src={drugImage} alt={drugName} />
          </ImageContainer>
          <Info>
            <InfoRow>
              <span>투약량</span>
              <input
                type="number"
                value={editData.drugDosage}
                onChange={(e) =>
                  handleChange("drugDosage", parseFloat(e.target.value))
                }
              />
            </InfoRow>
            <InfoRow>
              <span>1일 투여 횟수</span>
              <input
                type="number"
                value={editData.drugDoesPerDay}
                onChange={(e) =>
                  handleChange("drugDoesPerDay", parseInt(e.target.value))
                }
              />
            </InfoRow>
            <InfoRow>
              <span>총 투약 일수</span>
              <input
                type="number"
                value={editData.drugTotalDoseDay}
                onChange={(e) =>
                  handleChange("drugTotalDoseDay", parseInt(e.target.value))
                }
              />
            </InfoRow>
            <InfoRow>
              <span>남은 알약 갯수</span>
              <input
                type="number"
                value={editData.drugRemains}
                onChange={(e) =>
                  handleChange("drugRemains", parseInt(e.target.value))
                }
              />
            </InfoRow>
          </Info>
          <Divider />
          <InfoSection>
            <InfoSectionRow onClick={() => setIsPeriodicityModalOpen(true)}>
              <span>주기</span>
              <span>
                {editData.dates.join(", ")} <FaChevronRight />
              </span>
            </InfoSectionRow>
            <InfoSectionRow onClick={() => console.log("Edit 시작")}>
              <span>시작</span>
              <span>
                {editData.startDate.split(" ")[0]} <FaChevronRight />
              </span>
            </InfoSectionRow>
            <InfoSectionRow>
              <span>반복알림</span>
              <span onClick={() => handleChange("repeat", !editData.repeat)}>
                <input type="checkbox" checked={editData.repeat} readOnly />
                <div className="toggle-switch"></div>
              </span>
            </InfoSectionRow>
          </InfoSection>
          <Divider />
          <InfoSection>
            <h2 style={{ fontSize: "14px", margin: "1rem 0 0.5rem 0" }}>
              메모
            </h2>
            <Memo
              value={editData.memo}
              onChange={(e) => handleChange("memo", e.target.value)}
            />
          </InfoSection>
          <CartridgeSection>
            <CartridgeTitle>카트리지 번호 선택</CartridgeTitle>
            <CartridgeGrid>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <CartridgeButton
                  key={num}
                  isSelected={editData.cartridgeNumber === num}
                  isUsed={
                    usingCartridges.includes(num) && num !== cartridgeNumber
                  }
                  isCurrent={num === cartridgeNumber}
                  onClick={() => handleCartridgeChange(num)}
                >
                  {num}
                </CartridgeButton>
              ))}
            </CartridgeGrid>
          </CartridgeSection>
          <NextStepButton onClick={handleNext} fullWidth>
            다음
          </NextStepButton>
        </>
      )}

      {step === 2 && (
        <>
          <Header>
            <SubTitle>
              {drugClassification} • {drugDivision}
            </SubTitle>
            <Title>{drugName}</Title>
          </Header>
          <ScrollableAlarmContainer>
            {editData.times.map((time, index) => (
              <AlarmItem key={index}>
                <AlarmTime>{convertTo12HourFormat(time)}</AlarmTime>
                <CloseButton onClick={() => handleRemoveAlarm(index)}>
                  <IoClose size={20} />
                </CloseButton>
              </AlarmItem>
            ))}
          </ScrollableAlarmContainer>
          <AddAlarmButton onClick={handleAddAlarm}>+ 알람 추가</AddAlarmButton>
          <ButtonContainer>
            <PreviousStepButton onClick={handlePrevious}>
              이전
            </PreviousStepButton>
            <Spacer />
            <NextStepButton onClick={handleNext}>다음</NextStepButton>
          </ButtonContainer>
        </>
      )}

      {step === 3 && (
        <>
          <Header>
            <SubTitle>
              {drugClassification} • {drugDivision}
            </SubTitle>
            <Title>{drugName}</Title>
          </Header>
          <p>모든 설정이 완료되었습니다. 저장하시겠습니까?</p>
          <ButtonContainer>
            <PreviousStepButton onClick={handlePrevious}>
              이전
            </PreviousStepButton>
            <Spacer />
            <NextStepButton onClick={handleSave}>완료</NextStepButton>
          </ButtonContainer>
        </>
      )}

      <PeriodicityModal
        isOpen={isPeriodicityModalOpen}
        onClose={() => setIsPeriodicityModalOpen(false)}
        onSave={handlePeriodicityChange}
        initialSelectedDays={editData.dates}
      />

      {isTimePickerOpen && (
        <ModalOverlay
          onClick={() => setIsTimePickerOpen(false)}
          isClosing={false}
        >
          <ModalContainer
            onClick={(e) => e.stopPropagation()}
            isClosing={false}
          >
            <HandleBar />
            <TimePicker onSelectTime={handleTimeSelection} />
          </ModalContainer>
        </ModalOverlay>
      )}
    </MedicineEditDetailContainer>
  );
};

export default MedicineEditDetail;
