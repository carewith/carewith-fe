import styled from "styled-components";
import { useRouter } from "next/navigation";
import { FaChevronRight, FaRegClock } from "react-icons/fa";

interface MediblockCardProps {
  id: number;
  time: string;
  medicineName: string;
  image: string;
  taken: boolean;
  scheduled: boolean;
}

const Card = styled.div<{ taken: boolean; scheduled: boolean }>`
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 8px rgba(197, 204, 229, 0.12);
  padding: 1rem;
  width: 100%;
  flex: 1;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  max-width: 60px;
  max-height: 60px;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: 500;
  margin: 0.5rem 0;
`;

const Time = styled.p<{ taken: boolean; scheduled: boolean }>`
  font-size: 0.875rem;
  color: ${({ theme, taken, scheduled }) =>
    taken
      ? theme.colors.grey.grey02
      : scheduled
      ? theme.colors.primary.blue02
      : theme.colors.alert.red};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Status = styled.p<{ taken: boolean; scheduled: boolean }>`
  font-size: 0.875rem;
  color: ${({ theme, taken, scheduled }) =>
    taken
      ? theme.colors.grey.grey02
      : scheduled
      ? theme.colors.primary.blue02
      : theme.colors.alert.red};
  background-color: ${({ theme, taken, scheduled }) =>
    taken
      ? theme.colors.grey.background
      : scheduled
      ? theme.colors.primary.blue04
      : theme.colors.alert.background};
  padding: 0.5rem 0;
  width: 100%;
  text-align: center;
  border-radius: 20px;
  display: inline-block;
`;

const MediblockCard: React.FC<MediblockCardProps> = ({
  id,
  time,
  medicineName,
  image,
  taken,
  scheduled,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/mediblock/${id}`);
  };

  return (
    <Card taken={taken} scheduled={scheduled}>
      <ImageContainer>
        <Image src={image} alt={medicineName} />
        <FaChevronRight color="#ddd" onClick={handleClick} />
      </ImageContainer>
      <Title>{medicineName}</Title>
      <Time taken={taken} scheduled={scheduled}>
        <FaRegClock /> {time}
      </Time>
      <Status taken={taken} scheduled={scheduled}>
        {taken ? "복용 완료" : scheduled ? "복용 예정" : "복용 미완료"}
      </Status>
    </Card>
  );
};

export default MediblockCard;
