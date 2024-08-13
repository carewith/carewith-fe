"use client";
import styled from "styled-components";
import TodayMediblockList from "./MediblockList";
import {
  getDispenserId,
  getMainDispenser,
  registDispenser,
} from "@/service/dispenser";

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
  padding-top: 2.5rem;
  overflow-y: auto;
`;
const Title = styled.h1`
  font-size: 27px;
  line-height: 32px;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const Content = () => {
  const test = async () => {
    // const response = await registDispenser("MzcwNTU", {
    //   name: "TESTING",
    //   location: "집",
    //   volume: 60,
    // });
    const response = await getDispenserId();
    console.log(response);
  };

  test();
  return (
    <ContentContainer>
      <Title>금일 복용 약 목록</Title>
      <TodayMediblockList />
    </ContentContainer>
  );
};

export default Content;
