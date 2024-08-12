"use client";
import { useState, useEffect } from "react";
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
import {
  CartirdgeWithSheduleWithOutTerm,
  Schedule,
  registCartridgeWithSchedule,
  getUsingCartridge, // Import the function
  UsingCartridge,
} from "@/service/cartridge";
import TimePicker from "@/components/util/TimePicker";
import { combineMedicine, CombineResponse } from "@/service/ai";

type Medicine = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
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
  const [cartridgeNumber, setCartridgeNumber] = useState<number | null>(null);
  const [dosage, setDosage] = useState<number>(1);
  const [dosePerDay, setDosePerDay] = useState<number>(3);
  const [totalDoseDays, setTotalDoseDays] = useState<number>(7);
  const [drugRemains, setDrugRemains] = useState<number>(12);
  const [alarms, setAlarms] = useState<Schedule[]>([]);
  const [isClosing, setIsClosing] = useState(false);
  const [combineResult, setCombineResult] = useState<CombineResponse | null>(
    null
  );
  const [usingCartridges, setUsingCartridges] = useState<number[]>([]);

  useEffect(() => {
    if (step === 2) {
      const fetchUsingCartridges = async () => {
        try {
          const data: UsingCartridge = await getUsingCartridge(
            localStorage.getItem("mainDispenser")
          );
          setUsingCartridges(data.usingNumbers);
        } catch (error) {
          console.error("Error fetching using cartridges:", error);
        }
      };
      fetchUsingCartridges();
    }
  }, [step]);

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

  const handleCompleteRegistration = async () => {
    if (selectedMedicine && cartridgeNumber) {
      const registData: CartirdgeWithSheduleWithOutTerm = {
        number: cartridgeNumber,
        memo: "aa",
        dosage,
        doesPerDay: dosePerDay,
        totalDoseDays,
        drugRemains,
        repeatable: true,
        dispenserId: localStorage.getItem("mainDispenser"),
        drugId: selectedMedicine.id,
        reminderSoundId: 1,
        schedules: alarms.map((alarm) => ({
          dayOfWeek: "MON",
          time: convertTo24HourFormat(alarm.time),
        })),
      };
      await registCartridgeWithSchedule(registData);
      setStep(6);

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

  const handleCombineCheck = async () => {
    if (!selectedMedicine) return;
    const updatedMedicines = [...addedMedicines, selectedMedicine];

    console.log("Checking compatibility for medicines:", updatedMedicines);

    const drugNames = updatedMedicines.map((medicine) => medicine.name);
    try {
      const result = await combineMedicine(
        localStorage.getItem("mainDispenser"),
        drugNames
      );
      setCombineResult(result);
      if (result.isCombinable) {
        alert("약물이 혼용이 가능합니다.");
        setStep(2);
      } else {
        alert(`주의: ${result.caution}`);
      }
    } catch (error) {
      console.error("Error checking drug combination:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const formatTimeToAMPM = (time: string): string => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "오후" : "오전";
    const formattedHour = hour % 12 || 12;
    return `${period} ${formattedHour}:${minute.toString().padStart(2, "0")}`;
  };

  const convertTo24HourFormat = (time: string): string => {
    const [period, hourMinute] = time.split(" ");
    let [hour, minute] = hourMinute.split(":").map(Number);

    if (period === "오후" && hour < 12) {
      hour += 12;
    } else if (period === "오전" && hour === 12) {
      hour = 0;
    }

    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:00`;
  };

  const handleTimeSelection = (formattedTime: string) => {
    const newAlarm = { dayOfWeek: "MON", time: formattedTime };
    setAlarms([...alarms, newAlarm]);
    setStep(4);
  };

  const handleAddAlarm = () => {
    setStep(5);
  };

  const handleRemoveAlarm = (index: number) => {
    setAlarms(alarms.filter((_, i) => i !== index));
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
                {step === 1 ? (
                  <>
                    <MedicineName>{selectedMedicine.name}</MedicineName>
                    <MedicineDescription>
                      {selectedMedicine.description}
                    </MedicineDescription>
                    <NextStepButton onClick={handleCombineCheck} fullWidth>
                      혼용 적합성 확인
                    </NextStepButton>
                  </>
                ) : step === 6 ? (
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
                ) : (
                  <>
                    <MedicineName>{selectedMedicine.name}</MedicineName>
                    <MedicineDescription>
                      {selectedMedicine.description}
                    </MedicineDescription>
                  </>
                )}
              </MedicineDetails>
            </MedicineInfo>
            <Divider />
            <StepContainer>
              {step === 1 && (
                <StepContent key={step}>
                  <NextStepButton onClick={handleNextStep} fullWidth>
                    다음
                  </NextStepButton>
                </StepContent>
              )}
              {step === 2 && (
                <StepContent key={step}>
                  <StepTitle>기기 약통 번호 선택</StepTitle>
                  <StepDescription>
                    홈과 약 정보 관리 페이지에서 수정할 수 있어요
                  </StepDescription>
                  <ButtonGrid>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <NumberButton
                        key={num}
                        onClick={() => setCartridgeNumber(num)}
                        disabled={usingCartridges.includes(num)}
                      >
                        {num}
                      </NumberButton>
                    ))}
                  </ButtonGrid>
                  <NextStepButton onClick={handleNextStep} fullWidth>
                    다음
                  </NextStepButton>
                </StepContent>
              )}

              {step === 3 && (
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
                          defaultValue={dosage}
                          onChange={(e) => setDosage(Number(e.target.value))}
                        />
                      </InputWrapper>
                    </FormGroup>
                    <FormGroup>
                      <Label>
                        1일 투여 횟수 <InfoIcon>!</InfoIcon>
                      </Label>
                      <InputWrapper>
                        <Input
                          type="number"
                          placeholder="3"
                          defaultValue={dosePerDay}
                          onChange={(e) =>
                            setDosePerDay(Number(e.target.value))
                          }
                        />
                      </InputWrapper>
                    </FormGroup>
                    <FormGroup>
                      <Label>총 투약 일수</Label>
                      <InputWrapper>
                        <Input
                          type="number"
                          placeholder="7"
                          defaultValue={totalDoseDays}
                          onChange={(e) =>
                            setTotalDoseDays(Number(e.target.value))
                          }
                        />
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
                          defaultValue={drugRemains}
                          onChange={(e) =>
                            setDrugRemains(Number(e.target.value))
                          }
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
              {step === 4 && (
                <StepContent key={step}>
                  <StepTitle>알람 설정</StepTitle>
                  <StepDescription>
                    알람 설정을 추가할 수 있습니다.
                  </StepDescription>
                  <ScrollableAlarmContainer>
                    {alarms.map((alarm, index) => (
                      <AlarmItem key={index}>
                        <AlarmTime>{`${alarm.dayOfWeek} ${alarm.time}`}</AlarmTime>
                        <CloseButton onClick={() => handleRemoveAlarm(index)}>
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
              {step === 5 && (
                <StepContent key={step}>
                  <StepTitle>알람 시간 설정</StepTitle>
                  <div>
                    <p>시간을 선택하세요:</p>
                    <TimePicker onSelectTime={handleTimeSelection} />
                  </div>
                </StepContent>
              )}
              {step === 6 && (
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
