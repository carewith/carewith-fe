"use client";
import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import AddedMedicines from "@/components/registpage/search/AddedMedicines";
import SearchResults from "@/components/registpage/search/SearchResults";
import NextButton from "@/components/registpage/search/NextButton";
import { useDrugStore, useSearchStore } from "@/store/drugStore";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { slideDown, slideUp } from "@/utils/animate";

type Medicine = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

type Alarm = {
  id: number;
  time: string;
};

const SearchRegisterPage = () => {
  const { drugs, loading, error } = useDrugStore();
  const router = useRouter();
  const { keyword, setKeyword } = useSearchStore();
  const [addedMedicines, setAddedMedicines] = useState<Medicine[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const [step, setStep] = useState(1);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isClosing, setIsClosing] = useState(false);

  const handleAddMedicine = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setStep(1);
  };

  const handleRemoveMedicine = (id: number) => {
    setAddedMedicines(addedMedicines.filter((m) => m.id !== id));
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleCompleteRegistration = () => {
    if (selectedMedicine) {
      setAddedMedicines([...addedMedicines, selectedMedicine]);
      setSelectedMedicine(null);
      setStep(1);
    }
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedMedicine(null);
      setStep(1);
      setAlarms([]);
      setIsClosing(false);
    }, 300);
  };

  const handleClearSearch = () => {
    setKeyword("");
  };

  const handleAddAlarm = () => {
    const newAlarm: Alarm = { id: alarms.length + 1, time: "오전 9:00" }; // 기본값, 실제로는 사용자가 선택한 시간
    setAlarms([...alarms, newAlarm]);
  };

  const handleRemoveAlarm = (id: number) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id));
  };

  return (
    <Container>
      <SearchBarContainer>
        <SearchInput
          readOnly
          value={keyword}
          placeholder="약물을 검색하세요"
          onClick={() => router.push("/register/search")}
        />
        {keyword && (
          <ClearIcon onClick={handleClearSearch}>
            <IoClose color="#808AAB" />
          </ClearIcon>
        )}
      </SearchBarContainer>
      <SectionTitle>검색 결과</SectionTitle>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <SearchResults
          searchResults={drugs}
          addedMedicines={addedMedicines}
          onAdd={handleAddMedicine}
          onRemove={handleRemoveMedicine}
        />
      )}
      <SectionTitle>추가된 약</SectionTitle>
      <AddedMedicines
        addedMedicines={addedMedicines}
        onRemove={handleRemoveMedicine}
      />
      <NextButton />

      {selectedMedicine && (
        <ModalOverlay onClick={handleCloseModal} isClosing={isClosing}>
          <ModalContainer
            onClick={(e) => e.stopPropagation()}
            isClosing={isClosing}
          >
            <HandleBar />
            <MedicineInfo>
              <MedicineImage
                src={selectedMedicine.imageUrl}
                alt={selectedMedicine.name}
              />
              <MedicineDetails>
                <MedicineName>{selectedMedicine.name}</MedicineName>
                <MedicineDescription>
                  {selectedMedicine.description}
                </MedicineDescription>
              </MedicineDetails>
            </MedicineInfo>
            <Divider />
            <StepContainer>
              {step === 1 && (
                <StepContent key={step}>
                  <StepTitle>기기 약통 번호 선택</StepTitle>
                  <StepDescription>
                    홈과 약 정보 관리 페이지에서 수정할 수 있어요
                  </StepDescription>
                  <ButtonGrid>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <NumberButton key={num}>{num}</NumberButton>
                    ))}
                  </ButtonGrid>
                  <NextStepButton onClick={handleNextStep} fullWidth>
                    다음
                  </NextStepButton>
                </StepContent>
              )}

              {step === 2 && (
                <StepContent key={step}>
                  <StepTitle>투약 정보 입력</StepTitle>
                  <StepDescription>
                    홈과 약 정보 관리 페이지에서 수정할 수 있어요
                  </StepDescription>
                  <FormContainer>
                    <FormGroup>
                      <Label>
                        투약량 <InfoIcon>!</InfoIcon>
                      </Label>
                      <InputWrapper>
                        <Input
                          type="number"
                          placeholder="1.0"
                          defaultValue="1.00"
                        />
                      </InputWrapper>
                    </FormGroup>
                    <FormGroup>
                      <Label>
                        1일 투여 횟수 <InfoIcon>!</InfoIcon>
                      </Label>
                      <InputWrapper>
                        <Input type="number" placeholder="3" defaultValue="3" />
                      </InputWrapper>
                    </FormGroup>
                    <FormGroup>
                      <Label>총 투약 일수</Label>
                      <InputWrapper>
                        <Input type="number" placeholder="7" defaultValue="7" />
                      </InputWrapper>
                    </FormGroup>
                    <FormGroup>
                      <Label>
                        남은 알약 갯수 <InfoIcon>!</InfoIcon>
                      </Label>
                      <InputWrapper>
                        <Input
                          type="number"
                          placeholder="12"
                          defaultValue="12"
                        />
                      </InputWrapper>
                    </FormGroup>
                  </FormContainer>
                  <ButtonContainer>
                    <PreviousStepButton onClick={handlePreviousStep}>
                      이전
                    </PreviousStepButton>
                    <Spacer />
                    <NextStepButton onClick={handleNextStep}>
                      다음
                    </NextStepButton>
                  </ButtonContainer>
                </StepContent>
              )}
              {step === 3 && (
                <StepContent key={step}>
                  <StepTitle>알람 설정</StepTitle>
                  <StepDescription>
                    알람 설정을 추가할 수 있습니다.
                  </StepDescription>
                  <ScrollableAlarmContainer>
                    {alarms.map((alarm) => (
                      <AlarmItem key={alarm.id}>
                        {alarm.time}
                        <IoClose
                          size={16}
                          onClick={() => handleRemoveAlarm(alarm.id)}
                        />
                      </AlarmItem>
                    ))}
                  </ScrollableAlarmContainer>
                  <AddAlarmButton onClick={handleAddAlarm}>
                    + 알람 추가
                  </AddAlarmButton>
                  <ButtonContainer>
                    <PreviousStepButton onClick={handlePreviousStep}>
                      이전
                    </PreviousStepButton>
                    <Spacer />
                    <NextStepButton onClick={handleCompleteRegistration}>
                      완료
                    </NextStepButton>
                  </ButtonContainer>
                </StepContent>
              )}

              {step === 4 && (
                <StepContent key={step}>
                  <StepTitle>
                    {selectedMedicine.name}이(가) 등록되었습니다.
                  </StepTitle>
                  <NextStepButton onClick={handleCloseModal} fullWidth>
                    닫기
                  </NextStepButton>
                </StepContent>
              )}
            </StepContainer>
          </ModalContainer>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default SearchRegisterPage;

export const Container = styled.div`
  padding: 1.5rem 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 1rem 0;
  background-color: ${({ theme }) => theme.colors.grey.background};
`;

const SearchBarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.grey.background};
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey.grey01};
  width: 100%;
  cursor: pointer;
`;

const ClearIcon = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalOverlay = styled.div<{ isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
  ${({ isClosing }) =>
    isClosing &&
    css`
      animation: ${slideDown} 0.3s ease-out forwards;
    `}
`;

const ModalContainer = styled.div<{ isClosing: boolean }>`
  background: white;
  padding: 2rem;
  padding-top: 3rem;
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-width: 750px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  animation: ${slideUp} 0.3s ease-out;
  overflow-y: auto;

  ${({ isClosing }) =>
    isClosing &&
    css`
      animation: ${slideDown} 0.3s ease-out forwards;
    `}
`;

const HandleBar = styled.div`
  width: 40px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 2px;
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
`;

const MedicineInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const MedicineImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin-right: 15px;
`;

const MedicineDetails = styled.div`
  flex: 1;
`;

const MedicineName = styled.h3`
  font-size: 17px;
  font-weight: 400;
  margin: 0;
  color: ${({ theme }) => theme.colors.grey.grey01};
`;

const MedicineDescription = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  margin: 5px 0 0;
`;
const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  flex: 1;
  justify-content: center;
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const StepContent = styled.div`
  animation: ${slideIn} 0.5s ease;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StepTitle = styled.h3`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grey.grey01};
  margin-bottom: 5px;
`;

const StepDescription = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  margin-bottom: 1rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grey.grey01};
  display: flex;
  align-items: center;
`;

const InputWrapper = styled.div`
  flex: 0 0 60%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 6px;
  text-align: center;
  background-color: white;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.blue02};
    outline: none;
  }
`;

const InfoIcon = styled.span`
  margin-left: 0.5rem;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey.grey02};
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin: 1rem 0;
`;

const NumberButton = styled.button`
  padding: 1rem;
  font-size: 17px;
  min-height: 70px;
  background-color: #f0f0f0;
  border: none;
  color: #d9d9d9;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.blue02};
    color: white;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;
`;

const Spacer = styled.div`
  width: 10%;
`;

const NextStepButton = styled.button<{ fullWidth?: boolean }>`
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  max-height: 50px;
  cursor: pointer;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "45%")};
`;

const PreviousStepButton = styled(NextStepButton)`
  background-color: #ccc;
`;

const ScrollableAlarmContainer = styled.div`
  max-height: 150px;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const AlarmItem = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.blue01};
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddAlarmButton = styled.button`
  background-color: ${({ theme }) => theme.colors.grey.background};
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  margin-top: 10px;
`;
