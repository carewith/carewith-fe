"use client";
import { useState, useEffect } from "react";
import { IoClose, IoChevronForward } from "react-icons/io5"; // 추가
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
  CombineResultText,
  CombineResultTitle,
  LoadingContainer,
  CombineResultContainer,
  CombineResultButton,
  CautionText,
} from "@/components/registpage/add/RegisterAddPage.styles";
import AddedMedicines from "@/components/registpage/search/AddedMedicines";
import SearchResults from "@/components/registpage/search/SearchResults";
import NextButton from "@/components/registpage/search/NextButton";
import { useDrugStore, useSearchStore } from "@/store/drugStore";
import {
  CartirdgeWithSheduleWithOutTerm,
  registCartridgeWithSchedule,
  getUsingCartridge,
  UsingCartridge,
} from "@/service/cartridge";
import TimePicker from "@/components/util/TimePicker";
import { combineMedicine, CombineResponse } from "@/service/ai";
import { ClipLoader } from "react-spinners";
import { InfoSectionRow } from "@/components/mypage/myPage.styles";
import { InfoSection, Memo } from "@/components/editpage/MedicineEditContainer";
import PeriodicityModal from "@/components/editpage/PeriodicityModal";
import { FaChevronRight } from "react-icons/fa6";
import CalendarModal from "@/components/registpage/add/CalendarModal";

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
  const [alarms, setAlarms] = useState<{ time: string }[]>([]);
  const [isClosing, setIsClosing] = useState(false);
  const [combineResult, setCombineResult] = useState<CombineResponse | null>(
    null
  );
  const [usingCartridges, setUsingCartridges] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [repeat, setRepeat] = useState(true);
  const [reminderSound, setReminderSound] = useState(1);
  const [dates, setDates] = useState<string[]>(["MON", "WED", "FRI"]);
  const [isPeriodicityModalOpen, setIsPeriodicityModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [memo, setMemo] = useState("");

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

  const handleAddMedicine = async (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setIsLoading(true);

    const updatedMedicines = [...addedMedicines, medicine];
    const drugNames = updatedMedicines.map((med) => med.name);

    try {
      const result = await combineMedicine(
        localStorage.getItem("mainDispenser"),
        drugNames
      );
      setCombineResult(result);
    } catch (error) {
      console.error("Error checking drug combination:", error);
      setCombineResult(null);
    } finally {
      setIsLoading(false);
    }

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

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  const handleCartridgeNext = () => {
    if (cartridgeNumber === null) {
      alert("카트리지 번호를 선택해주세요.");
      return;
    }

    if (usingCartridges.length === 6) {
      alert("모든 카트리지가 사용 중입니다. 복용약 목록으로 이동합니다.");
      router.push("/register");
      return;
    }

    handleNextStep();
  };

  const handleCompleteRegistration = async () => {
    if (selectedMedicine && cartridgeNumber) {
      const schedules = dates.flatMap((date) =>
        alarms.map((alarm) => ({
          dayOfWeek: date,
          time: convertTo24HourFormat(alarm.time),
        }))
      );

      const registData: CartirdgeWithSheduleWithOutTerm = {
        number: cartridgeNumber,
        memo: memo,
        dosage,
        doesPerDay: dosePerDay,
        totalDoseDays,
        drugRemains,
        repeatable: repeat,
        dispenserId: localStorage.getItem("mainDispenser"),
        drugId: selectedMedicine.id,
        reminderSoundId: reminderSound,
        schedules: schedules,
        since: startDate,
      };
      await registCartridgeWithSchedule(registData);
      setStep(7);

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

  const truncateCaution = (caution: string): string => {
    const sentences = caution.split(".");
    return sentences.length > 1
      ? `${sentences[0]}. ${sentences[1]}.`
      : `${sentences[0]}.`;
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
    setAlarms([...alarms, { time: formattedTime }]);
    setStep(5);
  };

  const handleAddAlarm = () => {
    setStep(6);
  };

  const handleRemoveAlarm = (index: number) => {
    setAlarms(alarms.filter((_, i) => i !== index));
  };

  const handlePeriodicityChange = (newDates: string[]) => {
    setDates(newDates);
  };

  const handleCalendarOpen = () => {
    setIsCalendarModalOpen(true);
  };

  const handleCalendarClose = (selectedDate: string | null = null) => {
    if (selectedDate) {
      setStartDate(selectedDate);
    }
    console.log(selectedDate);
    setIsCalendarModalOpen(false);
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
                  {isLoading ? (
                    <LoadingContainer>
                      <h4 style={{ fontSize: "14px", marginBottom: "10px" }}>
                        병용 검사 중
                      </h4>
                      <ClipLoader
                        color={"#5A81FA"}
                        loading={isLoading}
                        size={50}
                      />
                    </LoadingContainer>
                  ) : (
                    combineResult && (
                      <CombineResultContainer>
                        <CombineResultButton
                          isCombinable={combineResult.isCombinable}
                        >
                          {combineResult.isCombinable
                            ? "병용 가능"
                            : "병용 주의"}
                        </CombineResultButton>
                        <span style={{ fontSize: "11px", color: "#808AAB" }}>
                          AI를 이용해 검사한 결과로 자세한 내용은 의사와
                          상담하세요.
                        </span>
                        {!combineResult.isCombinable && (
                          <CautionText>
                            {truncateCaution(combineResult.caution)}
                          </CautionText>
                        )}
                      </CombineResultContainer>
                    )
                  )}
                  <NextStepButton
                    onClick={handleNextStep}
                    fullWidth
                    disabled={isLoading}
                  >
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
                        isSelected={cartridgeNumber === num}
                      >
                        {num}
                      </NumberButton>
                    ))}
                  </ButtonGrid>
                  <NextStepButton onClick={handleCartridgeNext} fullWidth>
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
                  <StepTitle>복용 상세 설정</StepTitle>
                  <InfoSection>
                    <InfoSectionRow
                      onClick={() => setIsPeriodicityModalOpen(true)}
                    >
                      <span>주기</span>
                      <span>
                        {dates.join(", ")} <FaChevronRight color="#a9adb4" />
                      </span>
                    </InfoSectionRow>
                    <InfoSectionRow>
                      <span>복용 시작일</span>
                      <span
                        onClick={handleCalendarOpen}
                        style={{ cursor: "pointer" }}
                      >
                        {startDate} <IoChevronForward />
                      </span>
                    </InfoSectionRow>
                    <InfoSectionRow>
                      <span>반복알림</span>
                      <span onClick={() => setRepeat(!repeat)}>
                        <input type="checkbox" checked={repeat} readOnly />
                        <div className="toggle-switch"></div>
                      </span>
                    </InfoSectionRow>
                  </InfoSection>
                  <InfoSection>
                    <h2 style={{ fontSize: "14px", margin: "1rem 0 0.5rem 0" }}>
                      메모
                    </h2>
                    <Memo
                      value={memo}
                      onChange={(e) => setMemo(e.target.value)}
                    />
                  </InfoSection>
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
              {step === 5 && (
                <StepContent key={step}>
                  <StepTitle>알람 설정</StepTitle>
                  <StepDescription>
                    알람 설정을 추가할 수 있습니다.
                  </StepDescription>
                  <ScrollableAlarmContainer>
                    {alarms.map((alarm, index) => (
                      <AlarmItem key={index}>
                        <AlarmTime>{alarm.time}</AlarmTime>
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
              {step === 6 && (
                <StepContent key={step}>
                  <StepTitle>알람 시간 설정</StepTitle>
                  <div>
                    <p>시간을 선택하세요:</p>
                    <TimePicker onSelectTime={handleTimeSelection} />
                  </div>
                </StepContent>
              )}
              {step === 7 && (
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
      <PeriodicityModal
        isOpen={isPeriodicityModalOpen}
        onClose={() => setIsPeriodicityModalOpen(false)}
        onSave={handlePeriodicityChange}
        initialSelectedDays={dates}
      />
      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={handleCalendarClose}
      />
    </Container>
  );
};

export default SearchRegisterPage;
