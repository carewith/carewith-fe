"use client";
import { MedicineData } from "@/app/mediblock/[slug]/page";
import styled from "styled-components";

const MedicineDetailContainer = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 8px rgba(197, 204, 229, 0.12);
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const MedicineImage = styled.img`
  flex: 1;
  max-width: 100%;
  max-height: 100px;
  object-fit: cover;
  border-radius: 24px;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 0.5rem;

  span:first-child {
    flex: 1;
    margin-right: 1rem;
  }
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  margin-bottom: 1rem;
`;

const TimeItem = styled.div`
  background-color: ${({ theme }) => theme.colors.grey.background};
  color: ${({ theme }) => theme.colors.primary.blue02};
  padding: 0.5rem 1rem;
  font-size: 11px;
  border-radius: 20px;
`;

const Memo = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey.grey02};
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
  font-size: 14px;
  margin-bottom: 0.5rem;

  span:first-child {
    flex: 1;
    margin-right: 1rem;
  }
  span:nth-child(2) {
    color: ${({ theme }) => theme.colors.grey.grey02};
  }
`;

const MedicineDetail: React.FC<MedicineData> = ({
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
  return (
    <MedicineDetailContainer>
      <Header>
        <SubTitle>
          {classification} • {division}
        </SubTitle>
        <Title>{name}</Title>
      </Header>
      <ImageContainer>
        <MedicineImage src={imageUrl} alt={name} />
        <Info>
          <InfoRow>
            <span>투약량</span>
            <span>{dosage !== null ? dosage.toFixed(2) : "N/A"}</span>
          </InfoRow>
          <InfoRow>
            <span>1일 투여 횟수</span>
            <span>{dailyFrequency}</span>
          </InfoRow>
          <InfoRow>
            <span>총 투약 일수</span>
            <span>{totalDoses}</span>
          </InfoRow>
          <InfoRow>
            <span>남은 알약 갯수</span>
            <span>{remainingPills}</span>
          </InfoRow>
        </Info>
      </ImageContainer>
      <TimeContainer>
        {times.map((time, index) => (
          <TimeItem key={index}>{time}</TimeItem>
        ))}
      </TimeContainer>
      <Divider />
      <InfoSection>
        <InfoSectionRow>
          <span>주기</span>
          <span>매일</span>
        </InfoSectionRow>
        <InfoSectionRow>
          <span>시작</span>
          <span>{startDate}</span>
        </InfoSectionRow>
        <InfoSectionRow>
          <span>반복알림</span>
          <span>{repeatAlarm ? "켜짐" : "꺼짐"}</span>
        </InfoSectionRow>
        <InfoSectionRow>
          <span>알림 사운드</span>
          <span>{alarmSound}</span>
        </InfoSectionRow>
      </InfoSection>
      <Divider />
      <InfoSection>
        <InfoSectionRow>
          <span>자동 연장</span>
          <span>{autoExtend ? "켜짐" : "꺼짐"}</span>
        </InfoSectionRow>
      </InfoSection>
      <Divider />
      <InfoSection>
        <h2 style={{ fontSize: "14px", margin: "1rem 0 0.5rem 0" }}>메모</h2>
        <Memo>{memo}</Memo>
      </InfoSection>
    </MedicineDetailContainer>
  );
};

export default MedicineDetail;
