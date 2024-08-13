"use client";
import { useState } from "react";
import styled from "styled-components";
import { useParams, useRouter } from "next/navigation";
import { SettingWhiteContainer } from "../Container.styles";
import { SettingHeader } from "../settingPage/SettingHeader";
import { PatientData, postPatientData } from "@/service/patient";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const GenderButton = styled.button<{ isSelected: boolean }>`
  padding: 10px 16px;
  border: 1px solid #4285f4;
  font-size: 14px;
  border-radius: 6px;
  background-color: ${(props) => (props.isSelected ? "#5A81FA" : "white")};
  color: ${(props) => (props.isSelected ? "white" : "#CAD0E3")};
  border: 1px solid ${(props) => (props.isSelected ? "" : "#CAD0E3")};
  cursor: pointer;
`;

const SeverityGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  width: 100%;
`;

const SeverityButton = styled(GenderButton)`
  flex: 1;
  padding: 10px 5px;
  font-size: 12px;
  white-space: nowrap;
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #5a81fa;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 17px;
`;

function PatientRegister() {
  const router = useRouter();
  const params = useParams();
  const dispenserId = params.slug as string;

  const [patientData, setPatientData] = useState<PatientData>({
    name: "",
    birth: "",
    diseaseName: "",
    severity: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handleSeveritySelect = (severity: number) => {
    setPatientData({ ...patientData, severity });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postPatientData(dispenserId, patientData);
      router.push(`/mypage/setting/patient/register/${params.slug}/complete`);
      console.log("Patient registered:", response);
    } catch (error) {
      console.error("Error registering patient:", error);
    }
  };

  return (
    <SettingWhiteContainer>
      <SettingHeader title="복용자 정보 등록" />
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>복용자 이름</Label>
          <Input
            name="name"
            value={patientData.name}
            onChange={handleChange}
            placeholder="복용자 이름"
          />
        </InputGroup>

        <InputGroup>
          <Label>생년월일</Label>
          <Input
            name="birth"
            type="date"
            value={patientData.birth}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Label>병명</Label>
          <Input
            name="diseaseName"
            value={patientData.diseaseName}
            onChange={handleChange}
            placeholder="혈관성 치매 / 알츠하이머 치매 / 파킨슨 치매..."
          />
        </InputGroup>

        <InputGroup>
          <Label>중증도</Label>
          <SeverityGroup>
            {[
              { label: "최경도", value: 0.5 },
              { label: "경도", value: 1 },
              { label: "중증도", value: 2 },
              { label: "중증", value: 3 },
              { label: "심각", value: 4 },
            ].map((item) => (
              <SeverityButton
                key={item.value}
                type="button"
                isSelected={patientData.severity === item.value}
                onClick={() => handleSeveritySelect(item.value)}
              >
                {item.label}
              </SeverityButton>
            ))}
          </SeverityGroup>
        </InputGroup>

        <SubmitButton type="submit">완료</SubmitButton>
      </Form>
    </SettingWhiteContainer>
  );
}

export default PatientRegister;
