import styled from "styled-components";
import { FaChevronRight, FaRegClock } from "react-icons/fa";

interface StatusProps {
  status: string;
}

const MedicineCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 6px 8px rgba(197, 204, 229, 0.12);
  margin-bottom: 1rem;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const MedicineImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 1rem;
`;

const MedicineTitle = styled.div`
  font-size: 17px;
  font-weight: 500;
  flex: 1;
`;

const ChevronIcon = styled(FaChevronRight)`
  color: ${({ theme }) => theme.colors.grey.grey03};
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const InfoSection = styled.div`
  flex: 1;
  margin-right: 1rem;
`;

const TimeInfo = styled.div<StatusProps>`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${({ status, theme }) =>
    status === "MISSED" ? theme.colors.alert.red : theme.colors.primary.blue02};

  svg {
    margin-right: 4px;
  }
`;

const ScheduleInfo = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  margin-left: 4px;
`;

const MedicineInfo = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  margin-top: 4px;
`;

const StatusButton = styled.div<StatusProps>`
  padding: 0.5rem 1rem;
  border-radius: 24px;
  font-size: 11px;
  white-space: nowrap;
  background-color: ${({ status }) =>
    status === "MISSED"
      ? "#FFDFDF"
      : status === "복용 예정"
      ? "#E9F0FF"
      : "#e0e0e0"};
  color: ${({ status }) =>
    status === "MISSED"
      ? "#E14143"
      : status === "복용 예정"
      ? "#5A81FA"
      : "#808080"};
`;

interface MedicineCardProps {
  drugImage: string;
  drugName: string;
  expectedTime: string;
  status: string;
  expectedDayOfWeek: string | null;
  cartridgeNumber: number;
  drugDescription: string;
}

export const formatDayOfWeek = (day: string | null): string => {
  const days = {
    MON: "월",
    TUE: "화",
    WED: "수",
    THU: "목",
    FRI: "금",
    SAT: "토",
    SUN: "일",
  };
  return day ? days[day as keyof typeof days] : "";
};

const MedicineCard: React.FC<MedicineCardProps> = ({
  drugImage,
  drugName,
  expectedTime,
  status,
  expectedDayOfWeek,
  cartridgeNumber,
  drugDescription,
}) => {
  const isToday = status !== "복용 정보 없음" && !expectedDayOfWeek;
  const formattedDay = formatDayOfWeek(expectedDayOfWeek);
  const formattedTime = expectedTime.slice(0, 5);

  const getTimeDisplay = () => {
    if (status === "복용 정보 없음") return "금일 복용 계획 없음";
    if (isToday) return formattedTime;
    return `${formattedDay}요일 ${formattedTime}`;
  };

  const getScheduleInfo = () => {
    if (status === "복용 정보 없음") return "";
    return isToday ? "오늘 복용 예정" : "다음 복용 예정";
  };

  const getStatusText = () => {
    if (status === "MISSED") return "복용 미완료";
    if (status === "복용 예정") return "복용 예정";
    if (status === "복용 완료") return "복용 완료";
    return null;
  };

  return (
    <MedicineCardContainer>
      <TopSection>
        <MedicineImage src={drugImage} alt={drugName} />
        <MedicineTitle>{drugName}</MedicineTitle>
        <ChevronIcon />
      </TopSection>
      <BottomSection>
        <InfoSection>
          <TimeInfo status={status}>
            <FaRegClock />
            {getTimeDisplay()}
            <ScheduleInfo>{getScheduleInfo()}</ScheduleInfo>
          </TimeInfo>
          <MedicineInfo>{`카트리지 ${cartridgeNumber}번 | ${drugDescription}`}</MedicineInfo>
        </InfoSection>
        {getStatusText() && (
          <StatusButton status={status}>{getStatusText()}</StatusButton>
        )}
      </BottomSection>
    </MedicineCardContainer>
  );
};

export default MedicineCard;
