"use client";
import { useEffect, useState } from "react";
import { getTodayCatridge, TodayListResponse } from "@/service/cartridge";
import MediblockCard from "./MediblockCard";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

const NoDataMessage = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text.text02};
  text-align: center;
  margin-bottom: 20px;
`;

const RegisterButton = styled.button`
  font-size: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary.blue02};
  background-color: ${({ theme }) => theme.colors.primary.blue04};
  border: none;
  border-radius: 24px;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.blue03};
  }
`;

const MediblockListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const TodayMediblockList = () => {
  const [todayList, setTodayList] = useState<TodayListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTodayList = async () => {
      try {
        const dispenserId = localStorage.getItem("dispenserId");
        const data = await getTodayCatridge(dispenserId);
        setTodayList(data);
      } catch (err) {
        console.error("Failed to fetch today's cartridge list", err);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodayList();
  }, []);

  const handleRegisterClick = () => {
    router.push("/register");
  };

  if (loading) {
    return <div>정보를 가져오는 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!todayList?.statuses.length) {
    return (
      <Container>
        <NoDataMessage>금일 등록된 복용 정보가 없어요</NoDataMessage>
        <RegisterButton onClick={handleRegisterClick}>
          약 등록하러 가기
        </RegisterButton>
      </Container>
    );
  }

  return (
    <MediblockListContainer>
      {todayList.statuses.map((cartridge) => (
        <MediblockCard key={cartridge.cartridgeId} cartridge={cartridge} />
      ))}
    </MediblockListContainer>
  );
};

export default TodayMediblockList;
