"use client";
import styled from "styled-components";
import MediblockCard from "./MediblockCard";

const ContentContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 325px;
  left: 0;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  height: calc(100vh - 350px);
  background-color: #fbfcff;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem 1rem;
  overflow-y: auto;
`;
const Title = styled.h1`
  font-size: 27px;
  line-height: 32px;
  font-weight: 300;
  margin-bottom: 1rem;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const Content = () => {
  return (
    <ContentContainer>
      <Title>복용 약 목록</Title>
      <CardContainer>
        {/* NOTE DATA 요청 후 변경 */}
        <MediblockCard
          id={0}
          image="/images/mediblock.png"
          time="오후 7:00"
          medicineName="아리셉트 정 5mg"
          taken={false}
          scheduled={false}
        />
        <MediblockCard
          id={1}
          image="/images/mediblock.png"
          time="오후 10:00"
          medicineName="아리셉트 정 5mg"
          taken={false}
          scheduled={true}
        />
        <MediblockCard
          id={2}
          image="/images/mediblock.png"
          time="오후 10:00"
          medicineName="아리셉트 정 5mg"
          taken={false}
          scheduled={true}
        />
        <MediblockCard
          id={3}
          image="/images/mediblock.png"
          time="오후 10:00"
          medicineName="아리셉트 정 5mg"
          taken={false}
          scheduled={true}
        />
        <MediblockCard
          id={4}
          image="/images/mediblock.png"
          time="오후 10:00"
          medicineName="아리셉트 정 5mg"
          taken={false}
          scheduled={true}
        />
        <MediblockCard
          id={5}
          image="/images/mediblock.png"
          time="내일 오전 9:00"
          medicineName="아리셉트 정 5mg"
          taken={true}
          scheduled={false}
        />
      </CardContainer>
    </ContentContainer>
  );
};

export default Content;
