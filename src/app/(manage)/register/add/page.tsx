"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  Container,
  SearchBarContainer,
  SearchInput,
  ClearIcon,
  ModalOverlay,
  ModalContainer,
  HandleBar,
  MedicineInfo,
  MedicineImage,
  MedicineDetails,
  MedicineName,
  MedicineDescription,
  StepContainer,
  StepContent,
  StepTitle,
  StepDescription,
  FormContainer,
  FormGroup,
  Label,
  InputWrapper,
  Input,
  InfoIcon,
  ButtonGrid,
  NumberButton,
  ButtonContainer,
  Spacer,
  NextStepButton,
  PreviousStepButton,
  ScrollableAlarmContainer,
  AlarmItem,
  SectionTitle,
  Divider,
  AlarmTime,
  CloseButton,
  AddAlarmButton,
  RoutingButton,
} from "@/components/registpage/add/RegisterAddPage.styles";
import AddedMedicines from "@/components/registpage/search/AddedMedicines";
import SearchResults from "@/components/registpage/search/SearchResults";
import NextButton from "@/components/registpage/search/NextButton";
import { useDrugStore, useSearchStore } from "@/store/drugStore";

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
      setStep(4);

      setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          setSelectedMedicine(null);
          setStep(1);
          setIsClosing(false);
        }, 300);
      }, 5000);
    }
  };

  const handleRouteModal = () => {
    router.push("/register");
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
    const newAlarm: Alarm = { id: alarms.length + 1, time: "오전 9:00" };
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
                {step !== 4 ? (
                  <>
                    <MedicineName>{selectedMedicine.name}</MedicineName>
                    <MedicineDescription>
                      {selectedMedicine.description}
                    </MedicineDescription>
                  </>
                ) : (
                  <>
                    <SectionTitle style={{ fontSize: "13px" }}>
                      <span style={{ color: "black", fontWeight: 400 }}>
                        복용 약 목록
                      </span>
                      <span style={{ color: "#808AAB", fontWeight: 400 }}>
                        에 추가했어요!
                      </span>
                    </SectionTitle>

                    <MedicineName>{selectedMedicine.name}</MedicineName>
                  </>
                )}
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
                        <AlarmTime>{alarm.time}</AlarmTime>
                        <CloseButton
                          onClick={() => handleRemoveAlarm(alarm.id)}
                        >
                          <IoClose size={20} />
                        </CloseButton>
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
                  <RoutingButton onClick={handleCloseModal} fullWidth>
                    추가 등록하기
                  </RoutingButton>
                  <NextStepButton onClick={handleRouteModal} fullWidth>
                    복용약목록 보기
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
