import styled from "styled-components";
import { FaChevronRight, FaRegClock } from "react-icons/fa";

interface StatusProps {
  status: "missed" | "scheduled";
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
  align-items: center;
`;

const TimeInfo = styled.div<StatusProps>`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${({ status, theme }) =>
    status === "missed" ? theme.colors.alert.red : theme.colors.primary.blue02};

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
  background-color: ${({ status }) =>
    status === "missed"
      ? "#FFDFDF"
      : status === "scheduled"
      ? "#E9F0FF"
      : "#e0e0e0"};
  color: ${({ status }) =>
    status === "missed"
      ? "#E14143"
      : status === "scheduled"
      ? "#5A81FA"
      : "#808080"};
`;

interface MedicineCardProps {
  imageUrl: string;
  name: string;
  time: string;
  status: "missed" | "scheduled";
  description: string;
}

const MedicineCard: React.FC<MedicineCardProps> = ({
  imageUrl,
  name,
  time,
  status,
  description,
}) => (
  <MedicineCardContainer>
    <TopSection>
      <MedicineImage src={imageUrl} alt={name} />
      <MedicineTitle>{name}</MedicineTitle>
      <ChevronIcon />
    </TopSection>
    <BottomSection>
      <div>
        <TimeInfo status={status}>
          <FaRegClock />
          {time}
          <ScheduleInfo>
            {status === "missed" ? "지난 복용 예정" : "다음 복용 예정"}
          </ScheduleInfo>
        </TimeInfo>
        <MedicineInfo>{description}</MedicineInfo>
      </div>
      <StatusButton status={status}>
        {status === "missed" ? "복용 미완료" : "복용 예정"}
      </StatusButton>
    </BottomSection>
  </MedicineCardContainer>
);

export default MedicineCard;
