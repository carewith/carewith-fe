"use client";
import React, { useState } from "react";
import Picker from "react-mobile-picker";
import styled from "styled-components";

type TimePickerProps = {
  onSelectTime: (formattedTime: string) => void;
};

const PickerContainer = styled.div`
  .picker-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  .picker-column {
    flex: 1;
    height: 100%;
  }
  .picker-item {
    padding: 10px 0;
    font-size: 16px;
    text-align: center;
  }
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 20px;
`;

const TimePicker: React.FC<TimePickerProps> = ({ onSelectTime }) => {
  const [selectedValue, setSelectedValue] = useState({
    period: "오전",
    hour: "12",
    minute: "00",
  });

  const periods = ["오전", "오후"];
  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const handleConfirm = () => {
    const formattedTime = `${selectedValue.period} ${selectedValue.hour}:${selectedValue.minute}`;
    onSelectTime(formattedTime);
  };

  return (
    <PickerContainer>
      <Picker
        value={selectedValue}
        onChange={setSelectedValue}
        height={150}
        itemHeight={35}
      >
        <Picker.Column name="period">
          {periods.map((period) => (
            <Picker.Item key={period} value={period}>
              {period}
            </Picker.Item>
          ))}
        </Picker.Column>
        <Picker.Column name="hour">
          {hours.map((hour) => (
            <Picker.Item key={hour} value={hour}>
              {hour}
            </Picker.Item>
          ))}
        </Picker.Column>
        <Picker.Column name="minute">
          {minutes.map((minute) => (
            <Picker.Item key={minute} value={minute}>
              {minute}
            </Picker.Item>
          ))}
        </Picker.Column>
      </Picker>
      <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
    </PickerContainer>
  );
};

export default TimePicker;
