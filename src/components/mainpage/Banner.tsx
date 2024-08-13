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
  background: linear-gradient(to bottom left, #f0f3ff 0%, #cedeff 100%);
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
  background-color: #f4f5f9;
  border-radius: 50px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProgressSegment = styled.div<{ width: string }>`
  height: 100%;
  background: linear-gradient(to right, #3d49ff 0%, #5a81fa 100%);
  width: ${({ width }) => width};
  position: absolute;
  left: 0;
`;

const TimeMarks = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`;

const TimeMark = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #333;
`;

const PillCount = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const Pill = styled.div<{ status: "incomplete" | "complete" | "expected" }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 2px;
  background-color: ${({ status }) =>
    status === "incomplete"
      ? "red"
      : status === "complete"
      ? "blue"
      : "#E0E0E0"};
`;
const ProgressText = styled.span`
  color: white;
  z-index: 1;
  font-size: 16px;
`;

const NoScheduleText = styled.span`
  color: ${({ theme }) => theme.colors.grey.grey02};
  font-size: 13px;
  margin-top: 8px;
`;
const Banner = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [progress, setProgress] = useState<any>(null);
  const [dosePerTimes, setDosePerTimes] = useState<DosePerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    return `${hour > 12 ? "오후 " + (hour - 12) : "오전 " + hour}:${minutes}`;
  };
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
      : NaN;

  const doses = dosePerTimes?.dosePerTimes || [];
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
          {!isNaN(progressPercent) ? (
            <>
              <ProgressSegment width={`${progressPercent}%`} />
              <ProgressText>{progressPercent}%</ProgressText>
            </>
          ) : (
            <ProgressText>!</ProgressText>
          )}
        </ProgressBar>
        {isNaN(progressPercent) && (
          <NoScheduleText>예정된 복약일정이 없습니다.</NoScheduleText>
        )}
        <TimeMarks>
          {dosePerTimes?.dosePerTimes.map((dose, index) => (
            <TimeMark key={index}>
              {formatTime(dose.time)}
              <PillCount>
                {[...Array(dose.expected)].map((_, i) => (
                  <Pill
                    key={i}
                    status={
                      i < dose.complete
                        ? "complete"
                        : i < dose.complete + dose.incomplete
                        ? "incomplete"
                        : "expected"
                    }
                  />
                ))}
              </PillCount>
            </TimeMark>
          ))}
        </TimeMarks>
      </ProgressContainer>
    </BannerContainer>
  );
};

export default Banner;
