"use client";
import React, { useEffect, useState } from "react";
import { getUserData, User } from "@/service/userService";
import {
  getProgressBar,
  getAsdPerTime,
  DosePerTimes,
  getMainDispenser,
} from "@/service/dispenser";
import styled from "styled-components";

const BannerContainer = styled.div`
  width: 100%;
  max-width: 768px;
  height: 350px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
  background: linear-gradient(to bottom left, #f0f3ff 0%, #6c94e3 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const ProgressSegment = styled.div<{ width: string }>`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  width: ${({ width }) => width};
`;

const TimeMarks = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.5rem;
`;

const TimeMark = styled.div<{ isNext: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: ${({ isNext, theme }) =>
    isNext ? theme.colors.primary.blue02 : theme.colors.grey.grey02};

  &::after {
    content: "•";
    color: ${({ isNext, theme }) =>
      isNext ? theme.colors.primary.blue02 : "transparent"};
    font-size: 24px;
    margin-top: 4px;
  }
`;

const PillCount = styled.div<{ isNext: boolean }>`
  width: 20px;
  height: 20px;
  background-color: ${({ isNext, theme }) =>
    isNext ? theme.colors.primary.blue02 : theme.colors.grey.grey02};
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
  const [progress, setProgress] = useState<any>(null);
  const [dosePerTimes, setDosePerTimes] = useState<DosePerTimes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData();
        console.log("USERDATA ", userData);
        setUserData(userData);

        const mainDispenser = await getMainDispenser();
        console.log("MAINDISPENSER", mainDispenser);
        if (mainDispenser && mainDispenser.dispenserId) {
          const progressData = await getProgressBar(mainDispenser.dispenserId);
          setProgress(progressData);

          const doseTimesData = await getAsdPerTime(mainDispenser.dispenserId);
          console.log("HI", doseTimesData);
          setDosePerTimes(doseTimesData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
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

  const progressPercent =
    progress && typeof progress.percent === "number" && !isNaN(progress.percent)
      ? progress.percent
      : typeof progress?.percent === "string" &&
        !isNaN(parseFloat(progress.percent))
      ? parseFloat(progress.percent)
      : 0;

  const doses = dosePerTimes?.dosePerTime || [];
  const nextDose = doses.find((dose) => dose.incomplete > 0);

  return (
    <BannerContainer>
      <SmallText>건강을 지키는 작은 습관</SmallText>
      <MainText>
        {userData?.name}님의 복약 현황
        <br /> <SubText>정확한 약 복용으로부터,</SubText>
      </MainText>
      {nextDose && <NextDoseText>다음 복용: {nextDose.time}</NextDoseText>}
      <ProgressContainer>
        <ProgressBar>
          <ProgressSegment width={`${progressPercent}%`} />
        </ProgressBar>
        <TimeMarks>
          {doses.map((dose, index) => {
            const isNext = dose.incomplete > 0;
            return (
              <TimeMark key={index} isNext={isNext}>
                {dose.time}
                <PillCount isNext={isNext}>
                  {dose.complete + dose.incomplete}
                </PillCount>
              </TimeMark>
            );
          })}
        </TimeMarks>
      </ProgressContainer>
    </BannerContainer>
  );
};

export default Banner;
