"use client";

import styled from "styled-components";
import { FaRegClock } from "react-icons/fa";

interface CurrentIndicatorProps {
  lastTakenTime: string;
  nextScheduledTime: string;
  status: boolean;
}

const IndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 1rem;
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 24px;
  background-color: #fff;
  gap: 1rem;
`;

const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const TimeLabel = styled.span`
  font-size: 11px;
  color: #a3a3a3;
  margin-bottom: 0.5rem;
`;

const Time = styled.div<{ isLast?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: ${({ theme, isLast }) =>
    isLast ? theme.colors.alert.red : theme.colors.grey.grey02};
`;

const StatusContainer = styled.div`
  margin-left: auto;
`;

const Status = styled.div<{ status: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 24px;
  background-color: ${({ theme, status }) =>
    status ? theme.colors.primary.blue04 : theme.colors.alert.background};
  color: ${({ theme, status }) =>
    status ? theme.colors.primary.blue02 : theme.colors.alert.red};
  font-size: 11px;
  font-weight: 500;
`;

const CurrentIndicator: React.FC<CurrentIndicatorProps> = ({
  lastTakenTime,
  nextScheduledTime,
  status,
}) => {
  return (
    <IndicatorContainer>
      <TimeContainer>
        <TimeLabel>최근 복용</TimeLabel>
        <Time isLast>
          <FaRegClock />
          {lastTakenTime}
        </Time>
      </TimeContainer>
      <TimeContainer>
        <TimeLabel>다음 복용 예정</TimeLabel>
        <Time>
          <FaRegClock />
          {nextScheduledTime}
        </Time>
      </TimeContainer>
      <StatusContainer>
        <Status status={status}>{status ? "복용 완료" : "복용 미완료"}</Status>
      </StatusContainer>
    </IndicatorContainer>
  );
};

export default CurrentIndicator;
