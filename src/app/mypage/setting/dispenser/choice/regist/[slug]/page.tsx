"use client";
import { useState } from "react";
import { SettingHeader } from "@/components/settingPage/SettingHeader";
import { useRouter } from "next/navigation";
import { DispenserData, registDispenser } from "@/service/dispenser";
import { IoChevronForward } from "react-icons/io5";
import { SettingContainer } from "@/components/Container.styles";
import {
  ContentSection,
  Input,
  InputGroup,
  Label,
  SelectButton,
  SubmitButton,
  VolumeSlider,
} from "@/components/dispenser/Regist.styles";

type Props = {
  params: {
    slug: string;
  };
};
function RegisterDispenser({ params: { slug } }: Props) {
  const router = useRouter();

  const [dispenserData, setDispenserData] = useState<DispenserData>({
    name: "",
    location: "",
    volume: 50,
  });
  const [dispenserId, setDispenserId] = useState(slug);

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
