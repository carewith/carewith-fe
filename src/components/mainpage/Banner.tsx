"use client";
import React, { useEffect, useState } from "react";
import { getUserData, User } from "@/service/userService";
import styled from "styled-components";

const BannerContainer = styled.div`
  width: 100%;
  max-width: 768px;
  height: 350px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
  background: linear-gradient(to bottom left, #f0f3ff 0%, #cedeff 100%);
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
  padding: 2rem 1rem;
`;

const SmallText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey.grey02};
`;

const MainText = styled.h1`
  font-size: 27px;
  font-weight: 500;
  text-align: start;
  margin: 4px 0px;
`;

const SubText = styled.span`
  font-size: 24px;
  color: #201f22;
`;

const NextDoseText = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primary.blue02};
  margin-top: 2px;
`;

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1rem;
  flex-direction: column;
  align-items: center;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.grey.background};
  border-radius: 32px;
  overflow: hidden;
  position: relative;
  display: flex;
`;

const ProgressSegment = styled.div<{ color: string; width: string }>`
  height: 100%;
  background-color: ${({ color }) => color};
  width: ${({ width }) => width};
  border-right: 1px solid ${({ theme }) => theme.colors.grey.background};
`;

const TimeMarks = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.5rem;
`;

const TimeMark = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: ${({ color }) => color};

  &.next {
    color: ${({ theme }) => theme.colors.primary.blue02};

    &::after {
      content: "•";
      color: ${({ theme }) => theme.colors.primary.blue02};
      font-size: 24px;
      margin-top: 4px;
    }
  }
`;

const PillCount = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-top: 4px;
`;

const Banner = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
        console.log("Fetched user data:", data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false); // 데이터 로딩 후 로딩 상태를 false로 설정
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <BannerContainer>
        <SmallText>로딩 중...</SmallText>
      </BannerContainer>
    );
  }

  const doses = [
    { time: "오전 9:00", count: 1, status: "past" },
    { time: "오후 1:00", count: 2, status: "past" },
    { time: "오후 4:00", count: 4, status: "next" },
    { time: "오후 7:00", count: 3, status: "future" },
    { time: "오후 10:00", count: 2, status: "future" },
  ];

  const getColor = (status: string) => {
    switch (status) {
      case "past":
        return "#4CAF50";
      case "next":
        return "#5A81FA";
      default:
        return "#9EA9D1";
    }
  };

  const nextDose = doses.find((dose) => dose.status === "next");

  return (
    <BannerContainer>
      <SmallText>건강을 지키는 작은 습관</SmallText>
      <MainText>
        {userData?.name}님의 복약 현황
        <br /> <SubText></SubText>
      </MainText>
      {nextDose && <NextDoseText>다음 복용: {nextDose.time}</NextDoseText>}
      <ProgressContainer>
        <ProgressBar>
          {doses.map((dose, index) => (
            <ProgressSegment
              key={index}
              color={getColor(dose.status)}
              width={`${100 / doses.length}%`}
            />
          ))}
        </ProgressBar>
        <TimeMarks>
          {doses.map((dose, index) => (
            <TimeMark
              key={index}
              color={getColor(dose.status)}
              className={dose.status === "next" ? "next" : ""}
            >
              {dose.time}
              <PillCount color={getColor(dose.status)}>{dose.count}</PillCount>
            </TimeMark>
          ))}
        </TimeMarks>
      </ProgressContainer>
    </BannerContainer>
  );
};

export default Banner;
