import { useState } from "react";
import styled from "styled-components";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import {
  HandleBar,
  ModalContainer,
  ModalOverlay,
  NextStepButton,
} from "./RegisterAddPage.styles";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: (selectedDate: string | null) => void;
}

const CalendarModal = ({ isOpen, onClose }: CalendarModalProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const handleDateClick = (date: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(date);
    setSelectedDate(newDate);
  };

  const handleMonthChange = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const handleSave = () => {
    onClose(selectedDate.toISOString().split("T")[0]);
  };

  if (!isOpen) return null;

  const renderDates = () => {
    const dates = [];
    const firstDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ).getDay();
    const lastDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();

    for (let i = 0; i < firstDay; i++) {
      dates.push(<EmptyDate key={`empty-${i}`} />);
    }

    for (let i = 1; i <= lastDate; i++) {
      dates.push(
        <DateButton
          key={i}
          onClick={() => handleDateClick(i)}
          selected={i === selectedDate.getDate()}
        >
          {i}
        </DateButton>
      );
    }

    return dates;
  };

  return (
    <ModalOverlay isClosing={false} onClick={() => onClose(null)}>
      <ModalContainer isClosing={false} onClick={(e) => e.stopPropagation()}>
        <HandleBar />
        <CalendarHeader>
          <IoChevronBack onClick={() => handleMonthChange(-1)} />
          <span>{`${selectedDate.getFullYear()}년 ${
            selectedDate.getMonth() + 1
          }월`}</span>
          <IoChevronForward onClick={() => handleMonthChange(1)} />
        </CalendarHeader>
        <CalendarDays>
          {daysInWeek.map((day) => (
            <Day key={day}>{day}</Day>
          ))}
        </CalendarDays>
        <CalendarDates>{renderDates()}</CalendarDates>
        <NextStepButton fullWidth onClick={handleSave}>
          완료
        </NextStepButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 18px;
`;

const CalendarDays = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  font-size: 14px;
`;

const CalendarDates = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0.5rem 1rem;
`;

const Day = styled.div`
  text-align: center;
`;

const DateButton = styled.button<{ selected: boolean }>`
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary.blue02 : "white"};
  color: ${({ selected, theme }) =>
    selected ? "white" : theme.colors.grey.grey01};
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.blue01};
    color: white;
  }
`;

const EmptyDate = styled.div`
  padding: 0.5rem;
`;

export default CalendarModal;
