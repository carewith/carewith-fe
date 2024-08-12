import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  HandleBar,
  ModalContainer,
  ModalOverlay,
  NextStepButton,
} from "../registpage/add/RegisterAddPage.styles";

const DayButton = styled.button<{ selected: boolean }>`
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary.blue02 : "white"};
  color: ${({ selected, theme }) =>
    selected ? "white" : theme.colors.grey.grey01};
  border: 1px solid
    ${({ selected, theme }) =>
      selected ? theme.colors.primary.blue02 : theme.colors.grey.grey03};
  border-radius: 20px;
  padding: 10px 12px;
  cursor: pointer;
`;

const DaysContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  margin: 10px 0px;
`;

interface PeriodicityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedDays: string[]) => void;
  initialSelectedDays: string[];
}

const dayMap: { [key: string]: string } = {
  일: "SUN",
  월: "MON",
  화: "TUE",
  수: "WED",
  목: "THU",
  금: "FRI",
  토: "SAT",
};

const reverseDayMap: { [key: string]: string } = {
  SUN: "일",
  MON: "월",
  TUE: "화",
  WED: "수",
  THU: "목",
  FRI: "금",
  SAT: "토",
};

const PeriodicityModal: React.FC<PeriodicityModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSelectedDays,
}) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  useEffect(() => {
    setSelectedDays(
      initialSelectedDays.map((day) => reverseDayMap[day] || day)
    );
  }, [initialSelectedDays]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSave = () => {
    const englishDays = selectedDays.map((day) => dayMap[day] || day);
    onSave(englishDays);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay isClosing={false} onClick={handleOverlayClick}>
      <ModalContainer isClosing={false} onClick={(e) => e.stopPropagation()}>
        <HandleBar />
        <h4 style={{ textAlign: "center", fontSize: "19px", fontWeight: 400 }}>
          특정 요일
        </h4>
        <DaysContainer>
          {days.map((day) => (
            <DayButton
              key={day}
              selected={selectedDays.includes(day)}
              onClick={() => toggleDay(day)}
            >
              {day}
            </DayButton>
          ))}
        </DaysContainer>
        <NextStepButton fullWidth onClick={handleSave}>
          저장
        </NextStepButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PeriodicityModal;
