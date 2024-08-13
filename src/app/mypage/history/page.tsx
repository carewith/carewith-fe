"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getHistoryWeek, dosePerDay } from "@/service/history";
import { getMainDispenser } from "@/service/dispenser";
import { getTodayCatridge, TodayListResponse } from "@/service/cartridge";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PageContainer = styled.div`
  padding: 20px;
  max-width: 768px;
  margin: 0 auto;
  background-color: #f8f9ff;
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const WeekCalendar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
  padding: 15px;
  border-radius: 12px;
`;

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DayText = styled.span<{ isToday: boolean }>`
  font-size: 14px;
  color: ${(props) =>
    props.isToday ? props.theme.colors.primary.blue01 : "#000"};
  margin-bottom: 5px;
`;

const DoseDots = styled.div`
  display: flex;
`;

const DoseDot = styled.div<{ status: "complete" | "incomplete" | "none" }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.status === "complete"
      ? props.theme.colors.primary.blue01
      : props.status === "incomplete"
      ? "#FFA500"
      : "#D3D3D3"};
  margin: 0 1px;
`;

const TodayDoseContainer = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: ${(props) => props.theme.colors.primary.blue01};
  border-radius: 4px;
  margin: 10px 0;
`;

const TimeList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const TimeItem = styled.div<{ isNext: boolean }>`
  font-size: 12px;
  color: ${(props) =>
    props.isNext ? props.theme.colors.primary.blue01 : "#000"};
`;

const MedicineList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

const MedicineCard = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const MedicineImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-bottom: 10px;
`;

const MedicineName = styled.h3`
  font-size: 16px;
  margin-bottom: 5px;
`;

const MedicineTime = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.text02};
`;

const MedicineStatus = styled.span<{ status: string }>`
  font-size: 12px;
  color: ${(props) =>
    props.status === "복용 완료"
      ? props.theme.colors.primary.blue01
      : "#FFA500"};
`;

function HistoryPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weeklyData, setWeeklyData] = useState<dosePerDay[]>([]);
  const [todayData, setTodayData] = useState<TodayListResponse | null>(null);
  const [dispenserId, setDispenserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDispenserId = async () => {
      const mainDispenser = await getMainDispenser();
      if (mainDispenser && mainDispenser.dispenserId) {
        setDispenserId(mainDispenser.dispenserId);
      }
    };
    fetchDispenserId();
  }, []);

  useEffect(() => {
    if (dispenserId) {
      fetchWeeklyData();
      fetchTodayData();
    }
  }, [dispenserId]);

  const fetchWeeklyData = async () => {
    const data = await getHistoryWeek(dispenserId as string);
    setWeeklyData(data.dosePerDays);
  };

  const fetchTodayData = async () => {
    const data = await getTodayCatridge(dispenserId);
    setTodayData(data);
  };

  const getDayStatus = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const dayData = weeklyData.find((d) => d.date === formattedDate);
    if (!dayData) return "none";
    if (dayData.incomplete > 0) return "incomplete";
    return "complete";
  };

  const getProgressPercentage = () => {
    if (!todayData) return 0;
    const total = todayData.statuses.length;
    const completed = todayData.statuses.filter(
      (status) => status.status === "복용 완료"
    ).length;
    return (completed / total) * 100;
  };

  return (
    <PageContainer>
      <Header>복약 기록</Header>
      <WeekCalendar>
        <FaChevronLeft />
        {[...Array(7)].map((_, index) => {
          const date = new Date(selectedDate);
          date.setDate(selectedDate.getDate() - selectedDate.getDay() + index);
          const isToday = date.toDateString() === new Date().toDateString();
          return (
            <DayContainer key={index}>
              <DayText isToday={isToday}>{date.getDate()}</DayText>
              <DoseDots>
                <DoseDot status={getDayStatus(date)} />
                <DoseDot status={getDayStatus(date)} />
                <DoseDot status={getDayStatus(date)} />
              </DoseDots>
            </DayContainer>
          );
        })}
        <FaChevronRight />
      </WeekCalendar>
      <TodayDoseContainer>
        <h2>{selectedDate.toLocaleDateString()} 약 복용 현황</h2>
        <ProgressBar style={{ width: `${getProgressPercentage()}%` }} />
        <TimeList>
          {todayData?.statuses.map((status, index) => (
            <TimeItem key={index} isNext={status.status === "복용 예정"}>
              {status.expectedTime.slice(0, 5)}
            </TimeItem>
          ))}
        </TimeList>
      </TodayDoseContainer>
      <MedicineList>
        {todayData?.statuses.map((medicine, index) => (
          <MedicineCard key={index}>
            <MedicineImage src={medicine.drugImage} alt={medicine.drugName} />
            <MedicineName>{medicine.drugName}</MedicineName>
            <MedicineTime>{medicine.expectedTime.slice(0, 5)}</MedicineTime>
            <MedicineStatus status={medicine.status}>
              {medicine.status}
            </MedicineStatus>
          </MedicineCard>
        ))}
      </MedicineList>
    </PageContainer>
  );
}

export default HistoryPage;
