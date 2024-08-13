import styled from "styled-components";
import { useRouter } from "next/navigation";
import { FaChevronRight, FaRegClock } from "react-icons/fa";
import { TodayList } from "@/service/cartridge";

interface MediblockCardProps {
  cartridge: TodayList;
}

const Card = styled.div`
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 8px rgba(197, 204, 229, 0.12);
  padding: 1rem;
  width: 100%;
  height: 200px; // 고정 높이 설정
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: 500;
  margin: 0.5rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; // 최대 2줄까지 표시
  -webkit-box-orient: vertical;
  flex-shrink: 0;
`;

const Time = styled.p<{ status: string }>`
  font-size: 0.875rem;
  color: ${({ theme, status }) =>
    status === "복용 완료"
      ? theme.colors.grey.grey02
      : status === "복용 예정"
      ? theme.colors.primary.blue02
      : theme.colors.alert.red};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
`;

const Status = styled.p<{ status: string }>`
  font-size: 0.875rem;
  color: ${({ theme, status }) =>
    status === "복용 완료"
      ? theme.colors.grey.grey02
      : status === "복용 예정"
      ? theme.colors.primary.blue02
      : theme.colors.alert.red};
  background-color: ${({ theme, status }) =>
    status === "복용 완료"
      ? theme.colors.grey.background
      : status === "복용 예정"
      ? theme.colors.primary.blue04
      : theme.colors.alert.background};
  padding: 0.5rem 0;
  width: 100%;
  text-align: center;
  border-radius: 20px;
  margin-top: auto; // 하단에 배치
`;

const MediblockCard: React.FC<MediblockCardProps> = ({ cartridge }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/cartridge/${cartridge.cartridgeId}`);
  };

  return (
    <Card>
      <ImageContainer>
        <Image src={cartridge.drugImage} alt={cartridge.drugName} />
        <FaChevronRight color="#ddd" onClick={handleClick} />
      </ImageContainer>
      <Title>{cartridge.drugName}</Title>
      <Time status={cartridge.status}>
        <FaRegClock /> {cartridge.expectedTime}
      </Time>
      <Status status={cartridge.status}>
        {cartridge.status === "복용 완료"
          ? "복용 완료"
          : cartridge.status === "복용 예정"
          ? "복용 예정"
          : "복용 미완료"}
      </Status>
    </Card>
  );
};

export default MediblockCard;
