"use client";
import { useState } from "react";
import styled from "styled-components";
import { SettingHeader } from "@/components/settingPage/SettingHeader";
import { useRouter } from "next/navigation";
import { DispenserData, registDispenser } from "@/service/dispenser";
import { IoChevronForward } from "react-icons/io5";
import { SettingContainer } from "@/components/Container.styles";

function RegisterDispenser() {
  const router = useRouter();
  const [dispenserData, setDispenserData] = useState<DispenserData>({
    name: "",
    location: "",
    volume: 50,
  });
  const [dispenserId, setDispenserId] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDispenserData({ ...dispenserData, [name]: value });
  };

  const handleDispenserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDispenserId(e.target.value);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDispenserData({ ...dispenserData, volume: parseInt(e.target.value) });
  };

  const handleSubmit = async () => {
    try {
      await registDispenser(dispenserId, dispenserData);
      router.push("/mypage");
    } catch (error) {
      console.error("디스펜서 등록 실패:", error);
    }
  };

  return (
    <SettingContainer>
      <SettingHeader title="디스펜서 등록" />
      <ContentSection>
        <InputGroup>
          <Label>디스펜서명</Label>
          <Input
            name="name"
            value={dispenserData.name}
            onChange={handleInputChange}
            placeholder="사용자 설정 이름"
          />
        </InputGroup>
        <InputGroup>
          <Label>디스펜서 ID</Label>
          <Input
            name="dispenserId"
            value={dispenserId}
            onChange={handleDispenserIdChange}
            placeholder="@@@@@"
          />
        </InputGroup>
        <InputGroup>
          <Label>디스펜서 설치 장소</Label>
          <Input
            name="location"
            value={dispenserData.location}
            onChange={handleInputChange}
            placeholder="사용자 설정 이름"
          />
        </InputGroup>
        <InputGroup>
          <Label>알람음 설정</Label>
          <SelectButton>
            기본음 <IoChevronForward color="#CAD0E3" size={22} />
          </SelectButton>
        </InputGroup>
        <InputGroup>
          <Label>디스펜서 음량</Label>
          <VolumeSlider
            type="range"
            min="0"
            max="100"
            value={dispenserData.volume}
            onChange={handleVolumeChange}
          />
        </InputGroup>
      </ContentSection>
      <SubmitButton onClick={handleSubmit}>다음</SubmitButton>
    </SettingContainer>
  );
}

export default RegisterDispenser;

const ContentSection = styled.section`
  padding: 16px 0;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 8px;
  font-size: 16px;
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 8px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
`;

const VolumeSlider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 4px;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.primary.blue02};
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.blue01};
    cursor: pointer;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.primary.blue01};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  margin-top: 24px;
  cursor: pointer;
`;
