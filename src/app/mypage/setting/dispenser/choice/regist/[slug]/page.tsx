"use client";
import { useState } from "react";
import { SettingHeader } from "@/components/settingPage/SettingHeader";
import { useRouter } from "next/navigation";
import { DispenserData, registDispenser } from "@/service/dispenser";
import { IoChevronForward } from "react-icons/io5";
import { SettingWhiteContainer } from "@/components/Container.styles";
import {
  ContentSection,
  Input,
  InputGroup,
  Label,
  SelectButton,
  SubmitButton,
  UnderlinedInput,
  VolumeSlider,
  VolumeSliderBackground,
  VolumeSliderContainer,
  VolumeSliderFill,
} from "@/components/dispenser/Regist.styles";

type Props = {
  params: {
    slug: string;
  };
};

function RegisterDispenser({ params: { slug } }: Props) {
  const router = useRouter();

  const [dispenserData, setDispenserData] = useState<any>({
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
      router.push(`/mypage/setting/dispenser/choice/regist/${slug}/complete`);
    } catch (error) {
      console.error("디스펜서 등록 실패:", error);
    }
  };
  const isFormValid = () => {
    return (
      dispenserData.name.trim() !== "" &&
      dispenserData.location.trim() !== "" &&
      dispenserId.trim() !== ""
    );
  };
  return (
    <SettingWhiteContainer>
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
          <Label>모델명</Label>
          <UnderlinedInput
            name="dispenserId"
            value={dispenserId}
            onChange={handleDispenserIdChange}
            placeholder="모델명 자동 입력"
            readOnly
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
          <Label>디스펜서 음량</Label>
          <VolumeSliderContainer>
            <VolumeSliderBackground />
            <VolumeSliderFill width={dispenserData.volume} />
            <VolumeSlider
              type="range"
              min="0"
              max="100"
              value={dispenserData.volume}
              onChange={handleVolumeChange}
            />
          </VolumeSliderContainer>
        </InputGroup>
      </ContentSection>
      <SubmitButton onClick={handleSubmit} disabled={!isFormValid()}>
        {" "}
        완료
      </SubmitButton>
    </SettingWhiteContainer>
  );
}

export default RegisterDispenser;
